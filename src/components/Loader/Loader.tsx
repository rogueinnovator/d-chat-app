import React from 'react';
import Style from "./Loader.module.css";
import images from "../../../assets";
import Image from 'next/image';
const Loader = () =>
{
  return (
    <div className={Style.Loader}>
      <div className={Style.Loader_box}>
        <Image src={images.loader} alt='loader' width={100} height={100} />
      </div>
    </div>
  );
};

export default Loader;