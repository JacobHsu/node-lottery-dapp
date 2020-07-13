const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compiled/Lucky1.json');

const web3 = new Web3(ganache.provider());

let accounts;
let contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  contract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Lottery Contract', () => {
  it('should deploy contract', () => {
    // console.log('//contract.options.address', contract.options.address)
    assert.ok(contract.options.address);
  });

  it('should have owner', async () => {
    const owner = await contract.methods.owner().call();
    // console.log(`owner = ${owner} ,accounts = ${accounts} `)
    // console.log( {owner, accounts} )
    assert.equal(owner, accounts[0]);
  });

  it('randomNewLucky', async () => {
    await contract.methods.participate().send({
      from: accounts[0],
      value: web3.utils.toWei('0.3', 'ether'),
    });

    await contract.methods.participate().send({
      from: accounts[1],
      value: web3.utils.toWei('0.2', 'ether'),
    });

    await contract.methods.participate().send({
      from: accounts[2],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate().send({
      from: accounts[3],
      value: web3.utils.toWei('0.01', 'ether'),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    const initialBalance1 = await web3.eth.getBalance(accounts[1]);
    const initialBalance2 = await web3.eth.getBalance(accounts[1]);
    const res = await contract.methods.participate_lucky1().call({
      from: accounts[0],
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    const difference = finalBalance - initialBalance;
    console.log(0, accounts[0], { difference, initialBalance, finalBalance });

    const finalBalance1 = await web3.eth.getBalance(accounts[1]);
    const difference1 = finalBalance1 - initialBalance1;
    console.log(1, accounts[1], { difference1, initialBalance1, finalBalance1 });

    const finalBalance2 = await web3.eth.getBalance(accounts[2]);
    const difference2 = finalBalance2 - initialBalance2;
    console.log(2, accounts[2], { difference2, initialBalance2, finalBalance2 });

    // ( winner, loser, commonRandom[0],commonRandom[1],commonRandom[2],commonRandom[3], players )
    console.log(res);

    const difference_winner = await web3.utils.fromWei(res[10], 'ether');
    console.log(res[7],difference_winner+'ether');
    // assert.equal(res, {});
    // assert(false);
  });
});

