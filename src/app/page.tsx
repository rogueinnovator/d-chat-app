"use client";
import {Model, Navbar} from '@/components/index';
import ToggleTheme from '@/components/ToggleTheme';
import {useAppContext} from '@/Context/ChatAppContext';
import React from 'react';
const page = () =>
{
  const {account} = useAppContext();

  return (

    <div>
      <Navbar />
      <ToggleTheme /></div>


  );
};

export default page;