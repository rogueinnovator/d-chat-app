"use client";
import React from "react";
import { useState } from "react";
import Style from "./allUsers.module.css";
import { Error, UserCard } from "../../components/index";
import { useAppContext } from "@/Context/ChatAppContext";
const page: React.FC = () =>
  //this is used
  {
    const { userList, addFriend, error } = useAppContext();
    return (
      <div>
        <div className={Style.allUsers_info}>
          <h1>Find Your Friends</h1>
        </div>
        {userList && userList.length > 0 ? (
          <div className={Style.allUsers}>
            {userList.map(
              (el: { name: string; accountAddress: string }, i: number) => (
                <UserCard key={i + 1} el={el} i={i} addFriend={addFriend} />
              )
            )}
            {error ? <Error error={error} /> : null}
          </div>
        ) : (
          <p className={Style.allUsers_info}> no users</p>
        )}
      </div>
    );
  };

export default page;
