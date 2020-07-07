# node-lottery-dapp

```js
// 向 players[index] 轉了address(this) 的以太幣
players[index].transfer(address(this).balance);
```

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

It also accepts an optional set of callback functions, which include the import and the smtSolver callbacks. Starting `0.6.0` it only accepts an object in place of the callback to supply the callbacks.

## test

`npm i mocha ganache-cli web3`  
`npm install -g mocha`

## References

[ethereum-lottery-dapp](https://github.com/wangshijun/ethereum-lottery-dapp)
[node-"fs-extra"模块代替fs使用](https://juejin.im/post/5b52fd21e51d4519234468f1)
[solc](https://www.npmjs.com/package/solc) solc-js JavaScript bindings for the Solidity compiler.
[Compiling and deploying Ethereum Smart Contracts with pure JavaScript](https://medium.com/coinmonks/compiling-and-deploying-ethereum-smart-contracts-with-pure-javascript-4bee3bfe99bb)
