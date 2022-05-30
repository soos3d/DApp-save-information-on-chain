
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

// Identify the accounts and connect MetaMask to the website.
async function connect() {

    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    // Prompt user for account connection
    await provider.send("eth_requestAccounts", []);

    // define the address signing the transactions (account selected)
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    // create smart contract instance usinf address and ABI
    smartContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer);
}

// call the saveString function from the smart contract, use the input field as parameter
async function saveString() {
    const string = document.getElementById("input").value;
    smartContract.saveString(string);
}

// call the getString function from the smart contract
async function getString() {
    const getSPromise = smartContract.getString();
    const string = await getSPromise;
    alert("Your saved string is: " + string);
}
