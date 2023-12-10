

# **Anon Vote**

## TL;DR:
In a breakthrough for secure and accessible digital voting, our project introduces a pioneering Ethereum-based voting system integrated with India's Aadhaar card for robust identity verification. This system leverages cutting-edge zk-proof technology to ensure the authenticity of voter identity while maintaining privacy and security.

Upon successful Aadhaar verification, users are seamlessly directed to a list of ballots, reflecting our commitment to a user-friendly experience. Each ballot incorporates unique criteria for eligibility, such as age or university credentials, verified via the innovative Polygon ID tool. This multifaceted approach to verification ensures that only eligible voters participate, bolstering the integrity of the voting process.

## How's made

Composed of 3 core smart contracts :

1. [AnonAadhaarVerifier.sol](smart-contracts/contracts/AnonAadhaarVerifier.sol)

    Anon Aadhar Contract is the Aadhar Verifier and the main contract that handles the proving of the Aadhar using Zero Knowledge , deployed on polygon zkEVM, arbitrum, scroll, celo, FVM, XDC, okx, Base


2. [Verifier.sol](smart-contracts/contracts/Verifier.sol)
Circuit written in snarkJS deployed on polygon zkEVM, arbitrum, scroll, celo, FVM, XDC, okx, Base

3. [Voting and Ballot Contract](src/core/MultichainGovernorVotesAdapter.sol)

    This contracts helps in voting and creating ballot so that it can leverage several users to use us as a platform



## Technologies Used

### Anon Aadhar

Anon Aadhar is used to verify the users that they are indian citizens without revealing any other details such as Aadhar Number or BirthDate or Phone Number etc 

### Polygon Dapp Scaffold

We have used Polygon Dapp Scaffold for easy development of the project 

### Polygon ID

Since the zk Proof of the aadhar does not reveal any other details, polygon ID is used to prove that the user is 18+ so that they can vote, not only this but the several other organizations can leverage the platform and issue verifiable credentials to the users in a meaning ful way to conduct voting on our platform 
### Celo Account Abstraction

To seamless have all the users on the platform and since the proof verification and voting is done onchain we have leveraged the Account Abstraction of Celo to sponsor the gas fees of the users

### IPFS

Images of the ballott and other images are stored on IPFS and fetched through Saturn Network

## **Deployed Contracts**

Contract | Goerli | Mumbai
--- | --- | --- 
[MultichainGovernor.sol](src/core/MultichainGovernor.sol) | X | [link](https://mumbai.polygonscan.com/address/0xb84BAc17afc8B074dbC83C7920982E41Bf11478B)
[MultichainGovernorAdapter.sol](src/core/MultichainGovernorAdapter.sol) | [link](https://goerli.etherscan.io/address/0x15a16c761DAc6880cbC25Fdc4fd4e8773C357727) | X
[MultichainGovernorFunctionsConsumer](src/core/MultichainGovernorFunctionsConsumer.sol) | X | [link](https://mumbai.polygonscan.com/address/0xde6cc3ba502c43f9e5a7606a649d0e268c544bec)
[MultichainGovernorVotes](src/core/MultichainGovernorVotes.sol) | X | [link](https://mumbai.polygonscan.com/address/0xAb1cE3C12a85B7FA613DE482bfD3a731E7B8C28e)
[MultichainGovernorVotesAdapter](src/core/MultichainGovernorVotesAdapter.sol) | [here](https://goerli.etherscan.io/address/0x66A70844A816066530eeC13B5C17C82d8df991D7) | X


```
