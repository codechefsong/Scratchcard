//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract YourContract {

    // State Variables
    address public immutable owner;
    uint public imageTotal = 0;
    string[] public images;
    uint public numberOfPlays = 0;
    mapping(address => uint) public cooldown;
    mapping (uint => PlayerCard) cardlist;
    uint immutable COOLDOWN_TIME = 3;

    event CardResult(address player, string[] imageURLs, bool isMatch);

    // Constructor: Called once on contract deployment
    // Check packages/hardhat/deploy/00_deploy_your_contract.ts
    constructor(address _owner) {
        owner = _owner;
    }

    // Modifier: used to define a set of rules that must be met before or after a function is executed
    // Check the withdraw() function
    modifier isOwner() {
        // msg.sender: predefined variable that represents address of the account that called the current function
        require(msg.sender == owner, "Not the Owner");
        _;
    }

    struct PlayerCard {
        uint id;
        mapping(string => uint) sameImageCount;
    }

    function addImage(string memory _imageURL) external payable {
        images.push(_imageURL);
        imageTotal++;
    }

    function playGame() external{
        require(cooldown[msg.sender] < block.timestamp, "Try again later");
        cooldown[msg.sender] = block.timestamp + COOLDOWN_TIME;

        string[] memory imageURLs = fillScratchCard();
        numberOfPlays += 1;

        bool isWinner = checkForMatching(imageURLs);

        emit CardResult(msg.sender, imageURLs, isWinner);
    }

    function fillScratchCard() internal view returns (string[] memory) {
        string[] memory imageURLs = new string[](9);

        for(uint i = 0; i < 9; i++){
            uint _randomNumber = uint(keccak256(abi.encode(block.timestamp, block.difficulty, msg.sender, i))) % imageTotal;
            imageURLs[i] = images[_randomNumber];
        }

        return imageURLs;
    }

    function checkForMatching(string[] memory imageURLs) internal returns (bool) {
        PlayerCard storage currentCard = cardlist[numberOfPlays];
        currentCard.id = numberOfPlays;

        for(uint i = 0; i < 9; i++){
            currentCard.sameImageCount[imageURLs[i]] += 1;
            if(currentCard.sameImageCount[imageURLs[i]] == 3) return true;
        }

        return false;
    }

    function getPrizePool() external view returns (uint) {
        return address(this).balance;
    }

    function getAdvertisement() external view returns (string[] memory) {
        return images;
    }

    /**
     * Function that allows the owner to withdraw all the Ether in the contract
     * The function can only be called by the owner of the contract as defined by the isOwner modifier
     */
    function withdraw() isOwner public {
        (bool success,) = owner.call{value: address(this).balance}("");
        require(success, "Failed to send Ether");
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
