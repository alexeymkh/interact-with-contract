import Web3, { Contract } from 'web3';

import ContractManager from '../src/contractManager';

const stubPrivKey = '0xPrivateKey';
const stubWalletAddress = '0xAddress';
const stubEstimateGas = '100000';
const stubGasPrice = '100';
const stubContractAddress = '0xContractAddress';
const stubEncodedData = '0xEncodedData';
const stubRawTx = '0xRawTransaction';
const stubString = 'it\'s alive!';

const mockGetStringMethod = jest.fn().mockReturnValue({
  call: jest.fn().mockResolvedValue(stubString),
});
const mockSendEventMethod = jest.fn().mockReturnValue({
  estimateGas: jest.fn().mockResolvedValue(stubEstimateGas),
  encodeABI: jest.fn().mockReturnValue(stubEncodedData),
});
const mockOnMethod = jest.fn().mockReturnThis();
const mockSendSignedTransaction = {
  on: mockOnMethod,
};

const mockContract = {
  options: {
    address: stubContractAddress,
  },
  methods: {
    getString: mockGetStringMethod,
    sendEvent: mockSendEventMethod,
  },
  events: {
    Greeting: jest.fn().mockReturnValue({
      on: mockOnMethod,
    }),
  },
};

const mockWeb3 = {
  eth: {
    getGasPrice: jest.fn().mockResolvedValue(stubGasPrice),
    accounts: {
      privateKeyToAccount: jest.fn(() => ({ address: stubWalletAddress })),
      signTransaction: jest.fn(() => ({ rawTransaction: stubRawTx })),
    },
    sendSignedTransaction: jest.fn(() => mockSendSignedTransaction),
  },
} as unknown as Web3;

describe('ContractManager', () => {
  let contractManager: ContractManager;

  beforeEach(() => {
    contractManager = new ContractManager(mockWeb3, mockContract as unknown as Contract<any>);
    jest.clearAllMocks();
  });

  it('calls getString method and returns result', async () => {
    const result = await contractManager.callGetStringMethod();
    expect(result).toEqual(stubString);
  });

  it('sends a transaction using sendEvent method', async () => {
    await contractManager.sendTxWithSendEventMethod(stubPrivKey);

    expect(mockWeb3.eth.accounts.privateKeyToAccount).toHaveBeenCalledWith(stubPrivKey);
    expect(mockWeb3.eth.getGasPrice).toHaveBeenCalled();
    expect(mockSendEventMethod).toHaveBeenCalled();
    expect(mockSendEventMethod().estimateGas).toHaveBeenCalledWith({ from: stubWalletAddress });
    expect(mockSendEventMethod().encodeABI).toHaveBeenCalled();
    const expectedTransaction = {
      from: stubWalletAddress,
      to: stubContractAddress,
      data: stubEncodedData,
      gas: stubEstimateGas,
      gasPrice: stubGasPrice,
    };
    expect(mockWeb3.eth.accounts.signTransaction)
      .toHaveBeenCalledWith(expectedTransaction, stubPrivKey);
    expect(mockWeb3.eth.sendSignedTransaction).toHaveBeenCalledWith(stubRawTx);
    expect(mockSendSignedTransaction.on).toHaveBeenCalledWith('transactionHash', expect.any(Function));
    expect(mockSendSignedTransaction.on).toHaveBeenCalledWith('receipt', expect.any(Function));
    expect(mockSendSignedTransaction.on).toHaveBeenCalledWith('error', expect.any(Function));
  });

  it('listens for Greeting event', () => {
    contractManager.listenForGreetingEvent();
    expect(mockOnMethod).toHaveBeenCalledWith('data', expect.any(Function));
    expect(mockOnMethod).toHaveBeenCalledWith('error', expect.any(Function));
  });
});
