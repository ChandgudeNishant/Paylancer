//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BiddingContract {
    struct Project {
        uint256 projectId;
        address payable user;
        string ideaDetails;
        uint256 maxAmount;
        uint256 minBid;
        address payable freelancer;
        uint256 biddingEndTime;
    }

    mapping(uint256 => Project) public projects;
    Project[]project1;
    mapping(uint256 => mapping(address => uint256)) public projectBids;
    mapping(uint256 => address[]) public projectBidders;

    event ProjectPosted(uint256 projectId, address payable indexed user, string ideaDetails, uint256 maxAmount);
    event BidPlaced(uint256 projectId, address payable indexed freelancer, uint256 bidAmount);
    event ProjectAssigned(uint256 projectId, address payable indexed freelancer, uint256 bidAmount);

    function postProject(uint256 projectId, string memory ideaDetails, uint256 maxAmount) public {
        require(projects[projectId].projectId == 0, "Project already exists");
        uint256 biddingEndTime = block.timestamp + 300; // Set the bidding end time
       project1.push(projects[projectId] = Project(projectId, payable(msg.sender), ideaDetails, maxAmount, 0, payable(address(0)), biddingEndTime));
        emit ProjectPosted(projectId, payable(msg.sender), ideaDetails, maxAmount);
    }

    function placeBid(uint256 projectId) public payable {
        Project storage project = projects[projectId];
        
        require(project.projectId != 0, "Project does not exist");
        require(project.freelancer == address(0), "Project already assigned");
        require(block.timestamp <= project.biddingEndTime, "Bidding period has ended");
        require(project.user != msg.sender, "User cannot bid on their own project");
        require(msg.value > 0, "Bid amount must be greater than zero");
        // require(msg.value < project.maxAmount,"The Bid amount should be less than Max Amount");

        uint256 existingBid = projectBids[projectId][msg.sender];
        require(existingBid == 0 || msg.value < existingBid, "Bid amount not lower than minimum");

        projectBids[projectId][msg.sender] = msg.value;
        projectBidders[projectId].push(msg.sender); // Store the bidder address

        emit BidPlaced(projectId, payable(msg.sender), msg.value);
    }


// function assignProject(uint256 projectId) public payable {
//     Project storage project = projects[projectId];

//     require(project.freelancer == address(0), "Project already assigned");
//     require(block.timestamp > project.biddingEndTime, "Bidding period has not ended");

//     uint256 minBid = project.maxAmount; // Initialize with the maximum amount
//     address payable minBidder;

//     // Find the minimum bid and bidder
//     address[] storage bidders = projectBidders[projectId];
//     require(minBidder != address(0), "No valid bids");
    
//     for (uint256 i = 0; i < bidders.length; i++) {
//         address bidder = bidders[i];
//         uint256 bidAmount = projectBids[projectId][bidder];
//         if (bidAmount < minBid) {
//             minBid = bidAmount;
//             minBidder = payable(bidder);
//         }
//         delete projectBids[projectId][bidder]; // Delete the bid for each bidder
//     }


//     project.freelancer = minBidder;
//     minBidder.transfer(project.maxAmount); // Transfer the funds to the freelancer

//     emit ProjectAssigned(projectId, minBidder, minBid);
 
//     // Clean up project data for the next project
//     delete projectBidders[projectId];
//     delete projects[projectId].projectId;
// }


function assignProject(uint256 projectId) public payable {
    Project storage project = projects[projectId];

    require(project.freelancer == address(0), "Project already assigned");
    require(block.timestamp > project.biddingEndTime, "Bidding period has not ended");

    uint256 minBid = type(uint256).max; // Initialize with a large value
    address payable minBidder;

    // Find the minimum bid and bidder
    address[] storage bidders = projectBidders[projectId];
    for (uint256 i = 0; i < bidders.length; i++) {
        address bidder = bidders[i];
        uint256 bidAmount = projectBids[projectId][bidder];
        if (bidAmount < minBid) {
            minBid = bidAmount;
            minBidder = payable(bidder);
        }
        delete projectBids[projectId][bidder]; // Delete the bid for each bidder
    }

    require(minBidder != address(0), "No valid bids");

    project.freelancer = minBidder;
    project.minBid = minBid;
    minBidder.transfer(project.maxAmount); // Transfer the funds to the freelancer

    emit ProjectAssigned(projectId, minBidder, minBid);

    // Clean up project data for the next project

}
    function getProjectInfo(uint256 _projectId) public view returns (uint256, address ,string memory, uint256, uint256, address, uint256) {
        require(projects[_projectId].projectId != 0, "Invalid token ID");
        return (projects[_projectId].projectId, projects[_projectId].user, projects[_projectId].ideaDetails, projects[_projectId].maxAmount, projects[_projectId].minBid, projects[_projectId].freelancer, projects[_projectId].biddingEndTime);
    }



    function getDetails() public view returns(Project[] memory){
            return project1;
    }
function getBidders(uint256 projectId) public view returns (address[] memory, uint256[] memory) {
    Project storage project = projects[projectId];
    require(project.projectId != 0, "Invalid project ID");

    address[] memory bidders = projectBidders[projectId];
    uint256[] memory bids = new uint256[](bidders.length);

    for (uint256 i = 0; i < bidders.length; i++) {
        address bidder = bidders[i];
        bids[i] = projectBids[projectId][bidder];
    }

    return (bidders, bids);
}


}
