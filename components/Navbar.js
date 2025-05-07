import Link from 'next/link';
import { useTheme } from "@/context/ThemeContext"; // Import the context to access dark mode
import { FaSun, FaMoon } from 'react-icons/fa'; // Import the sun and moon icons

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme(); // Access dark mode state and toggle function

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-900 text-white">
      {/* Logo Section */}
      <div className="text-2xl font-bold">
        <h1>Movie-App</h1> {/* Movie app logo or title */}
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <Link href="/">
          <li className="hover:bg-yellow-500 px-4 py-2 rounded">Home</li>
        </Link>

        <Link href="/movies">
          <li className="hover:bg-yellow-500 px-4 py-2 rounded">Movies</li>
        </Link>

        <Link href="/genres">
          <li className="hover:bg-yellow-500 px-4 py-2 rounded">Genre</li>
        </Link>

        <Link href="/directors">
          <li className="hover:bg-yellow-500 px-4 py-2 rounded">Directors</li>
        </Link>
      </ul>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="px-4 py-2 ml-6 bg-yellow-500 text-black rounded hover:bg-yellow-400 transition-all flex items-center"
      >
        {darkMode ? <FaSun className="mr-2" /> : <FaMoon className="mr-2" />} 
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;
