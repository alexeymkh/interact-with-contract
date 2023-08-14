# INTERACT-WITH-CONTRACT
Test task

Blockchain - Ethereum, testnet Sepolia

I made a simple Solidity contract for this task: [0xbb1e07c29FB869b43Ca3440d90D709CacE85d658](https://sepolia.etherscan.io/address/0xbb1e07c29fb869b43ca3440d90d709cace85d658#code). It has two methods: `getString`, which returns the string "it's alive!", and `sendEvent`, which emits an event.

## Prerequisites
1. Clone this repository to your computer
2. Create `.env` file in the root directory of this project on your computer, copy content from `.env.example` file to `.env`
3. Create free account on [Infura](https://infura.io/) and get API key in [dashboard](https://app.infura.io/dashboard) OR get any other **websocket**-url for Ethereum testnet **Sepolia**
4. Paste your websocket-url to `.env` file as value for `WS_PROVIDER_URL` variable. For infura-sepolia it will be `wss://sepolia.infura.io/ws/v3/[YOUR API KEY]`
5. Create new Ethereum-account (for example - in Metamask wallet) to use it for calling smart-contract methods in this project. Get some testnet ETH from some faucet to your wallet, and paste your test wallet's private key (make sure it starts with 0x) to `.env` file as value for `PRIVATE_KEY` variable. For example, you can get testnet SepoliaETH in [sepoliafaucet.com](https://sepoliafaucet.com/), you will need a free Alchemy account for this. Also you can get SepoliaETH in [Infura faucet](https://www.infura.io/faucet/sepolia), it requires free account too, but also 0.001 real ETH on your wallet in Mainnet. Or in [coinbase faucet](https://faucet.quicknode.com/ethereum/sepolia), but it also requires 0.001 ETH on Ethereum Mainnet.

## How to run in Docker
If you don't want to install Node.js and global packages, you can run this project in Docker. But you will need to install Docker, if you don't have one :)
### Run project
In the root directory run this command to build an image: 

```
docker build -t iwc .
```
Same in the root directory run this command to start a container (we are specifying path to `.env` file here):
```
docker run --init --env-file .env iwc
```
### Run tests
Build an image (run this command in the root directory): 
```
docker build -f Dockerfile.test -t iwc-test .
```
Run tests in container: 
```
docker run --rm iwc-test
```

## How to run in your development enviroment
1. Install Node.js version 18 or higher
2. Install Yarn:
```
npm install -g yarn
```
3. In the root directory of this project run this command to install dependencies:
```
yarn
```
4. Run project with command:
```
yarn start:dev
```
5. Run tests:
```
yarn test
```