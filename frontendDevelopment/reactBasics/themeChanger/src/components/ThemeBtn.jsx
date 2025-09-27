import React from 'react'
import useTheme from '../contexts/theme';

export default function ThemeBtn() {
    const data=useTheme();
    console.log('ThemeBtn - Current theme data:', data);
    
    const onChangeBtn=(e)=>{
        const darkModeStatus=e.currentTarget.checked
        console.log('Toggle clicked, darkModeStatus:', darkModeStatus);
        console.log('Available functions:', { darkTheme: data.darkTheme, lightTheme: data.lightTheme });
        
        if(darkModeStatus){
            console.log('Calling darkTheme()');
            data.darkTheme();
        }else{
            console.log('Calling lightTheme()');
            data.lightTheme();
        }
             
    }
    return (
        <label className="relative inline-flex items-center cursor-pointer">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                onChange={onChangeBtn}
                checked={data.themeMode==="dark"}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">Toggle Theme</span>
            <button 
                onClick={() => {
                    console.log('Button clicked directly');
                    if (data.themeMode === "light") {
                        data.darkTheme();
                    } else {
                        data.lightTheme();
                    }
                }}
                className="ml-4 px-2 py-1 bg-blue-500 text-white rounded text-xs"
            >
                Test Toggle
            </button>
        </label>
    );
}
