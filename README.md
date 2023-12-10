

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

Below Contracts deployed on polygon zkEVM

[AnonAadharVerifier.sol](smart-contracts/contracts/AnonAadhaarVerifier.sol) (https://testnet-zkevm.polygonscan.com/address/0x087c58e13482535c1c107B300f6DBd3f505FA093)

[Verifier.sol](smart-contracts/contracts/Verifier.sol)  (https://testnet-zkevm.polygonscan.com/address/0x77f35B134a85FD1508296c04d53A1c882c63bDCE) 

[Vote.sol](smart-contracts/contracts/Vote.sol) (https://testnet-zkevm.polygonscan.com/address/0x3ef01CBC562daB2bc50916651517f4DC156f8c7A)

Verifier Contract Deployed on Scroll

https://sepolia.scrollscan.dev/address/0x97238A5dA499eF6A46EdEaE86559eBa876241B3C

Verifier Contract Deployed on Linea

https://goerli.lineascan.build/tx/0x74ac7a8f250f166fcc5e4607fb65cf3f0ee69d2cbcd968738a2a7026c0cf3f9e

Verifier Contract Deployed on Mantle
https://explorer.testnet.mantle.xyz/tx/0x33e7d37b162ab9bda884c30e24fae8d40f079ae723789fbb60237cb83cfbeb93

Verifier Contract Deployed on Celo
https://alfajores.celoscan.io/address/0x7144829418e841cb984f625e0443b0D8121D0f29

Verifier Contract deployed on Arbitrum testnet 
https://sepolia-explorer.arbitrum.io/tx/0x34a6f868fdab43165c96d496b6ffc81ca8b97bf526f115d9088a2a310238dc14

Verifier Contract deployed on XDC Apothem testnet
https://explorer.apothem.network/address/xdc014b449ca2644adbf7c01ec84174fd23a9d6e8a5
```
