import { useCookies } from "react-cookie";
import "../styles/globals.css";
import Layout from "./components/Layout";

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "userId",
    "email",
  ]);
  return (
    <Layout
      loggedIn={cookies.accessToken}
      handleLogout={() => {
        console.log("heelloaw");
        removeCookie("accessToken");
        removeCookie("userId");
        removeCookie("email");
      }}
    >
      {" "}
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
