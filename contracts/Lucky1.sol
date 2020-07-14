pragma solidity ^0.4.22;

import "./Owned.sol";
import "./Random.sol";
import "./Layerprofit.sol";

contract Lucky1 is Owned, Random, layerprofit {
    struct Bet {
        address player;
        uint8 betType;
        uint8 number;
    }
    mapping(address => Bet) public bets;

    uint256 nextRoundTimestamp;

    address[] public players;
    // mapping (address => uint256) winnings;
    uint256 public pooln_lucky1 = 0;

    uint256 public winner_id;
    uint256 public loser;
    uint256 public common1;
    uint256 public common2;
    uint256 public common3;
    uint256 public common4;
    uint256 public initialBalance;

    struct resultInfo_L1 {
        uint256 winner;
        uint256 loser;
        uint256 common1;
        uint256 common2;
        uint256 common3;
        uint256 common4;
        address[] players;
    }
    mapping(uint256 => resultInfo_L1) public resultMap_L1;

    constructor() public payable {
        nextRoundTimestamp = now;
    }

    function participate_lucky1()
        public
        payable
        returns (
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            uint256,
            address[],
            address,
            uint256,
            uint256,
            uint256,
            address
        )
    {
        (
            winner_id,
            loser,
            common1,
            common2,
            common3,
            common4
        ) = randomNewLucky();

        initialBalance = players[winner_id].balance;
        uint256 address_balance = address(this).balance;
        allocateProfit(address(this).balance, players[winner_id]);
        uint256 profit = players[winner_id].balance - initialBalance;
        address addr = players[winner_id];
        //winnings[players[winner_id]] = profit;

        return (
            winner_id,
            loser,
            common1,
            common2,
            common3,
            common4,
            players,
            players[winner_id],
            profit,
            address_balance,
            bets[addr].number,
            bets[addr].player
        );
    }


    function participate(uint8 number) public payable {
        require(msg.value >= .01 ether);
        players.push(msg.sender);

        bets[msg.sender].player = msg.sender;
        bets[msg.sender].betType = 1;
        bets[msg.sender].number = number;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(block.difficulty, block.timestamp, players)
                )
            );
    }

    function pickWinner() public onlyOwner {
        require(players.length > 0);

        uint256 index = random() % players.length;
        players[index].transfer(address(this).balance);

        players = new address[](0);
    }

    function getPlayers() public view returns (address[]) {
        return players;
    }
}
