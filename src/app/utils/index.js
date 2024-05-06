import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import useLocalStorage from "use-local-storage";
import _ from 'lodash'
import { net } from 'web3';


export const useWallet = () => {
    const [signer, setSigner] = useState(null)
    const [wallets, setWallets] =  useLocalStorage("wallets", []);
    const connectWallet = async () => {
        if(window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
    
        // It also provides an opportunity to request access to write
        // operations, which will be performed by the private key
        // that MetaMask manages for the user.
        await provider.send("eth_requestAccounts", []);
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    
        const signer = await provider.getSigner(); 
        const network = await provider.getNetwork()
        const networkName = network.name;
        const balanceBigNumber = await provider.getBalance(signer.address);
        const balance = ethers.formatEther(balanceBigNumber)
        const wallet = {address: signer.address, network: networkName, networkChainId: network.chainId, value: balance,label: 'wallet'}
        const newWallets = _.uniqWith([...wallets, wallet], (obj1, obj2) => {
            return obj1.address === obj2.address && parseInt(obj1.networkChainId) === parseInt(obj2.networkChainId);
          });

        return setWallets(newWallets);

        // console.log(signer,'signer')
      
        // console.log(balance, 'balance')
        // setBalance(balance)
    //     const balances = {};
    //     for (const token of tokens) { 
    //       const tokenContract = new ethers.Contract(token.address, erc20Abi, provider);
    
    //       const balance = await tokenContract.balanceOf(signer.address);
    //       console.log(balance, 'balance')
    //       const decimals = await tokenContract.decimals();
    
    //       balances[token.name] = ethers.formatUnits(balance, decimals);
    //   }
    //   console.log("Token Balances:", balances);
        }
    }
    return [wallets, connectWallet]
}


export const useOnlineWallet = () => {
    const [wallet, setWallet] =  useState({});
    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                console.log(accounts,'accounts')
            });
            window.ethereum.on('chainChanged', (chainId, ...rest) => {
                setWallet({...wallet, networkChainId: parseInt(chainId,16)})
            });
        }
    }, [wallet])

    useEffect(()=>{
        async function getOnlineWallet() {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner(); 
            const network = await provider.getNetwork()
            const networkName = network.name;
            const networkChainId = network.chainId;
            return {address: signer.address, network: networkName, networkChainId}
        }
        
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            
            // Check if MetaMask is connected to the website
            window.ethereum
                .request({ method: 'eth_accounts' })
                .then((accounts) => {
                    if (accounts.length > 0) {
                        console.log('MetaMask is connected!');
                        getOnlineWallet().then((wallet)=> {
                            console.log(wallet, 'wallet')
                            setWallet(wallet)
                        })
                        // MetaMask is connected, you can proceed with your application logic
                    } else {
                        console.log('MetaMask is not connected!');
                    }
                })
                .catch((error) => {
                    console.error('Error checking MetaMask connection:', error);
                });
        } else {
            console.log('MetaMask is not installed!');
        }
    }, [])
    return wallet
}

export const useMergedWallets = () => {
    const [wallets, connectWallet] = useWallet([])
    const onlineWallet = useOnlineWallet()
    const [mergedWallets, setMergedWallets] = useState([])
    useEffect(()=>{
        if(onlineWallet) {
            const result = wallets?.map((wallet)=>{
                console.log(wallet, 'wallet', onlineWallet, 'onlineWallet',wallet.networkChainId, onlineWallet.networkChainId, wallet.networkChainId == onlineWallet.networkChainId, wallet.address === onlineWallet.address)
                return {...wallet, online: wallet.address === onlineWallet.address && wallet.networkChainId == onlineWallet.networkChainId}
            })
            console.log(result,'result')
            setMergedWallets(result??[])
        } else {
            setMergedWallets(wallets)
        }
    }, [onlineWallet,wallets])
    return [mergedWallets, connectWallet]
}

export const networkToColor = {
    'mainnet': 'green',
    'ropsten': 'red',
    'rinkeby': 'blue',
    'kovan': 'purple',
    'goerli': 'orange',
    'bnb': 'yellow'
}

export const statusToColor = {
    'Online': 'green',
    'Offline': 'gray'
}