import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import contract from 'truffle-contract';
import unit from 'ethjs-unit';
import BN from 'bn.js';
import 'whatwg-fetch';

import Heading from './components/Heading';
import Dialog from './components/Dialog';
import Instructions from './components/Instructions';
import NoEther from './components/NoEther';
import Balances from './components/Balances';
import PurchaseAdt from './components/PurchaseAdt';
import TxHash from './components/TxHash';
import ICO from './assets/Sale.json';
import HumanStandardToken from './assets/HumanStandardToken.json';
import AdTokenPrice from './components/AdTokenPrice';

import pope from './assets/tokenpope.png';
import turkey from './assets/maxresdefault.jpg';

const styles = {
  welcome: {
    color: '#d37a15',
    paddingTop: '1em',
  },
  imgStyle: {
    maxWidth: '350px'
  },
  FlexContainer: {
    display: 'flex',
    textAlign: 'left',
    padding: '1em 2em 0',
    margin: '1em 2em 0',
  },
  FlexItem: {
    padding: '2em 2em 0',
    // padding: '1em',
    // margin: '2em',
  },
  track: {
    padding: '.25em 1em',
  }

  // container: {
  //   margin: '2em',
  //   color: '#4585c7',
  //   fontSize: '1.3em'
  // }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      amount: 1,
      ethBalance: '-',
      adtBalance: '-',
      txHash: '',
      message: 'Please unlock MetaMask and connect to the Ethereum Main Network',
      subMessage: ''
    };
  }

  componentDidMount() {
    window.setTimeout(() => {
      if (typeof this.web3 !== 'undefined') {
        this.web3 = new Web3(this.web3.currentProvider);
      } else if (typeof window.web3 !== 'undefined') {
        this.web3 = new Web3(window.web3.currentProvider);
      } else {
        throw new Error('You need MetaMask!');
      }

      this.web3.eth.defaultAccount = this.web3.eth.accounts[0];
      if (this.web3.eth.defaultAccount) {
        this.setupBalances();
      } else if (this.web3.eth.defaultAccount === undefined) {
        this.setState({
          message: 'Please unlock MetaMask and connect to the Ethereum Main Network'
        });
      }
    }, 900);
  }

  getSale = async () => {
    // let saleUrl = 'https://s3-us-west-2.amazonaws.com/adchain-registry-contracts/Sale.json';
    // let saleUrl = 'https://s3.amazonaws.com/turkeycoinico/Sale.json';
    // let saleArtifact;

    // try {
    //   // saleArtifact = await fetch(saleUrl);
    // } catch (err) {
    //   return false;
    // }

    // const Sale = contract(await saleArtifact.json());
    const Sale = contract(ICO);

    Sale.setProvider(this.web3.currentProvider);
    Sale.defaults({ from: this.web3.eth.defaultAccount })

    try {
      await Sale.deployed();
    } catch (err) {
      this.setState({
        message: 'Please unlock MetaMask and connect to the Ethereum Main Network'
      });
    }

    return Sale.deployed();
  };

  getToken = async () => {
    const sale = await this.getSale();
    const tokenAddress = await sale.token.call();

    if (!sale) {
      return false;
    }

    // let tokenUrl =
    // 'https://s3.amazonaws.com/turkeycoinico/HumanStandardToken.json';
    // const tokenArtifact = await fetch(tokenUrl);
    // const Token = contract(await tokenArtifact.json());
    const Token = contract(HumanStandardToken)
    Token.setProvider(this.web3.currentProvider);
    Token.defaults({ from: this.web3.eth.defaultAccount });

    return Token.at(tokenAddress);
  };

  trimDecimals = (n) => (+n).toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, '$1');

  setupBalances = async () => {
    const token = await this.getToken();

    if (!token) {
      this.setState({
        message: 'Hmm...something went wrong. If you are running an ad blocker, please disable it to continue'
      });
      return false;
    }

    const account = this.web3.eth.accounts[0];
    const rawBal = await token.balanceOf.call(account);

    const adtDisplayValue = rawBal.div(new BN('10', 10).pow(new BN('18', 10)));

    const adtBalance = this.trimDecimals(adtDisplayValue);

    this.web3.eth.getBalance(account, (err, res) => {
      const ethDisplayValue = res.div(new BN('10', 10).pow(new BN('18', 10)));
      const ethBalance = this.trimDecimals(ethDisplayValue);

      this.setState({
        message: 'Your MetaMask address:',
        subMessage: account,
        adtBalance: adtBalance.toString(10),
        ethBalance: ethBalance.toString(10)
      });
    });
  };

  handleChange = e => {
    this.setState({
      amount: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const saleInstance = await this.getSale();

    console.log('saleInstance', saleInstance);

    const weiValue = unit.toWei(this.state.amount, 'ether');

    const txn = {
      from: this.state.subMessage,
      value: weiValue
    }

    const txHash = await saleInstance.purchaseTokens.sendTransaction(txn);

    this.setState({
      txHash: txHash
    })
  };

  render() {
    return (
      <div className="App">
        <div style={styles.welcome}>
          <h1>{'Welcome to the TurkeyCoin ICO!'}</h1>
        </div>
        <div style={styles.FlexContainer}>
          {/* <div style={styles.FlexItem}> */}
          <Heading />
          {/* </div> */}

          <div style={styles.FlexItem}>
            {/* <h1>{'Welcome to the TurkeyCoin ICO!'}</h1> */}
            <iframe width="560" height="315" src="https://www.youtube.com/embed/cZFAWi1N6zc" title='March of the turkeys' frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={styles.FlexContainer}>
          <div style={styles.FlexItem}>
            <Instructions
              message={"To purchase TurkeyCoin using MetaMask, first make sure you're on the Ethereum Main Network."}
              subMessage={'Then input the amount of Ether you would like to send, and fire away!'}
            />

            <AdTokenPrice />

            <img src={pope} alt="turkey logo" style={styles.imgStyle} />

            <div style={styles.track}>
              <a href="https://etherscan.io/token/0x688f95e3416b3960a2bbcc1d25a2c17aff9aefc6" target="_blank" rel="noopener noreferrer">
                {'You can track TurkeyCoin here'}
              </a>
              {' and '}
              <a href="https://etherscan.io/address/0xA21b90a53ccaBC16817583fE7F568f9b951a8d54" target="_blank" rel="noopener noreferrer">
                {'watch the wallet here'}
              </a>
            </div>
          </div>
          <div style={styles.FlexItem}>
            <Dialog
              message={this.state.message}
              subMessage={this.state.subMessage}
            />

            {this.state.subMessage && (
              <div>
                <Balances
                  adtBalance={this.state.adtBalance}
                  ethBalance={this.state.ethBalance}
                />

                <PurchaseAdt
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  amount={this.state.amount}
                />

                {this.state.txHash && <TxHash txHash={this.state.txHash} />}
                <img src={turkey} alt="turkey logo" style={styles.imgStyle} />
              </div>
            )}
          </div>
        </div>


        <iframe width="560" height="315" src="https://www.youtube.com/embed/jWwVaUiva_I" title='Gobbling Wild Turkeys Scare Off Rooster' frameBorder="0" allowFullScreen></iframe>

        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>

        <div>Icons made by <a href="https://www.flaticon.com/authors/twitter" title="Twitter">Twitter</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
      </div>
    );
  }
}

export default App;
