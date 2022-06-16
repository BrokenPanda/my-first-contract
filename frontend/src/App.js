import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/MyFirstContract.json";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [allVotes, setVotes] = useState([]);
  const contractAddress = "0x141D80eb1B63E9E1E44426960e6E7529eFE762FA";
  
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if(!ethereum) {
        console.log("Make sure you have Metamask installed.");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_accounts"});

      if(accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account: ", account);
        setCurrentAccount(account);
        getAllVotes();
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if(!ethereum) {
        alert("Get Metamask!");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("Connected");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  }

  const vote = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myFirstContract = new ethers.Contract(contractAddress, abi.abi, signer);

        let count = await myFirstContract.getTotalVotes();
        console.log("Retrieved total vote count...", count.toNumber());
      
        const voteTxn = await myFirstContract.vote(0, "Insert message here");
        console.log("Mining...");

        await voteTxn.wait();
        console.log("Mined! ", voteTxn.hash);

        count = await myFirstContract.getTotalVotes();
        console.log("Retrieved total vote count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllVotes = async () => {
    try {
      const { ethereum } = window;
      
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const myFirstContract = new ethers.Contract(contractAddress, abi.abi, signer);

        const votes = await myFirstContract.getVotes();

        let votesCleaned = [];
        votes.forEach(vote => {
          votesCleaned.push({
            address: vote.voter,
            timestamp: new Date(vote.timestamp * 1000),
            message: vote.message,
          });
        });
        
        console.log("votes:", votes);
        
        setVotes(votesCleaned);
      }

    } catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        Voting Contract Homepage
        </div>

        <div className="bio">
        I am Dominik and I want to get started in Blockchain Development by creating my own Voting Smart Contract in Solidity! <br />
        Connect your Ethereum wallet and try it out!
        </div>

        <div className="messageInput">
          <p><label for="message">message: </label></p>
          <textarea id="message" name="message" rows="4" cols="50"></textarea>
        </div>
        
        <button className="voteButton" onClick={vote}>
          Vote here
        </button>
        { !currentAccount && (
          <button className="voteButton" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
        
        { allVotes.map((vote, index) => {
        return (
          <div key={index} style={{ backgroundColor: "OldLace", marginTop: "16px", padding: "8px" }}>
            <div>Address: { vote.address }</div>
            <div>Time: { vote.timestamp.toString() }</div>
            <div>Message: { vote.message }</div>
          </div>)
        })}

      </div>
    </div>
  );
}

export default App;