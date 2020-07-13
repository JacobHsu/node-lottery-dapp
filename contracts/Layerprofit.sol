pragma solidity ^0.4.22;

contract layerprofit {
    function allocateProfit(uint balance,address player) internal returns (uint){
        player.transfer(balance);
    }
}