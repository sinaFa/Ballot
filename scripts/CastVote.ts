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

  const provider =  new ethers.providers.InfuraProvider("goerli",  process.env.INFURA_API_KEY);
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "")
  let signer = wallet.connect(provider);

  let ballotContract : Ballot;
  const ballotContractFactory =  new Ballot__factory(signer)

  ballotContract = ballotContractFactory.attach(contractAddress) ;

  console.log("Let's go over proposals") 
  for (let i=0; i < 100; i++) {
    try {
      const proposal = await ballotContract.proposals(i);
      console.log("proposal[" + i + "] = { \"" + ethers.utils.parseBytes32String(proposal.name) + "\", " + proposal.voteCount+ "}");
    } catch(e){
      i = 100;
    }
  }


}
 


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});