"use client";
import React, {useEffect, useState} from 'react';
const ToggleTheme = () =>
{
    const [isDarkMode, setIsDarkMode] = useState<boolean>( false );
    useEffect( () =>
    {
        const storedTheme = localStorage.getItem( "theme" );
        if ( storedTheme )
        {
            setIsDarkMode( storedTheme === "dark" );//this sets the value of the setIsDarkMode based on the storedTheme  value if the its = dark it will be then evaluated  to true else false 
            document.documentElement.classList.toggle( "dark", storedTheme === "dark" );// same is here if the storedTheme is dark the dark will be true else if its  not the dark will be evaluated to false 
        }
    }, [] );
    const toggleTheme = () =>
    {
        setIsDarkMode( ( prevMode ) =>//this prevMode value uses the current value of the setIsDarkMode as its value 
        {

            const newMode = !prevMode;
            localStorage.setItem( "theme", newMode ? "dark" : "light" );
            document.documentElement.classList.toggle( 'dark', newMode );
            return newMode;
        } );
    };
    return (
        <div> <button className="fixed bottom-4 right-4 p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 dark:bg-fuchsia-600 dark:hover:bg-violet-400 transition-colors duration-300" onClick={toggleTheme}>{isDarkMode ? 'Light' : 'Dark'}
        </button></div>
    );
};

export default ToggleTheme;  