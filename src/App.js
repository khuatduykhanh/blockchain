import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import zombiefactory from './artifacts/contracts/zombiefactory.sol/ZombieFactory.json'
import zombiefeefing from './artifacts/contracts/zombiefeeding.sol/ZombieFeeding.json'
import './App.css';

const addressZombieFactory = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const addressZombieFeeding = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
// const addressZombieHelper = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
// const addressZombieAttack = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"
// const addressZombieOwnership = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9"
// const addressOwnable = "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707"
let zombieId = 1;
let kittyId = 1;

function generateZombie(id, name, dna) {
  let dnaStr = String(dna)
  // pad DNA with leading zeroes if it's less than 16 characters
  while (dnaStr.length < 16)
    dnaStr = "0" + dnaStr

  let zombieDetails = {
    
    headChoice: dnaStr.substring(0, 2) % 7 + 1,
    
    eyeChoice: dnaStr.substring(2, 4) % 11 + 1,
   
    shirtChoice: dnaStr.substring(4, 6) % 6 + 1,
    
    skinColorChoice: parseInt(dnaStr.substring(6, 8) / 100 * 360),
    eyeColorChoice: parseInt(dnaStr.substring(8, 10) / 100 * 360),
    clothesColorChoice: parseInt(dnaStr.substring(10, 12) / 100 * 360),
    zombieName: name,
    zombieDescription: "A Level 1 CryptoZombie",
  }
  return zombieDetails
}

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
      try {
      await contract.on("NewZombie", (_name, id, _dna) => {
        const data = generateZombie(id, _name, _dna)
        console.log(data)
        });
      }
      catch(e) {
        console.log("lỗi");
      } 
        
    
    }
  }

  async function zombiefeeding() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider })
      const signer = provider.getSigner()
      const contract = new ethers.Contract(addressZombieFeeding, zombiefeefing.abi, signer)
      const contractzombie = new ethers.Contract(addressZombieFactory, zombiefactory.abi, signer)
      const transaction = await contract.feedOnKitty(zombieId,kittyId)
      await transaction.wait()
      try {
        await contractzombie.on("NewZombie", (_name, id, _dna) => {
          const data = generateZombie(id, _name, _dna)
          console.log(data)
          });
        }
        catch(e) {
          console.log("lỗi");
        } 
      
  }
  }   
 
  
  return (
    <div className="App">
      <header className="App-header">
        <label>Nhập Tên Của Bạn</label>
        <input onChange={e => setNameZombie(e.target.value)} placeholder="Name" />
        <button onClick = {() => newzombie()} > Tạo Một Zombie mới </button>
        <button onClick = {() => zombiefeeding()} > Ăn một zombie </button>
        <br />
        
      </header>
    </div>
  );
}

export default App;
