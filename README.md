# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

# To run the script by passign the proposals as arguments
```shell
yarn run ts-node --files scripts/Deployment.ts "proposal1" "proposal2" "proposal3"
```

To give rights to a wallet:
```shell
yarn run ts-node --files scripts/GiveRightToVote.ts [contract_address] [wallet_address]
```

To get the winner proposal:
```shell
yarn run ts-node --files scripts/Winner.ts [contract_address]
```
