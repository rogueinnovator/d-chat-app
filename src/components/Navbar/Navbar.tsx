"use client";
import { useAppContext } from "@/Context/ChatAppContext";
import React, { useState } from "react";
import Image from "next/image";
import images from "../../../assets";
import Style from "./Navbar.module.css";
import Link from "next/link";
import { connectWallet } from "@/Utils/API_features";
import { Model, Error } from "../index";

const Navbar = () => {
  const menuItems = [
    {
      menu: "All Users",
      link: "/allUsers",
    },
    {
      menu: "CHAT",
      link: "/friends",
    },
    {
      menu: "TERMS ",
      link: "/terms",
    },

    {
      menu: "Settings",
      link: "/",
    },
  ];
  //USE STATE
  const [active, setActive] = useState<number | null>(2);
  const [open, setOpen] = useState<boolean | null>(false);
  const [openModel, setOpenModel] = useState<boolean | null>(false);
  const { account, userName, createUser, error } = useAppContext() || {}; //this is known as optional chaining in this if the value of the account is null it is automatically assigned the value of undefined
  return (
    <div className={Style.NavBar}>
      <div className={Style.NavBar_box}>
        <div className={Style.NavBar_box_left}>
          <Image src={images.logo} alt="logo" width={50} height={50} />
        </div>
        <div className={Style.NavBar_box_right}>
          {/* DESKTOP */}
          <div className={Style.NavBar_box_right_menu}>
            {menuItems.map((el, i) => (
              <div
                onClick={() => setActive(i + 1)}
                key={i + 1}
                className={`${Style.NavBar_box_right_menu_items} ${active == i + 1 ? Style.active_btn : ""}`}
              >
                <Link
                  className={Style.NavBar_box_right_menu_items_link}
                  href={el.link}
                >
                  {el.menu}
                </Link>
              </div>
            ))}
          </div>
          {/* MOBILE */}
          {open && (
            <div className={Style.mobile_menu}>
              {menuItems.map((el, i) => (
                <div
                  onClick={() => setActive(i + 1)}
                  key={i + 1}
                  className={`${Style.mobile_menu_items} ${active === i + 1 ? Style.active_btn : ""}`}
                >
                  <Link className={Style.mobile_menu_items_link} href={el.link}>
                    {el.menu}
                  </Link>
                </div>
              ))}
              <p className={Style.mobile_menu_btn}>
                <Image
                  src={images.close}
                  alt="close"
                  width={50}
                  height={50}
                  onClick={() => setOpen(false)}
                />
              </p>
            </div>
          )}
          {/* CONNECT TO WALLET */}
          <div className={Style.NavBar_box_right_connect}>
            {account === "" ? (
              <button onClick={connectWallet}>
                {" "}
                <span>Connect Wallet</span>
              </button>
            ) : (
              <button onClick={() => setOpenModel(true)}>
                {" "}
                {""}{" "}
                <Image
                  src={userName ? images.accountName : images.create2}
                  alt="image"
                  width={20}
                  height={20}
                />{" "}
                <small>{userName || "Create Account"}</small>
              </button>
            )}
          </div>
          <div
            className={Style.NavBar_box_right_open}
            onClick={() => setOpen(true)}
          >
            <Image src={images.open} alt="open" width={30} height={30} />
          </div>
        </div>
      </div>
      {/* MODAL COMPONENT */}
      {openModel && (
        <div className={Style.modelBox}>
          <Model
            openBox={setOpenModel}
            title="Welcome to App"
            head="this is head"
            info="this is info"
            smallInfo="kindly select your name"
            image={images.hero}
            functionName={createUser}
            address={account}
          />
        </div>
      )}
      {error ? <Error error={error} /> : null}
    </div>
  );
};
export default Navbar;
