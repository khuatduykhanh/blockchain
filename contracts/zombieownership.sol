// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./zombieattack.sol";
import "./erc721.sol";
import "./safemath.sol";

contract ZombieOwnership is ZombieAttack, erc721 {
  uint totalSupply = 1000000000;
  constructor() {
    ownerZombieCount[msg.sender] = totalSupply;
  }
  using SafeMath for uint256;

  mapping (uint=>address) zombieApprovals;

  function balanceOf(address _owner) external override view returns (uint256) {
    return  ownerZombieCount[_owner];
  }

  function ownerOf(uint256 _tokenId) external override view returns (address) {
    return zombieToOwner[_tokenId];
  }

  function _transfer(address _from, address _to, uint256 _tokenId) private {
    ownerZombieCount[_to].add(1);
    ownerZombieCount[_from].sub(1);
    zombieToOwner[_tokenId] = _to;
    emit Transfer(_from, _to, _tokenId);
  }

  function transferFrom(address _from, address _to, uint256 _tokenId) external override payable {
    require ( zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender);
    _transfer(_from, _to, _tokenId);
  }

  function approve(address _approved, uint256 _tokenId) external override payable  onlyOwnerOf(_tokenId) {
      zombieApprovals[_tokenId] = _approved;
      emit Approval(msg.sender,_approved,_tokenId);
  }
}
