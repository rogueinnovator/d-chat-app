"use client";
import React from "react";
import Style from "./Card.module.css";
import Link from "next/link";
import images from "../../../assets";
import Image from "next/image";
interface CardProps {
  readMessage: (friendAddress: string) => Promise<void>;
  el: {
    name: string;
    publicKey: string;
  } | null;
  i: number | null;
  userInfo: (userAddress: string) => Promise<void>;
}

const Card: React.FC<CardProps> = ({ readMessage, el, i, userInfo }) => {
  if (!el) {
    return null;
  }
  return (
    <Link
      href={{
        pathname: "/",
        query: { name: el.name, address: el.publicKey },
      }}
    >
      <div
        className={Style.Card}
        onClick={() => (readMessage(el?.publicKey), userInfo(el?.publicKey))}
      >
        <div className={Style.Card_box}>
          <div className={Style.Card_box_left}>
            <Image
              src={images.accountName}
              alt="userName"
              width={50}
              height={50}
              className={Style.Card_box_left_img}
            />
          </div>
          <div className={Style.Card_box_right}>
            <div className={Style.Card_box_right_middle}>
              <h4 className="text-orange-600">{el.name.toUpperCase()}</h4>
              <small>{el.publicKey.slice(21)}.. </small>
            </div>
          </div>
          <div className={Style.Card_box_right_end}>
            <small className="inline-flex items-center justify-center w-8 h-8 text-white bg-orange-500 rounded-full">
              {i + 1}
            </small>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
