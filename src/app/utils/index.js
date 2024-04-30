import { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import useLocalStorage from "use-local-storage";
import _ from 'lodash'


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
    const [wallet, setWallet] =  useState();
    useEffect(()=>{
        if(window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                console.log(accounts,'accounts')
            });
            window.ethereum.on('chainChanged', (chainId, ...rest) => {
                console.log(chainId,'chained',rest)
                setWallet({...wallet, networkChainId: chainId})
            });
        }
    }, [])

    useEffect(()=>{
        async function getOnlineWallet() {
            const provider = new ethers.BrowserProvider(window.ethereum)
            const signer = await provider.getSigner(); 
            const network = await provider.getNetwork()
            const networkName = network.name;
            return {address: signer.address, network: networkName, }
        }
        getOnlineWallet().then((wallet)=> {
            setWallet(wallet)
        })
    }, [])
    return wallet
}


export const networkToColor = {
    'mainnet': 'green',
    'ropsten': 'red',
    'rinkeby': 'blue',
    'kovan': 'purple',
    'goerli': 'orange',
    'bnb': 'yellow'
}