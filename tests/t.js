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
    .send({ from: accounts[0], gas: '2000000' });
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
    await contract.methods.participate(1).send({
      from: accounts[0],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate(2).send({
      from: accounts[1],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate(3).send({
      from: accounts[2],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate(4).send({
      from: accounts[3],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate(5).send({
      from: accounts[4],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    await contract.methods.participate(6).send({
      from: accounts[5],
      value: web3.utils.toWei('0.1', 'ether'),
    });

    const initialBalance = await web3.eth.getBalance(accounts[0]);
    const res = await contract.methods.bet_lucky1().call({
      from: accounts[0],
    });
    // const finalBalance = await web3.eth.getBalance(accounts[0]);
    // const difference = finalBalance - initialBalance;
    // console.log(0, accounts[0], { difference, initialBalance, finalBalance });

    console.log(res);

    // const difference_winner = await web3.utils.fromWei(res[8], 'ether');
    // console.log(res[7],difference_winner+'ether');
    // assert.equal(res, {});
    // assert(false);
  });
});

