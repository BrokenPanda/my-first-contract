const main = async () => {
    const myContractFactory = await hre.ethers.getContractFactory("MyFirstContract");
    const myContract = await myContractFactory.deploy();
    await myContract.deployed();
    console.log("Contract deployed to:", myContract.address);

    let voteCount = await myContract.getTotalVotes();
    console.log("Vote count:", voteCount);
  
    let voteTxn = await myContract.vote(0, "The message!");
    await voteTxn.wait();

    const [_, randomPerson] = await hre.ethers.getSigners();
    voteTxn = await myContract.connect(randomPerson).vote(0, "Another message!");
    await voteTxn.wait();

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