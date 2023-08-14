/* eslint-disable import/first */
import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

import contractAbi from './contract/simple-contract-abi.json';
import ContractManager from './contractManager';
import { WS_PROVIDER_URL, PRIVATE_KEY, CONTRACT_ADDRESS } from './constants';

const web3 = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER_URL));
const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
const contractManager = new ContractManager(web3, contract);

async function main() {
  try {
    console.log('Calling "getString" method...');
    const result = await contractManager.callGetStringMethod();
    console.log(`The result of calling the "getString" method: "${result}"`);

    contractManager.listenForGreetingEvent();

    console.log('Creating a transaction to call the "sendEvent" method...');
    await contractManager.sendTxWithSendEventMethod(PRIVATE_KEY);
  } catch (error) {
    console.error(error);
  }
}

main();
