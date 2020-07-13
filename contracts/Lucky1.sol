pragma solidity ^0.4.22;

import "./Owned.sol";
import "./Random.sol";
import "./Layerprofit.sol";

contract Lucky1 is Owned, Random, layerprofit {

    address[] public players;
    uint public pooln_lucky1 = 0;
    
    uint public winner_id;
    uint public loser;
    uint public common1;
    uint public common2;
    uint public common3;
    uint public common4;
    uint public initialBalance;

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
    function participate_lucky1() public payable returns (uint, uint, uint, uint, uint, uint, address[], address, uint){
        (winner_id, loser, common1, common2, common3, common4) = randomNewLucky();


        initialBalance = players[winner_id].balance;
        allocateProfit(address(this).balance, players[winner_id]);
        uint profit = players[winner_id].balance - initialBalance;

        return (winner_id, loser, common1, common2, common3, common4,
        players,
        players[winner_id], profit );
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
