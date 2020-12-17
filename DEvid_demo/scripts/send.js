if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed!');
  }
  


const ethereumButton = document.querySelector('.enableEthereumButton');

ethereumButton.addEventListener('click', () => {
  //Will Start the metamask extension
  ethereum.request({ method: 'eth_requestAccounts' });
});