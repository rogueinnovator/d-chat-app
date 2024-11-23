"use client";
import React from "react";
import { Chat, Card } from "../index.ts";
import images from "../../../assets";
import Style from "./Friend.module.css";
import { useAppContext } from "@/Context/ChatAppContext";
const Friend: React.FC = () => {
  const {
    sendMessage,
    account,
    friendList,
    readMessage,
    userName,
    loading,
    currentUserName,
    currentUserAddress,
    userInfo,
    friendMsgs,
  } = useAppContext() || {};
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {friendList?.map((el, i) => (
            <Card
              key={i + 1}
              i={i}
              el={el}
              readMessage={readMessage}
              userInfo={userInfo}
            />
          ))}
        </div>
        <div className={Style.Friend_box_right}>
          <Chat
            functionName={sendMessage}
            readMessage={readMessage}
            friendMsgs={friendMsgs}
            userInfo={userInfo}
            account={account}
            userName={userName}
            loading={loading}
            currentUserName={currentUserName}
            currentUserAddress={currentUserAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default Friend;
