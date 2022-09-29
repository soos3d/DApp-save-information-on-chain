# Create a DApp to save information on chain

## Introduction

I've been making articles and tutorials about simple web3 development concepts to help people get into web3; today, it's time to learn how to create a DApp! This tutorial will develop a simple DApp, which includes the front end. You can find all of the files in the repository. 

We'll use vanilla HTML, vanilla CSS, and `ethers.js` to make this DApp. This is an excellent way to start learning how to make a DApp.

# Table of contents

  - [Introduction](#introduction)
  - [What will this DApp do?](#what-will-this-dapp-do)
    - [The repository contains](#the-repository-contains)
  - [Requirements](#requirements)
  - [The code](#the-code)
  - [The HTML code](#the-html-code)
    - [Import the CSS styling file](#import-the-css-styling-file)
    - [Import the JavaScript file and Etheres library](#import-the-javascript-file-and-etheres-library)
    - [The HMTL body](#the-hmtl-body)
  - [The Soldity code](#the-soldity-code)
    - [Deploy from Remix](#deploy-from-remix)
  - [The JavaScript code](#the-javascript-code)
    - [The JavaScript functions](#the-javascript-functions)
  - [Conclusion](#conclusion)

## What will this DApp do?

This simple DApp demonstrates a blockchain use case different than DeFi.

This website allows you to connect your MetaMask wallet to it and then interact with a smart contract to save a string on a chain, testnet Fantom in this case. The saved string is associated with the address, and only that same address can retrieve it.

The most known use cases for blockchain technology are linked to DeFi, but these networks are an amazing resource to store information in general, as once the data is stored, it is recorded on chain permanently. 

> **Note** that because of the blockchain's tech nature, anyone could see the information you are storing on the smart contract when you call the function. This app is for demonstrating a use case, and you should not use it to store confidential information.

### The repository contains
* index.html - Content and structure of the webpage
* style.css - Styling of the webpage
* script.js - JavaScript functionality, what makes the buttons work
* SaveString.sol - Smart contract code

> **Note** that the smart contract is already [deployed and verified on the FTM testnet](https://testnet.ftmscan.com/address/0x0287f57a1a17a725428689dfd9e65eca01d82510#code), you can deploy your own smart contract on any network, you would just need to modify the contract address into script.js.

## Requirements 

To serve the webpage, you can use a simple node server. So let's start by installing `Node.js` and `lite-server` so that we can see the page.

Follow these instructions:

1. Install Node.js - <a href="https://nodejs.org/en/download/">Download and instructions</a>.
1. Install lite-server (with NPM in a terminal/command prompt).
  
  ```sh
  npm install -g lite-server 
  ```
  
  Now, you have the tools to serve a webpage on localhost.
  
  
  <ol>1 - Create a new folder and save the files from this project in it.</ol>
  <ol>2 - Serve the webpage via terminal/command prompt from the directory that has <code>index.html</code> in it and run:</ol>
 
 ```
 lite-server
 ```
 Now, your webpage will be available on http://127.0.0.1:3000/.
 
## The code

This website uses the Solidity language for the smart contract and JavaScript and the `Ethers` library to communicate with MetaMask and the blockchain. 

## The HTML code

Let's start by creating an HTML boilerplate that we can then use to make our DApp, I named the file `index.html` and gave the title of `Save a string on chain`.

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
    <title>Save a string on chain</title>
</head>

<body>


</body>

</html>
```

### Import the CSS styling file

We can already link the CSS stylesheet to the page using this line in the `<head>`; remember that this CSS code just gives some basic styling, and the DApp will work even if you don't have any styling. 

```html
<link rel="stylesheet" type="text/css" href="./style.css"/>
```

You can [download the CSS file from the repository](https://github.com/soos3d/dApp-save-information-on-chain) or create a new `.css` file in the project folder and paste the following code.

```css
body {
    text-align: left;
    font-family: Arial, Helvetica, sans-serif;
}

.center {
    text-align: center;
}

.parent {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.div1 {
    grid-area: 1 / 1 / 2 / 3;
}

.div2 {
    grid-area: 2 / 1 / 3 / 3;
    background-color: #FFD700;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.div3 {
    grid-area: 3 / 1 / 4 / 2;
    background-color: DodgerBlue;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.div4 {
    grid-area: 3 / 2 / 4 / 3;
    background-color: Tomato;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

button {
    width: 150px;
    padding: 8px;
    border-radius: 10px;
}

label {
    padding: 20px;
}
```

### Import the JavaScript file and Etheres library

Now we can import the JavaScript file where we will code the logic of the DApp and the Ethers library.

In the project's folder create a new file named `script.js`. Then we can import it in the `<head>` of the HTML code with the following line:

```html
<script src="script.js"></script>
```

Then we import the ethers.js library, place this statement in the `<head>` as well, and we'll import the library without having to install any dependencies.

```html
<script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
```

At this point the head section of the HTML looks like this:

```html
<meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="./style.css" />

    <script src="https://cdn.ethers.io/lib/ethers-5.2.umd.min.js" type="application/javascript"></script>
    <script src="script.js"></script>
    
    <title>Save a string on chain</title>
</head>
```

### The HMTL body 

After we set up the imports, let's create the page's body and paste the following code into the HTML body, this is some basic HTML just to make a bare front end.

```html
<body>
    <div class="parent">
        <div class="div1">
            <h1 class="center">Save a word on the blockchain</h1>
            <h2 class="center">This dApp allows you to save a word, a sentence, or a code on the blockchain.</h2>
            <p>Blockchain technology is more than just DeFi applications, the possibilities are endless, and this website was created to demonstrate that. Blockchains are a great system to store information.</p>
            <p>The smart contract linked to this website allows an address to store a sentence, can be a word, a code, or anything else you would like to save. And only that same address can retrieve and read that information.</p>
            <p class="center">Get some test FTM here: <a href="https://faucet.fantom.network/" target="_blank">Test FTM faucet</a></p>
            <h3 class="center">Warning!</h3>
            <p><b>Keep in mind that this dApp is created for educational purposes, it is not designed with any security measure, and because of the blockchain's nature, everyone can see the information you pass through the functions. You should avoid storing actual sensitive information, the idea is just to show a use case.</b></p>
            <p class="center">Any time you save a new string from the same address, the previous one is overwritten!</p>
            <p class="center">The areas to interact with are divided by very distinct colors.</p>
        </div>

        <div class="div2">
            <h3>Click the button to connect MetaMask to the website</h3>
            <button onclick="connect()">Connect Wallet</button>
        </div>

        <div class="div3"><label>Input sentence to save </label>
            <input type="text" id="input" /><br>
            <button onclick="saveString()">Save Sentence</button>
        </div>

        <div class="div4"> <label>Get your sentence back</label>
            <button onclick="getString()">Retrieve Sentence</button><br>
        </div>
    </div>

    </div>

</body>
```

The buttons are to note since these elements will call the functions to interact with the smart contract. The `onclick` event allows us to call functions from the JavaScript code.

```html
  <div class="div2">
    <h3>Click the button to connect MetaMask to the website</h3>
    <button onclick="connect()">Connect Wallet</button>
  </div>

  <div class="div3"><label>Input sentence to save </label>
    <input type="text" id="input" /><br>
    <button onclick="saveString()">Save Sentence</button>
  </div>

  <div class="div4"> <label>Get your sentence back</label>
    <button onclick="getString()">Retrieve Sentence</button><br>
  </div>
```

Now our HTML file is ready, we can focus on making the smart contract and creating the logic for our DApp. You can already see what the front end looks like if you serve the page. 

In the terminal run `lite-server`, and your page will be available on http://127.0.0.1:3000/, it should look like this:

![screely-1663686534016](https://user-images.githubusercontent.com/99700157/191295436-3304b343-d6e3-4a4b-83e6-836a5736ca8b.png)

## The Soldity code

At this point, we have our front end coded and ready; let's work on the smart contract of our DApp! This smart contract is pretty simple, and we can code it and test it using the [Remix IDE](https://remix.ethereum.org/).

In Remix, let's create a new `.sol` file named `SaveString.sol` (or download it from the repo).

Here, we will code the smart contract and create the logic for our DApp. The contract will allow us to save a string on the chain and associate it to the address that called the function by using a mapping. 

Paste the following code in the `SaveString.sol` file we just created. The code is commented on so you can understand what we do! If you are unfamiliar with Solitidy, I recommend following my course on Skillshare! You can have 30 days for free by signing up [from this link](https://skl.sh/3K3VJXg)!

```sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SaveString {

    // This mapping allows to associate an address with a string
    mapping(address => string) public savedStrings;


    // Function to save a string into the mapping with the address calling the function
    function saveString(string memory _string) public {
        savedStrings[msg.sender] = _string;
    }

    // Function to retrieve a string from the mapping, based on what address is calling it
    function getString() public view returns(string memory) {
        return savedStrings[msg.sender];
    }
}
```

You can deploy in the Remix VM and test it to see how it works; it only has two functions, one to save a string and one to retrieve it. Thanks to the mapping, the string saved is only called by the address that saved it!

Now, to use it from our front end, we can deploy it on the network; in this case, I use the Fantom testnet. Of course, you can deploy it on any EVM-compatible chain, but you can [get some Fantom testnet](https://faucet.fantom.network/) from this website if you want to do it on Fantom. 

### Deploy from Remix

There are different ways to deploy a smart contract on a blockchain, but today we'll keep it simple and deploy our contract on the Fantom testnet directly from Remix! 

After the smart contract is ready, the first step is to compile it. First, let's go to the `Solidity compiler` tab, where we can choose the compiler version and compile the smart contract.

We are using the 0.8 compiler version, so I'll pick the latest version, the 0.8.17, at this time. Then click on the `Compile` button or press `Ctrl` + `s`.

![screely-1664395978154](https://user-images.githubusercontent.com/99700157/192880527-86640a8e-f2e9-46aa-b7e0-099748834180.png)

Once the contract compiles correctly, we can deploy it. Select the Fantom testnet on your MetaMask; again, you can deploy a node using Chainstack!

To set up your node:

1. Sign up on Chainstack and set up an <a href="https://console.chainstack.com/user/account/create">account</a>.
1. <a href="https://docs.chainstack.com/platform/join-a-public-network"> Deploy a node on Chainstack</a>.
1. <a href="https://support.chainstack.com/hc/en-us/articles/360034636571-Using-MetaMask-Desktop-with-Chainstack">Add the new Chainstack node endpoint to your MetaMask.</a>

After that, go on the `Deploy & run transactions` tab, select `Injected provider - MetaMask` and click `Deploy` (make sure to select the correct contract). After you approve the transaction, your contract will be deployed on the Fantom testnet! You can check mine on the [Fantom testnet explorer](https://testnet.ftmscan.com/address/0x0287f57a1a17a725428689dfd9e65eca01d82510#code).

![screely-1664399208889](https://user-images.githubusercontent.com/99700157/192888915-753792f1-a032-4ffe-983a-19320874e740.png)

## The JavaScript code

At this point, we only need to link our front end to the smart contract; to do this, we use the `ethers.js` library. In this tutorial, we use a separate JavaScript file; in the repository, you will find the `script.js` file containing the JS code, but you can also type all of the JavaScript code inside a `<script>` tag in the HTML.

So we create a file named `script.js` and the first thing we want to do is to create an interface with the smart contract, so we add two variables, one for the contract address, and one for the ABI. 

```js
// Smart contract address
const contractAddress = "0x0287f57a1a17a725428689dfd9e65eca01d82510";

// Smart contract ABI
const contractABI = [{
        "inputs": [{
            "internalType": "string",
            "name": "_string",
            "type": "string"
        }],
        "name": "saveString",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getString",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "savedStrings",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    }
]
```

You can put the address from the smart contract that you deployed or keep the contract that I deployed, but it has to be on the Fantom testnet if you leave mine. 

The ABI will be the same if you used the exact same code as me, but if you changed names to variables and functions, you'd have to use yours; you can find it in Remix in the `Solidity Compiler` tab. Finally, you can select the smart contract and copy the ABI.

![screely-1664467927442](https://user-images.githubusercontent.com/99700157/193083725-723e2e0b-47f4-4b65-a2b9-6f124a910fe2.png)

Now we have an interface to interact with the smart contract. Now let's see how the functions work.

### The JavaScript functions

We first want to connect the page to your MetaMask, so you can interact with the smart contract and use your account to sign the transactions to save and retrieve the strings. 

Inside the `script.js` file, this function detects the addresses in your MetaMask, connects MetaMask to the webpage, and create a smart contract instance.

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

This function calls the `saveString()` function in the smart contract, passing the string inside the input field as the parameter. We create a variable called `string` and use the `getElementById` property to take the value of the input box with `id="input"` in the HTML; that's the string that will be saved inside the smart contract. 

```
async function saveString() {
    const string = document.getElementById("input").value;
    smartContract.saveString(string);
}
```

This function then calls the `getString()` function in the smart contract. Then shows an alert on the screen containing the retrieved string.

```
async function getString() {
    const getSPromise = smartContract.getString();
    const string = await getSPromise;
    alert("Your saved string is: " + string);
}
```

These functions are all linked to the relative buttons in the front end. After saving the `script.js` file, you can serve the page using the `lite-server` command, and you'll see a page like this.

![image](https://user-images.githubusercontent.com/99700157/171203129-66b29a30-bf94-4053-ae47-4a5f3011255f.png)
 
Now you can interact with the smart contract!

1. Click the "Connect Wallet" button and follow the instructions on MetaMask.
1. Input the piece of information that you want to save on the smart contract, which can be a word, a number, or a sentence.
1. Click the "Save Sentence" button and complete the transaction from MetaMask.
1. Click the "Retrieve Sentence" button to show an alert on the screen containing the word you saved from that address!

Try to save multiple words from different addresses, so you can see how each piece of info saved is based on the address!

## Conclusion

This tutorial showed you how to create a DApp! Yes, it is simple, but that's how you start, and now you have the fundamentals to develop your own DApp!
