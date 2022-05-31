# dApp to save information on chain
This simple dApp demonstrates a blockchain use case different than DeFi.

This website allows you to connect your MetaMask wallet to it and then interact with a smart contract to save a string on a chain, testnet Fantom in this case. The saved string is associated with the address, and only that same address can retrieve it.

The most known use cases for blockchain technology are linked to DeFi, but these networks are an amazing resource to store information in general, as once the data is stored, it is recorded on chain permanently. 

<h3> Note that because of the blockchain's tech nature, anyone could see the information you are storing on the smart contract when you call the function. This app is for demonstrating a use case, and you should not use it to store confidential information.</h3>

<h2>This repository contains:</h2>
<ol>index.html - Content and structure of the webpage</ol>
<ol>style.css - Styling of the webpage</ol>
<ol>script.js - JavaScript functionality, what makes the buttons work</ol>
<ol>SaveString.sol - Smart contract code</ol>

<b>Note that the smart contract is already deployed and verified on the FTM testnet, you can deploy your own smart contract on any network, you would just need to modify the contract address innto script.js</b>

<h2>How to run and serve the page</h2>
