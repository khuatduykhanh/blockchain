import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import zombiefactory from './artifacts/contracts/zombiefactory.sol/ZombieFactory.json'
import './App.css';

const addressZombieFactory = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// const addressZombieFeeding = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
// const addressZombieHelper = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// const addressZombieAttack = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
// const addressZombieOwnership = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
// const addressOwnable = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"

function App() {
  
  const [nameZombie, setNameZombie] = useState()
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function newzombie() {
    if (!nameZombie) return
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(addressZombieFactory, zombiefactory.abi, signer)
      const transaction = await contract.createRandomZombie(nameZombie)
      await transaction.wait()
       
       contract.NewZombie().watch({}, '', function(error, result) {
        if (!error) {
            console.log("Name " + result.args.name +
                " ZombieId " + result.args.zombieId +
                " Dna " + result.args.dna + ".");
            
        }
    })
    }
  }

  
 
  
  return (
    <div className="App">
      <header className="App-header">
        <label>Nhập Tên Của Bạn</label>
        <input onChange={e => setNameZombie(e.target.value)} placeholder="Name" />
        <button onClick = {newzombie()} > Tạo Một Zombie mới </button>
        <br />
        
      </header>
    </div>
  );
}

export default App;
