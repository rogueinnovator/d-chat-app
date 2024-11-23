"use client";
import React, { useState } from "react";
import Image from "next/image";
import Style from "./Filter.module.css";
import images from "../../../assets";
import { useAppContext } from "@/Context/ChatAppContext";
import { Model } from "../index.ts";

const Filter: React.FC = () => {
  const context = useAppContext();
  if (!context) {
    return <div>no context</div>;
  }
  const [addFriends, setAddFriends] = useState<boolean>(false);
  const { addFriend } = context;
  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20} />
            <input type="text" placeholder="search.." />
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear} alt="clear" width={20} height={20} />
            CLEAR CHAT
          </button>
          <button
            onClick={() => {
              setAddFriends(true);
            }}
          >
            <Image src={images.user} alt="clear" width={20} height={20} />
            ADD FRIEND
          </button>
        </div>
      </div>
      {/* MODEL COMPONENT */}
      {addFriends && (
        <div className={Style.Filter_model}>
          <Model
            openBox={setAddFriends}
            title="Welcome To"
            head="Chat Buddy"
            info="this is the info section"
            smallInfo="Kindly select your friend's name and address"
            image={images.hero}
            functionName={addFriend}
          />
        </div>
      )}
    </div>
  );
};

export default Filter;
