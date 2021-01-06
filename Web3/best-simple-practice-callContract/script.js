import Web3 from 'web3'

const ABI = [
	{
		"inputs": [],
		"name": "coolNumber",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_coolNumber",
				"type": "uint256"
			}
		],
		"name": "setCoolNumber",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
const contractAddress = "0xC317cb2fcaEc4115c50aBf062AA3427E9E18823D"

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
    }
}
async function loadContract() {
    return await new window.web3.eth.Contract(ABI, contractAddress);
}

async function load() {
    await loadWeb3();
    window.contract = await loadContract();
    updateStatus('Ready!');
}

async function printCoolNumber() {
    updateStatus('fetching Cool Number...');
    const coolNumber = await window.contract.methods.coolNumber().call();
    updateStatus(`coolNumber: ${coolNumber}`);
}

async function changeCoolNumber() {
    const value = Math.floor(Math.random() * 100);
    updateStatus(`Updating coolNumber with ${value}`);
    const account = await getCurrentAccount();
    const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
    updateStatus('Updated.');
}

const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });

async function getCurrentAccount() {
    const accounts = await window.web3.eth.getAccounts();
    return accounts[0];
}

function updateStatus(result) {
    const resultEl = document.getElementById('result');
    resultEl.innerHTML = result;
    console.log(result);
}

load();



