// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;
contract ChatApp {
    struct user {
        string name;
        friend[] friendList;
    }
    struct friend {
        address publicKey;
        string name;
    }
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }
    struct AllUserStruct {
        string name;
        address accountAddress;
    }
    AllUserStruct[] getAllUsers;
    mapping(address => user) userList;
    mapping(bytes32 => message[]) allMessages; //this mapping is gonna track all the messages
    //CHECK EXISTING USER
    function checkUserExists(address publicKey) public view returns (bool) {
        return bytes(userList[publicKey].name).length > 0; //bytes is a dynamic which is used for handling variable length data
    }
    //CREATE NEW USER
    function createUser(string calldata name) external {
        //here the calldata saves the gas by specifying that the name is read only so it can't be moved to the memory
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "User name can't be empty");
        userList[msg.sender].name = name;
        getAllUsers.push(AllUserStruct(name, msg.sender));
    }
    //GET USER NAME
    function getUserName(
        address publicKey
    ) external view returns (string memory) {
        require(checkUserExists(publicKey), "User not exist");
        return userList[publicKey].name; // this will return the name of the user in the mapping with the specifies address
    }
    //ADD FRIEND
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create Account first");
        require(checkUserExists(friend_key), "User not Exist");
        require(msg.sender != friend_key, "User can't add himself as a friend");
        require(
            checkAlreadyFriends(msg.sender, friend_key) == false,
            "They are already friends"
        );
        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }
    function checkAlreadyFriends(
        address publicKey1,
        address publicKey2
    ) internal view returns (bool) {
        if (
            userList[publicKey1].friendList.length >
            userList[publicKey2].friendList.length
        ) {
            address temp = publicKey1;
            publicKey1 = publicKey2;
            publicKey2 = temp;
        }
        for (uint256 i = 0; i < userList[publicKey1].friendList.length; i++) {
            if (userList[publicKey1].friendList[i].publicKey == publicKey2)
                return true;
        }
        return false;
    }
    function _addFriend(
        address me,
        address friend_key,
        string memory name
    ) internal {
        friend memory newFriend = friend(friend_key, name);
        userList[me].friendList.push(newFriend);
    }
    //GET my friends
    function getMyFriendList() external view returns (friend[] memory) {
        return userList[msg.sender].friendList;
    }
    //GET chat code
    function _getChatCode(
        // the internal function can only be called by the same contract function or the contracts which are derived from it
        //the pure function just take the argument and return the value without reading or modifying  the  blockchain state
        address publicKey1,
        address publicKey2
    ) internal pure returns (bytes32) {
        if (publicKey1 < publicKey2) {
            //here the if logic is to concate the same values in the keccak256 function to produce same hashing in each case (weather in which order the values is passed) actually this hashing function is sensitive to order
            return keccak256((abi.encodePacked(publicKey1, publicKey2)));
        } else {
            return keccak256((abi.encodePacked(publicKey2, publicKey1)));
        }
    }
    //SEND message
    function sendMessage(address friend_Key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "create an account first");
        require(checkUserExists(friend_Key), "user is not reqistered");
        require(
            checkAlreadyFriends(msg.sender, friend_Key),
            "you are not friend with this user"
        );
        bytes32 chatCode = _getChatCode(msg.sender, friend_Key);
        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }
    //READ message
    function readMessage(
        address friend_Key
    ) external view returns (message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_Key);
        return allMessages[chatCode];
    }
    //GET ALL USERS
    function getAllAppUsers() public view returns (AllUserStruct[] memory) {
        return getAllUsers;
    }
}
