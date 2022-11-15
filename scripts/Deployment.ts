import { expect } from "chai";
import { ethers } from "hardhat";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
const PROPOSALS = ["Rasperry 1", "Chocolat 2", "Proposal 3"];


async function main () {
  require('dotenv').config()
  console.log("Deploying Ballot contract");
  const provider =  new ethers.providers.InfuraProvider("goerli",  process.env.INFURA_API_KEY);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();

  console.log(`connected to address ${signer.address} with balance ${balance.toString()} Wei`);
 
  const args = process.argv;
  // @dev First two arguments are system based
  // @dev So we take everything after argument 2 as proposal
  const proposals = args.slice(2);
   // @dev We require proposals as arguments
  if (proposals.length <= 0) throw new Error("Not enough args");
  console.log(proposals);
  
  // @dev We list all proposals
  proposals.forEach((element, index) => {
      console.log("proposal[" + index + "] = " + element )
  });

  // @dev We list all proposals

  let accounts = await ethers.getSigners();
  const ballotFactory = new Ballot__factory(signer);
  //const ballotFactory = await ethers.getContractFactory("Ballot");
  let ballotContract = await ballotFactory.deploy(
    convertStringArrayToBytes32(proposals)
  ) as Ballot;
  await ballotContract.deployed();
  console.log("deployed at " + ballotContract.address);
}

function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});