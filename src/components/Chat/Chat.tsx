"use client";
import React, { useEffect, useState } from "react";
import Style from "./Chat.module.css";
import images from "../../../assets";
import { convertTime } from "@/Utils/API_features";
import { Loader } from "../index";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
interface chatData {
  name: string;
  address: string;
}
interface chatAppProps {
  functionName: (message: string, address: string) => Promise<void>;
  readMessage: (friendAddress: string) => Promise<void>;
  userInfo: (friendAddress: string) => Promise<void>;
  friendMsgs: Array<string>;
  account: string;
  userName: string;
  loading: boolean;
  currentUserName: string;
  currentUserAddress: string;
}
const Chat: React.FC<chatAppProps> = ({
  functionName,
  readMessage,
  friendMsgs,
  userName,
  userInfo,
  loading,
  currentUserAddress,
  currentUserName,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [chatData, setChatData] = useState<chatData>({
    name: "",
    address: "",
  });
  const searchParams = useSearchParams();
  useEffect(() => {
    const name = searchParams.get("name");
    const address = searchParams.get("address");
    if (name && address) {
      setChatData({ name, address });
      readMessage(address);
      userInfo(address);
    }
  }, [searchParams]);

  return (
    <div className={Style.Chat}>
      {currentUserName && currentUserAddress ? (
        <div className={Style.Chat_user_info}>
          <Image
            src={images.accountName}
            alt="account"
            width={70}
            height={70}
          />
          <div className={Style.Chat_user_info_box}>
            <h4 className="text-orange-600 pb-2">
              {currentUserName.toUpperCase()}
            </h4>
            <p className={Style.show}>{currentUserAddress.slice(25)}...</p>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={Style.Chat_box_box}>
        <div className={Style.Chat_box}>
          <div className={Style.Chat_box_left}>
            {friendMsgs?.map((el, i) => (
              <div key={i + 1}>
                {" "}
                {el.sender == chatData.address ? (
                  <>
                    <div className={Style.Chat_box_left_title}>
                      <Image
                        src={images.accountName}
                        alt="accountname"
                        width={50}
                        height={50}
                      />
                      <span>
                        {chatData.name} {""}
                      </span>
                      <small>Time:{convertTime(el.timestamp)} </small>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={Style.Chat_box_left_title}>
                      <Image
                        src={images.accountName}
                        alt="accountname"
                        width={50}
                        height={50}
                      />
                      <span>
                        {userName.toUpperCase()} {""}
                      </span>
                      <small> Time:{convertTime(el.timestamp)} </small>
                    </div>
                  </>
                )}
                <p key={i + 1}>
                  {el.msg}
                  {""}
                  {""}
                </p>
              </div>
            ))}
          </div>
        </div>
        {currentUserAddress && currentUserName ? (
          <div className={Style.Chat_box_send}>
            <div className={Style.Chat_box_send_img}>
              <Image
                className="cursor-pointer w-full"
                src={images.smile}
                alt="smile"
                width={50}
                height={500}
              />
            </div>
            <input
              type="text"
              placeholder="Type message"
              onChange={(e) => setMessage(e.target.value)}
            />
            <Image
              className="cursor-pointer"
              src={images.file}
              alt="file"
              width={50}
              height={50}
            />
            {loading == true ? (
              <Loader />
            ) : (
              <Image
                src={images.send}
                alt="send"
                width={50}
                height={50}
                onClick={() => functionName(message, chatData.address)}
                className="cursor-pointer"
              />
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Chat;
