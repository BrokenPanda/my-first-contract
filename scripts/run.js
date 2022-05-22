const main = async () => {
    const {owner} = await hre.ethers.getSigners();
    const myContractFactory = await hre.ethers.getContractFactory("MyFirstContract");
    const myContract = await myContractFactory.deploy();
    await myContract.deployed();
    
    console.log("Contract deployed to:", myContract.address);
    console.log("Contract deployed to:", owner.address);

    let voteCount = await myContract.getTotalVotes();
    let voteTxn = await myContract.vote();
    await voteTxn.wait();

    voteCount = await myContract.getTotalVotes();
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