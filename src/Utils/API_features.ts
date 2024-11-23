import Web3 from "web3";
import Web3Modal from "web3modal";
import { ChatAppAddress, ChatAppABI } from "@/Context/constants";
export const CheckWalletConnection = async (): Promise<string | null> => {
  // this one is used  to check if its connected or not on the first load of the app also it dosent need any permission
  try {
    if (!window.ethereum) {
      console.log("MetaMask is not installed");
      return null;
    }

    const accounts: string[] = await window.ethereum.request({
      methods: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
    return null;
  }
};
//This checks wallet connection..
export const connectWallet = async (): Promise<string | null> => {
  // this is to get the user account
  try {
    if (!window.ethereum) {
      console.log("MetaMask is not installed");
      return null;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
    return null;
  }
};
//This will create contract  using the web3 instance
export const fetchContract = (web3: Web3) => {
  return new web3.eth.Contract(ChatAppABI, ChatAppAddress);
};
//This is used to connect to the wallet(provider) and then using those credentials create web3 provider
export const connectingWithContract = async () => {
  try {
    //wallet selection
    const web3modal = new Web3Modal();
    //prompt for connection with wallet
    const provider = await web3modal.connect();
    //create a web3 instance with the connected provider
    const web3 = new Web3(provider);
    const contract = fetchContract(web3);
    return contract;
  } catch (error) {
    console.error("Error connecting with contract", error);
  }
};
//This function is used to convert the time to usable formate which is retrieved from the blockchain
export const convertTime = (time: bigint) => {
  const newTime = new Date(Number(time));

  const realTime =
    `${newTime.getHours()}:${newTime.getMinutes()}:${newTime.getSeconds()} ` +
    `Date: ${
      newTime.getMonth() + 1
    }/${newTime.getDate()}/${newTime.getFullYear()}`;

  return realTime;
};
