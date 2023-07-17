import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import NavBar from "../common/navBar";

function MyApp({ Component, pageProps }) {
  return (
    <div className="container">
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
