import React, { Component } from 'react';
import Web3 from 'web3';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './App.css';
import address from './address.json';
import { interface as ABI } from './Lottery.json';

import Cylinder from "./components/Cylinder";

const web3 = new Web3(window.web3.currentProvider);
const contract = new web3.eth.Contract(JSON.parse(ABI), address);

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #a0deff 30%, #546fff 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 30,
  width: '100%',
  padding: '0 30px',
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: '',
      players: [],
      balance: '0',
      amount: '0',
      message: '',
      loading: false,
      isOwner: false
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onParticipate = this.participate.bind(this);
    this.onPickWinner = this.pickWinner.bind(this);
  }

  ethEnabled = () => {
    if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      window.ethereum.enable();
      return true;
    }
    return false;
  }

  async componentDidMount() {

    this.ethEnabled()

    const [owner, players, balance] = await Promise.all([
      contract.methods.owner().call(), //合約擁有者
      contract.methods.getPlayers().call(),
      web3.eth.getBalance(contract.options.address),
    ]);

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const isOwner = owner === account ? true : false;
    console.log({ owner, players, balance, account, isOwner });
    
    this.setState({ owner, players, balance, isOwner });
  }

  onInputChange(e) {
    this.setState({ amount: e.target.value });
  }

  async participate() {
    try {
      this.setState({ message: '参与抽奖中，请稍后...', loading: true });

      const accounts = await web3.eth.getAccounts();
      await contract.methods.participate().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.amount, 'ether'),
      });

      this.setState({ message: '参与成功！', loading: false });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      this.setState({ message: err.message || err.toString(), loading: false });
    }
  }

  async pickWinner() {
    try {
      this.setState({ message: '开奖中，请稍后...', loading: true });

      const accounts = await web3.eth.getAccounts();
      await contract.methods.pickWinner().send({
        from: accounts[0],
      });

      this.setState({ message: '开奖完毕！', loading: false });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.error(err);
      this.setState({ message: err.message || err.toString(), loading: false });
    }
  }

  render() {
    const { balance, players, amount, loading, message, owner, isOwner } = this.state;
    
    return (
      <div className="App">
        <div className="App-header">
          <h2 className="App-title">基于智能合约的抽奖</h2>
        </div>
        <div className="App-body">
          <MyButton>奖金池金额 ETH {web3.utils.fromWei(balance, 'ether')}</MyButton>
          <div className="money">合约地址：<span id="cash">{address}</span></div>
          <Cylinder num={players.length}/>
          <p>
              共 {players.length} 人参与抽奖
          </p>

          <hr />

          <h3>想试试手气?</h3>
          <div>
            <label>
              输入随机金额
              <input type="number" value={amount} onChange={this.onInputChange} />
            </label>
            <button onClick={this.onParticipate} disabled={loading}>
              参与抽奖
            </button>
          </div>

          <hr />

          <h3>开奖时间到?</h3>
          <button onClick={this.onPickWinner} disabled={!isOwner}>
            立即开奖
          </button>

          <hr />
          <p>合约管理员：{owner}</p>
         

          <h3 className="message">{message}</h3>
        </div>
      </div>
    );
  }
}

export default App;
