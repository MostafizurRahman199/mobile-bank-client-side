import React from 'react';
import { FaRegMoon } from 'react-icons/fa';
import { FiSun } from 'react-icons/fi';
import { useDarkMode } from '../../Context/DarkModeContext';


 // Import the custom hook

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  // console.log(darkMode);

  return (
    <div className='mt-2'>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FiSun className={`text-white  text-2xl`} /> : <FaRegMoon className={`text-white text-xl`} />}
      </button>
    </div>
  );
};

export default DarkModeToggle;
