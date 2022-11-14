import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";


async function main () {
  require('dotenv').config()
  const args = process.argv;
  const params = args.slice(2);

  if (params.length <= 0) throw new Error("Not enough args");
 
  const contractAddress = params[0]
  const proposal = params[1]

  const provider =  new ethers.providers.InfuraProvider("goerli",  process.env.INFURA_API_KEY);
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
  let signer = wallet.connect(provider);

  let ballotContract : Ballot;
  const ballotContractFactory =  new Ballot__factory(signer)

  ballotContract = ballotContractFactory.attach(contractAddress) ;
  const tx = await ballotContract.vote(proposal)
  const receipt = await tx.wait()
  console.log({receipt})
}
 


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});