pragma solidity ^0.8.0;

import "./IAnonAadharVerifier.sol";
contract Ballot {
    // Ballot structure
    struct Ballot {
        string ballotImage;
        uint256 startTime;
        uint256 endTime;
        bool entryRestriction;
        mapping(string => Party) parties;
    }
    Ballot public ballot;
address public anonAadhaarVerifierAddr;
    // Party structure
    struct Party {
        string candidateName;
        uint256 noOfVotes;
        string partyLogo;
    }
 constructor(
       
        address _verifierAddr
    ) {
        anonAadhaarVerifierAddr = _verifierAddr;
       
    }
    // Mapping to store ballots
    mapping(string => Ballot) public ballots;

    function verify(
        uint256[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals
    ) public view returns (bool) {
        return
            IAnonAadhaarVerifier(anonAadhaarVerifierAddr).verifyProof(
                _pA,
                _pB,
                _pC,
                _pubSignals
            );
    }
    // Function to create a ballot
    function createBallot(
        string memory _ballotName,
        string memory _ballotImage,
        uint256 _startTime,
        uint256 _endTime,
        bool  _entryRestriction, 
        string memory _candidateName,
        string memory _partyLogo,
        string memory _partyName
    ) public {
        require(ballots[_ballotName].startTime == 0, "Ballot with this name already exists");
        require(_startTime < _endTime, "Start time must be before end time");
        require(_entryRestriction!=false, "Age less than 18");
        Party memory party = Party({
candidateName : _candidateName,
noOfVotes : 0,
partyLogo: _partyLogo
        });

        ballot.parties[_partyName] = party;
       ballot.ballotImage= _ballotImage;
        ballot.startTime= _startTime;
        ballot.endTime = _endTime;
        ballot.entryRestriction = _entryRestriction;

    }

    // Function to add a party to a ballot
    function addParty(
        string memory ballotName,
        string memory partyName,
        string memory candidateName,
        string memory _partyLogo
    ) public {
        require(ballots[ballotName].startTime == 0, "Ballot must not be started");

        // Create a new party
        ballots[ballotName].parties[partyName] = Party({
            candidateName: candidateName,
            noOfVotes: 0,
            partyLogo: _partyLogo
        });
    }

    // Function to vote for a party
    function voteForParty(string memory _ballotName, string memory _partyName,  uint256[2] calldata _pA,
        uint[2][2] calldata _pB,
        uint[2] calldata _pC,
        uint[34] calldata _pubSignals) public {
        require(block.timestamp >= ballots[_ballotName].startTime && block.timestamp <= ballots[_ballotName].endTime, "Ballot is not open for voting");
 require(
            verify(_pA, _pB, _pC, _pubSignals),
            "Your idendity proof is not valid"
        );

        // Check if party exists
        require(keccak256(abi.encodePacked(ballots[_ballotName].parties[_partyName].candidateName )) != keccak256(abi.encodePacked("")), "Party does not exist");

        ballots[_ballotName].parties[_partyName].noOfVotes++;
    }

      
}
