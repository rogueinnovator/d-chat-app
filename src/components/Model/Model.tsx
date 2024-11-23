"use client";
import {useAppContext} from '@/Context/ChatAppContext';
import React, {Dispatch, SetStateAction, useState} from 'react';
import Style from "./Model.module.css";
import Image from 'next/image';
import {StaticImport} from 'next/dist/shared/lib/get-img-props';
import images from "../../../assets";
import {Loader} from "../index";
interface modelProps
{
    openBox: Dispatch<SetStateAction<boolean | null>>;
    address: string | any;
    title: string;
    head: string;
    info: string;
    smallInfo: string;
    image: string | StaticImport;
    functionName: ( ( name: string, accountAddress: string ) => Promise<void> ) | any;

};
const Model: React.FC<modelProps> = ( {openBox, address, title, head, info, smallInfo, image, functionName} ) =>
{
    const {loading} = useAppContext();
    const [name, setName] = useState<string>( "" );
    const [accountAddress, setAccountAddress] = useState<string>( "" );
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>
                <div className={Style.Model_box_left}>
                    <Image src={image} alt='image' width={700} height={700} />
                </div>
                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>
                    {loading ? <Loader /> : ( <div className={Style.Model_box_right_name}>
                        <div className={Style.Model_box_right_name_info}>
                            <Image src={images.username} alt='username' width={30} height={30} />
                            <input type='text' placeholder='Your name' onChange={( e ) =>
                            {
                                setName( e.target.value );
                            }} />
                        </div>
                        <div className={Style.Model_box_right_name_info}>
                            <Image src={images.account} alt='username' width={30} height={30} />
                            <input type='text' placeholder={`${address || "Enter address"}`} onChange={( e ) =>
                            {
                                setAccountAddress( e.target.value );
                            }} />
                        </div>
                        <div className={Style.Model_box_right_name_btn}>
                            {""}
                            <button onClick={() => functionName( name, accountAddress )}>
                                {""}
                                Submit                          <Image src={images.send} alt='send' width={30} height={30} />
                            </button>
                            <button onClick={() => openBox( false )}>
                                {""}
                                Cancel                          <Image src={images.close} alt='send' width={30} height={30} />
                            </button>
                        </div>
                    </div> )}

                </div>
            </div>
        </div>
    );
};

export default Model;;