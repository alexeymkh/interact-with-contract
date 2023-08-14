import Web3, { Contract } from 'web3';

export default class ContractManager {
  constructor(private web3: Web3, private contract: Contract<any>) {}

  async callGetStringMethod(): Promise<string> {
    return this.contract.methods.getString().call();
  }

  async sendTxWithSendEventMethod(privateKey: string): Promise<void> {
    const { address: fromAddress } = this.web3.eth.accounts.privateKeyToAccount(privateKey);
    const method = this.contract.methods.sendEvent();

    const gasPrice = await this.web3.eth.getGasPrice();
    const gasEstimate = await method.estimateGas({ from: fromAddress });

    const transaction = {
      from: fromAddress,
      to: this.contract.options.address,
      data: method.encodeABI(),
      gas: gasEstimate,
      gasPrice,
    };

    const signedTransaction = await this.web3.eth.accounts.signTransaction(transaction, privateKey);

    this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
      .on('transactionHash', (hash) => console.log(`Transaction sent with hash ${hash}, waiting for confirmation (it might take some time)...`))
      .on('receipt', (receipt) => console.log(`Transaction was confirmed on block ${receipt.blockNumber}`))
      .on('error', console.error);
  }

  listenForGreetingEvent(): void {
    this.contract.events.Greeting().on('data', (event) => console.log('Event received, text:', event.returnValues.message));
    this.contract.events.Greeting().on('error', console.error);
  }
}
