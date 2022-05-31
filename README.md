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

To serve the webpage, you can use a simple node server. Follow these instructions:
<ol>1 - Install Node.js - <a href="https://nodejs.org/en/download/">Download and instructions</a>.</ol>
<ol>2 - Install lite-server (with NPM in a terminal/command prompt).</ol>
  
  ```
  npm install -g lite-server 
  ```
  
  Now, you have the tools to serve a webpage on localhost.
  
  
  <ol>1 - Create a new folder and save the files from this project in it.</ol>
  <ol>2 - Open the folder in a code editor, like Atom or VS Code.</ol>
  <ol>3 - Open the <code>index.html</code> file.</ol>
  <ol>4 - Serve the webpage via terminal/command prompt from the directory that has <code>index.html</code> in it and run:</ol>
 
 ```
 lite-server
 ```
 Now, your webpage will be available on http://127.0.0.1:3000/.
 
 <h2>How does it work?</h2>
The purpose of this project, is to show a blockchain use case different than DeFi.

The smart contract is already deployed and verified on the Fantom testet, so you can run this website and use it out of the box. Keep in mind that this is a basic example, and some features can be added to make it more functional. A great way to learn would be to modify the base smart contract and add extra features!

To run it out of the box, you need to have a Fantom testned endpoint in your MetaMask. I recommend using Chainstack for this. Chainstack provides fast and reliable node endpoints for many EVM protocols.

To set up your node:

<ol>Sign up on Chainstack and set up an <a href="https://console.chainstack.com/user/account/create">account</a>.</ol>
<ol><a href="https://docs.chainstack.com/platform/join-a-public-network"> Deploy a node on Chainstack</a>.</ol>

<ol><a href="https://support.chainstack.com/hc/en-us/articles/360034636571-Using-MetaMask-Desktop-with-Chainstack">Add the new Chainstack node endpoint to your MetaMask.</a></ol>

Now you can interact with the smart contract!

<ol>1 - Click the "Connect Wallet" button and follow the instructions on MetaMask</ol>
<ol>2 - Input the piece of information that you want to save on the smart contract, which can be a word, a number, or a sentence.</ol>
<ol>3 - Click the "Save Sentence" button and complete the transaction from MetaMask</ol>
<ol>4 - Click the "Retrieve Sentence" button to show an alert on the screen containing the word you saved from that address!</ol>

Try to save multiple words from different addresses, so you can see how each piece of info saved is based on the address.

<h2>How does the code work?</h2>
This website uses JavaScript and the ethers libray to communicate with MetaMask and the blockchain.
<p></p>
Inside the <code>index.html</code> file, this line retrieves the ethers.js library without having to install any dependencies.
<p></p>

```
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
```
<p></p>
Inside the <code>script.js</code> file, this function detects the addresses in your MetaMask, connects MM to the webpage, and create a smart contract instance.
<p></p>

```
async function connect() {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Prompt user for account connection
    await provider.send("eth_requestAccounts", []);

    // define the address signing the transactions (account selected)
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    // create smart contract instance using address and ABI
    smartContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer);
}
```

<p></p>
This function calls the <code>saveString()</code> function in the smart contract, passing the string inside the input field as the parameter.
<p></p>

```
async function saveString() {
    const string = document.getElementById("input").value;
    smartContract.saveString(string);
}
```
<p></p>
This function calls the <code>getString()</code> function in the smart contract. Then shows an alert on the screen containing the retrieved string.
<p></p>

```
async function getString() {
    const getSPromise = smartContract.getString();
    const string = await getSPromise;
    alert("Your saved string is: " + string);
}
```
