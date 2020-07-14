pragma solidity ^0.4.22;

contract layerprofit {
    function allocateProfit(uint balance,address player) internal returns (uint){
        uint maxAmountAllowedInTheBank =  200000000000000000;  /* 0.2 ether */
        uint amount = balance - maxAmountAllowedInTheBank;
        if (amount > 0) player.transfer(amount);
    }
}