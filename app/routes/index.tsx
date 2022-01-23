import react, { useState, useEffect } from 'react';
import { Link } from 'remix';
import styled from 'styled-components';
import type Web3Type from 'web3';

import spinner from '~/assets/loading.gif';

declare let window: any;
declare let Web3: typeof Web3Type;
declare let ethereum: any;
declare let web3: any;

interface IGibOrbs {
  success: boolean;
}

const GibOrbs = styled.div<IGibOrbs>`
  transition: background-color 0.5s ease;
  width: 100%;
  height: 100vh;
  background-color: ${props => props.success ? '#34CC51' : '#333'};
  padding: 1rem;
  color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  a.btn {
    color: #ccc;
    text-decoration: none;
    font-size: 1.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border: 1px solid #fff;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      color: #fff;
    }
  }

  p {
    font-size: 1rem;

    a {
      color: #ccc;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #fff;
      }
    }
  }

  img {
    width: 30rem;
  }
`;

const Index = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    console.log('hello');
    if (window.ethereum){
        console.log('a');
        window.web3 = new Web3(window.ethereum);
        try {
            await ethereum.enable();
        } catch(error) {
            document.getElementById('metamask')!.innerHTML = "Error occured when opening Metamask"+ error
        }
    } else if (window.web3){
        console.log('b');
        window.web3 = new Web3(web3.currentProvider);
    } else{
        console.log('c');
        document.getElementById('metamask')!.innerHTML = 'Please download and install Metamask: <a href="https://metamask.io/">https://metamask.io/</a>'
    }
    console.log('hello');
  }

  useEffect(() => {
    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);


  const openMetamask = async () => {
    var contractAddress = "0x4Af85eBE7F8dd30E6AbE585d459894B564e00cd8" // orbs
    var users = await web3.eth.getAccounts();
    var currentUser = users[0];
    var ethAmount = 0
    var contractABI = [
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "token_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "name": "approveAndCall",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "mintOrbs",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transfer_from_escrow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transfer_to_escrow",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokens",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "success",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "tokenOwner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "remaining",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "token_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "balance",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]

    var contractInstance = new web3.eth.Contract(contractABI, contractAddress);

    const orbPrinterCallback = (error: any, txid: any) => {
      if (error) {
        document.getElementById('error')!.innerHTML = error;
      }
      setLoading(true);
      document.getElementById('txid')!.innerHTML = "Track the payment: <a href='https://etherscan.io/tx/" + txid + "'>https://etherscan.io/tx/" + txid + '</a>';
    }

    contractInstance.methods.mintOrbs(1000).send({from: currentUser}, orbPrinterCallback).then(
      (result: any) => {
        if (result.status === true) {
          setSuccess(true);
          setLoading(false);
        }
      });
    }

  return <>
    <GibOrbs success={success}>
      <h1>welcome to orbidity</h1>
      <h2>we put the fun in fungible tokens</h2>
      { (!success && !loading) && <>
          <a className='btn' onClick={openMetamask}>Mint 10 ORBs to my address</a>
        </> }
      <p id="txid"></p>
      {loading && <img src={spinner} />}
      {success && <>
        <h2>Success!</h2>
        <Link to={'/app/tutorial'} className='btn' onClick={openMetamask}>Continue to app now you have tokens and start the tutorial!</Link>
      </>}
    </GibOrbs>
  </>
}

export default Index;