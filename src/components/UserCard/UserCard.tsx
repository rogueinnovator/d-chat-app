"use client";
import React from "react";
import images from "../../../assets";
import Image from "next/image";
import Style from "./UserCard.module.css";
interface UserCardProps {
  el: {
    name: string;
    accountAddress: string;
  };
  i: number;
  addFriend: (name: string, accountAddress: string) => void;
}
const UserCard: React.FC<UserCardProps> = ({ el, i, addFriend }) => {
  return (
    <div className={Style.UserCard}>
      <div className={Style.UserCard_box}>
        <Image
          className={Style.UserCard_box_img}
          src={images[`image${i + 1}`]}
          alt="friend"
          width={100}
          height={100}
        />
        <div className={Style.UserCard_box_info}>
          <h3>{el.name}</h3>
          <p>{el.accountAddress.slice(0, 25)}...</p>
          <button onClick={() => addFriend(el.name, el.accountAddress)}>
            Add friend
          </button>
        </div>
      </div>
      <small className={Style.number}>{i + 1}</small>
    </div>
  );
};

export default UserCard;
