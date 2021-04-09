pragma solidity ^0.5.0;

contract matchCreator {
    struct Match {
        address matchAddress;
        string team1;
        string team2;
        uint minimum;
        string date;
    }
    
    mapping (uint => Match)public matchsDetails;
    address public manager;
    uint public contracts;
    address createdMatch;
    
    modifier restricted() {
        assert (msg.sender == manager);
        _;
    }
    
    constructor () public {
        manager = msg.sender;
    }
    
    function createMatch(string memory _team1, string memory _team2, uint _minimum, string memory _date) public restricted {
        
        createdMatch = address(new App1(msg.sender, _team1, _team2, _minimum, _date));
        matchsDetails[contracts] = Match (createdMatch, _team1, _team2, _minimum, _date);
        contracts++;
    }
}


contract App1 {
    
    struct Gambler {
        uint contractsBalance;
        uint weiBalance;
        uint betTime;
        bool isGambler;
    }
    
    address public manager;
    uint public minimum;
    bool public betsOpen;
    string public nameTeam1;
    string public nameTeam2;
    string public date;
    
    mapping (address => Gambler) public team1;
    mapping (address => Gambler) public team2;
    mapping (address => Gambler) public matchEqual;
    
    uint public counterBetsTeam1 = 0;
    uint totalContractsTeam1;
    uint public counterBetsTeam2 = 0;
    uint totalContractsTeam2;
    uint public counterBetsEqual = 0;
    uint totalContractsEqual;
    
    uint public gamblersTeam1 = 0;
    uint public gamblersTeam2 = 0;
    uint public gamblersEqual = 0;
    
    uint public winner;
    uint public poolPrize;
    uint public profitsToTake;
    uint contracts;
   
    modifier bet() {
        require (betsOpen);
        require (msg.value >= minimum);
        contracts = msg.value / 10000000000000000;
        _;
    }
    modifier restricted() {
        assert (msg.sender == manager);
        _;
    }
    
    constructor(address _manager, string memory _team1, string memory _team2, uint _minimum, string memory _date) public {
        manager = _manager;
        minimum = _minimum;
        betsOpen = true;
        nameTeam1 = _team1;
        nameTeam2 = _team2;
        date = _date;
    }
    
    function betForTeam1() public payable bet {
        if (team1[msg.sender].isGambler == false) 
        {
            team1[msg.sender] = Gambler(contracts, msg.value, now, true);
            gamblersTeam1 ++;
            counterBetsTeam1 = counterBetsTeam1 + msg.value;
            totalContractsTeam1 = totalContractsTeam1 + contracts;
        }
        else 
        {
            team1[msg.sender].contractsBalance = team1[msg.sender].contractsBalance + contracts;
            team1[msg.sender].weiBalance = team1[msg.sender].weiBalance + msg.value;
            counterBetsTeam1 = counterBetsTeam1 + msg.value;
            totalContractsTeam1 = totalContractsTeam1 + contracts;
        }
        
    }
    
    function betForTeam2() public payable bet {
        if (team2[msg.sender].isGambler == false) 
        {
            team2[msg.sender] = Gambler(contracts, msg.value, now, true);
            gamblersTeam2 ++;
            counterBetsTeam2 = counterBetsTeam2 + msg.value;
            totalContractsTeam2 = totalContractsTeam2 + contracts;
        }
        else 
        {
            team2[msg.sender].contractsBalance = team2[msg.sender].contractsBalance + contracts;
            team2[msg.sender].weiBalance = team2[msg.sender].weiBalance + msg.value;
            counterBetsTeam2 = counterBetsTeam2 + msg.value;
            totalContractsTeam2 = totalContractsTeam2 + contracts;
        }
    } 
    
    function betForEqual() public payable bet {
        if (matchEqual[msg.sender].isGambler == false) 
        {
            matchEqual[msg.sender] = Gambler(contracts, msg.value, now, true);
            gamblersEqual ++;
            counterBetsEqual = counterBetsEqual + msg.value;
            totalContractsEqual = totalContractsEqual + contracts;
        }
        else 
        {
            matchEqual[msg.sender].contractsBalance = matchEqual[msg.sender].contractsBalance + contracts;
            matchEqual[msg.sender].weiBalance = matchEqual[msg.sender].weiBalance + msg.value;
            counterBetsEqual = counterBetsEqual + msg.value;
            totalContractsEqual = totalContractsEqual + contracts;
        }
        
    }
    
    function collectWins() public {
       if (winner == 1) 
        {
            require(team1[msg.sender].isGambler);
            
            uint profits = (poolPrize / totalContractsTeam1) * team1[msg.sender].contractsBalance;
            profitsToTake = profitsToTake - profits;
            team1[msg.sender].isGambler = false;
            
            msg.sender.transfer(profits + team1[msg.sender].weiBalance);
            
        }
        else if (winner == 2)
        {
            require(team2[msg.sender].isGambler);
            
            uint profits = (poolPrize / totalContractsTeam2) * team2[msg.sender].contractsBalance;
            profitsToTake= profitsToTake - profits;
            team2[msg.sender].isGambler = false;
            
            msg.sender.transfer(profits + team2[msg.sender].weiBalance);
            
        }
        else if (winner == 3)
        {
            require(matchEqual[msg.sender].isGambler);
            
            uint profits = (poolPrize / totalContractsEqual) * matchEqual[msg.sender].contractsBalance;
            profitsToTake = profitsToTake - profits;
            matchEqual[msg.sender].isGambler = false;
            
            msg.sender.transfer(profits + matchEqual[msg.sender].weiBalance);
            
        }
        else 
        {
            revert("no winner yet");
        }
        
    }
    
    function pickWinner(uint T ) public restricted{
        winner = T;
        if (winner == 1) {
            poolPrize = counterBetsEqual + counterBetsTeam2;
            profitsToTake = poolPrize;
        }
        else if (winner == 2) {
            poolPrize = counterBetsEqual + counterBetsTeam1;
            profitsToTake = poolPrize;
        }
        else if (winner == 3) {
            poolPrize = counterBetsTeam1 + counterBetsTeam2;
            profitsToTake = poolPrize;
        }
        else
        {
            revert ("choose 1, 2 or 3");
        }
    }
    
    function closeBets() public restricted{
        betsOpen = false;
    }
    
    function getStats() public view returns (uint, uint, uint, uint, uint, uint, uint, uint, uint, bool, string memory, uint)
    {
        return(
            counterBetsTeam1,
            counterBetsTeam2,
            counterBetsEqual,
            gamblersTeam1,
            gamblersTeam2,
            gamblersEqual,
            winner,
            poolPrize,
            profitsToTake,
            betsOpen,
            date,
            minimum
        );
    }

    
}