# node-lottery-dapp



## install

```shell
git clone git@github.com:JacobHsu/node-lottery-dapp.git
cd node-lottery-dapp
npm i
cd dapp
yarn
cd ../
npm run dev
```

`npx create-react-app dapp`

## solc

solidity ^0.4.x solc需降版本至 versions [0.4.x](https://www.npmjs.com/package/solc)

`npm i solc@0.4.26`
`npm i solc@0.5.17` npm run c

It also accepts an optional set of callback functions, which include the import and the smtSolver callbacks. Starting `0.6.0` it only accepts an object in place of the callback to supply the callbacks.

v0.4.26 [doc](https://www.npmjs.com/package/solc/v/0.4.26)  

## contracts

```js
// 向 players[index] 轉了address(this) 的以太幣
players[index].transfer(address(this).balance);
```

## test

`npm i mocha ganache-cli web3`  
`npm install -g mocha`

## deploy

`npm i truffle-hdwallet-provider`

https://infura.io/

這裡以部署到以太坊測試網絡 Ropsten 為例進行介紹。 其實 MetaMask 後面的節點服務就是 Infura。

使用 Infura 提供的節點服務。 然後通過 HDWalletProvider 連接到 Infura 節點，並為我們簽署交易，通過下面命令安裝 HDWalletProvider：

`npm install truffle-hdwallet-provider`

在使用 Infura 之前，我們需要註冊一個訪問 Infura 服務的 Token， 
註冊地址為：https://infura.io/register， 註冊後創建一個 Project, 複製節點 url

助記詞其實不應該明文配置保存，最好配置在一個隱私文件裡，並被代碼管理工具所忽略。

MetaMask / rinkeby / 測試水管 / 從水管取得 rinkeby 乙太幣。

https://infura.io/dashboard/ethereum/36ee35c5047840b09d8c6da02899972f/overview

> node scripts/deploy.js

合约部署账户: 0xd9538901149f47890C334218Ae741e665B0AF396
合约部署耗时: 20048.361ms
合约部署成功: 0xf24F5C4a3506DD7f645f92A6a69Cf7dEf21811e6 <- `address.json`
合约查看地址: https://rinkeby.etherscan.io/address/0xf24F5C4a3506DD7f645f92A6a69Cf7dEf21811e6
地址写入成功: C:\rd\node-lottery-dapp\dapp\src\address.json

## References

[ethereum-lottery-dapp](https://github.com/wangshijun/ethereum-lottery-dapp)  
[node-"fs-extra"模块代替fs使用](https://juejin.im/post/5b52fd21e51d4519234468f1)  
[solc](https://www.npmjs.com/package/solc) solc-js JavaScript bindings for the Solidity compiler.  
[Compiling and deploying Ethereum Smart Contracts with pure JavaScript](https://medium.com/coinmonks/compiling-and-deploying-ethereum-smart-contracts-with-pure-javascript-4bee3bfe99bb)  
[@material-ui/styles](https://material-ui.com/zh/styles/basics/#material-ui-styles)  
[DApp教程：用Truffle 开发一个链上记事本](https://learnblockchain.cn/2019/03/30/dapp_noteOnChain) Infura 节点服务注册
