import React from 'react';
import Style from "./Error.module.css";
import images from "../../../assets";
import Image from 'next/image';
interface ErrorProps
{
    error: string;
}
const Error: React.FC<ErrorProps> = ( {error} ) =>
{
    return (
        <div className={Style.Error}>
            <div className={Style.Error_box}>
                <h1>Fix the following Error</h1>
                {error}
            </div>
        </div>
    );
};

export default Error;