// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const ZombieFactory = await hre.ethers.getContractFactory("ZombieFactory");
  const zombiefactory = await ZombieFactory.deploy();
  await zombiefactory.deployed();

  console.log("zombiefactory deployed to:", zombiefactory.address);


  const ZombieFeeding = await hre.ethers.getContractFactory("ZombieFeeding");
  const zombiefeeding = await ZombieFeeding.deploy();
  await zombiefeeding.deployed();

  console.log("zombiefeeding deployed to:", zombiefeeding.address);


  const ZombieHelper = await hre.ethers.getContractFactory("ZombieHelper");
  const zombiehelper = await ZombieHelper.deploy();
  await zombiehelper.deployed();

  console.log("zombiehelper deployed to:", zombiehelper.address);


  const ZombieAttack = await hre.ethers.getContractFactory("ZombieAttack");
  const zombieattack = await ZombieAttack.deploy();
  await zombieattack.deployed();

  console.log("zombieattack deployed to:", zombieattack.address);


  const ZombieOwnerShip = await hre.ethers.getContractFactory("ZombieOwnership");
  const zombieownership = await ZombieOwnerShip.deploy();
  await zombieownership.deployed();

  console.log("zombieownership deployed to:", zombieownership.address);

  const Ownable = await hre.ethers.getContractFactory("Ownable");
  const ownable = await Ownable.deploy();

  await ownable.deployed();

  console.log("ownable deployed to:", ownable.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
