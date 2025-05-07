// import "@/styles/globals.css";
// import Navbar from "../components/Navbar"; 
// import Footer from "@/components/Footer";

// export default function App({ Component, pageProps }) {
//   return (
//     <div > 
//       <Navbar />
//       <Component {...pageProps} /> 
//       <Footer/>
//     </div>
//   );
// }
// pages/_app.js
import "@/styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider, useTheme } from "@/context/ThemeContext"; // Import context

function AppLayout({ children }) {
  const { darkMode } = useTheme(); // Access darkMode from context

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </ThemeProvider>
  );
}
