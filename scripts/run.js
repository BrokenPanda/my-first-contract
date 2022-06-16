const { ethers } = require("hardhat");

const main = async () => {
    const myContractFactory = await hre.ethers.getContractFactory("MyFirstContract");
    const myContract = await myContractFactory.deploy({
      value: ethers.utils.parseEther("0.001"),
    });
    await myContract.deployed();
    console.log("Contract deployed to:", myContract.address);

    const contractBalance =  await ethers.provider.getBalance(myContract.address);
    console.log("Contract Balance:", hre.ethers.utils.formatEther(contractBalance));
  
    const voteTxn = await myContract.vote(0, "The message!");
    await voteTxn.wait();
    console.log("Vote #1 successfull");
    const voteTxn1 = await myContract.vote(0, "The message!");
    await voteTxn1.wait();
    console.log("Vote #2 successfull");
    const contractBalance1 =  await ethers.provider.getBalance(myContract.address);
    console.log("Contract Balance:", ethers.utils.formatEther(contractBalance1));

    let allVotes = await myContract.getVotes();
    console.log(allVotes);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error)  {
        console.log(error);
        process.exit(1);
    }
};

runMain();