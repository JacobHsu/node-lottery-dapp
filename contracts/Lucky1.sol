pragma solidity ^0.4.22;

import "./Owned.sol";
import "./Random.sol";

contract Lucky1 is Owned, Random {

    address[] public players;
    uint public pooln_lucky1 = 0;

    struct resultInfo_L1{
        uint winner;
        uint loser;
        uint common1;
        uint common2;
        uint common3;
        uint common4;
        address[] players;
    }
    mapping(uint => resultInfo_L1) public resultMap_L1;
    function participate_lucky1() public payable returns (uint, uint, uint, uint, uint, uint, address[]){
        (resultMap_L1[pooln_lucky1].winner,
        resultMap_L1[pooln_lucky1].loser,
        resultMap_L1[pooln_lucky1].common1,
        resultMap_L1[pooln_lucky1].common2,
        resultMap_L1[pooln_lucky1].common3,
        resultMap_L1[pooln_lucky1].common4) = randomNewLucky();

        return (resultMap_L1[pooln_lucky1].winner,
        resultMap_L1[pooln_lucky1].loser,
        resultMap_L1[pooln_lucky1].common1,
        resultMap_L1[pooln_lucky1].common2,
        resultMap_L1[pooln_lucky1].common3,
        resultMap_L1[pooln_lucky1].common4,
        players);
    }

    function participate() public payable {
        require(msg.value >= .01 ether);
        players.push(msg.sender);
    }

    function random() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public onlyOwner {
        require(players.length > 0);

        uint index = random() % players.length;
        players[index].transfer(address(this).balance);

        players = new address[](0);
    }

    function getPlayers() public view returns(address[]) {
        return players;
    }

}
