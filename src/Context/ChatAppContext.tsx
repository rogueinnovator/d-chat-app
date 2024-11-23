"use client";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useState,
  createContext,
  ReactNode,
  useContext,
} from "react";
import { connectingWithContract, connectWallet } from "@/Utils/API_features";
import { access } from "fs/promises";
import { log } from "console";
interface Friend {
  name: string;
  address: string;
}
//interface in TS is a way to define the structure of an Object in this case it is title
interface ChatAppContextType {
  account: string | null;
  userName: string | null;
  friendList: Friend[] | null;
  connectWallet: any | null;
  userList: Array<string> | null;
  friendMsgs: Array<string> | null;
  loading: boolean | null;
  error: string | null;
  readMessage: (friendAddress: string) => Promise<void>;
  createUser: (name: string, accountAddress: string) => Promise<void>;
  addFriend: (name: string, accountAddress: string) => Promise<void>;
  sendMessage: (message: string, address: string) => Promise<void>;
  userInfo: (userAddress: string) => Promise<void>;
  currentUserName: string | null;
  currentUserAddress: string | null;
}
interface ChatAppProviderProps {
  children: ReactNode;
}
//ChatApp context with default value
const ChatAppContext = createContext<ChatAppContextType | null>(null);
//Chat app provider component
export const ChatAppProvider = ({ children }: ChatAppProviderProps) => {
  const [account, setAccount] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [friendList, setFriendList] = useState<Friend[] | null>(null);
  const [friendMsgs, setFriendMsgs] = useState<Array<string> | null>(null);
  const [userList, setUserList] = useState<Array<string> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState<string | null>();
  const [currentUserAddress, setCurrentUserAddress] = useState<string | null>();
  const router = useRouter();

  //This will fetchAll the data at the time of page reload
  const fetchData = async (): Promise<void> => {
    try {
      //This returns the contract instance:
      const contract = await connectingWithContract();
      //GET account
      const accountAddress = await connectWallet();
      setAccount(accountAddress);
      // //optional chaining is used to check if the contract is null or undefined .. if so the variable is assigned to undefined without further processing
      const theUserName = await contract?.methods
        .getUserName(accountAddress)
        .call();
      setUserName(theUserName);
      const theFriendList = await contract?.methods
        .getMyFriendList()
        .call({ from: accountAddress });
      setFriendList(theFriendList);
      const allUsers = await contract?.methods.getAllAppUsers().call();
      setUserList(allUsers);
    } catch (error) {
      // setError("Error while fetching the data");
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  //READ MESSAGE
  const readMessage = async (friendAddress: string): Promise<void> => {
    try {
      const contract = await connectingWithContract();
      const message = await contract?.methods
        .readMessage(friendAddress)
        .call({ from: account });
      setFriendMsgs(message);
    } catch (error) {
      console.error("Error  reading message", error);
      setError("U have no messages yet");
    }
  };
  //ADD FRIEND
  const addFriend = async (
    name: string,
    accountAddress: string
  ): Promise<void> => {
    try {
      const contract = await connectingWithContract();
      const addMyFriend = await contract?.methods
        .addFriend(accountAddress, name)
        .send({ from: account });
      if (!addMyFriend) {
        setLoading(true);
      }
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      let errorMessage = "An error occured while adding the friend";
      if (error?.message) {
        const errorMatch = error.message.match(/"reason":"(.*?)"/);

        if (errorMatch) {
          errorMessage = errorMatch[1];
        }
      }
      setError(errorMessage);
      console.error("Error while adding friend", error);
    }
  };
  //CREATE ACCOUNT
  const createUser = async (
    name: string,
    accountAddress: string
  ): Promise<void> => {
    try {
      const contract = await connectingWithContract();
      const createdUser = contract?.methods.createUser(name);
      setLoading(true);
      await createdUser?.send({ from: accountAddress }); //.send is used to initiate a transaction
      setLoading(false);
      window.location.reload();
    } catch (error) {
      console.error("error creating user", error);
      setLoading(false);
      setError("Error creating User");
    }
  };
  //READ INFO
  const userInfo = async (userAddress: string): Promise<void> => {
    try {
      const contract = await connectingWithContract();
      console.log(userAddress);

      const userName = await contract?.methods.getUserName(userAddress).call();
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (error) {
      console.error(error);
      setError("Error while getting user info");
    }
  };
  //Send message
  const sendMessage = async (msg: string, address: string): Promise<void> => {
    try {
      const contract = await connectingWithContract();
      const addMessage = contract?.methods.sendMessage(address, msg);
      setLoading(true);
      console.log("this is ");
      await addMessage?.send({ from: account });
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error While sending message");
      console.error("Error while sending message", error);
    }
  };

  return (
    <ChatAppContext.Provider
      value={{
        account,
        readMessage,
        createUser,
        userInfo,
        userName,
        friendList,
        friendMsgs,
        loading,
        userList,
        error,
        sendMessage,
        currentUserAddress,
        currentUserName,
        connectWallet,
        addFriend,
      }}
    >
      {children}
    </ChatAppContext.Provider>
  );
};
export const useAppContext = () => {
  return useContext(ChatAppContext);
};
