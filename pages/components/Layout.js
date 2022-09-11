import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../../styles/components/Layout.module.css";

export default function Layout({ children, loggedIn, handleLogout }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div>
      <div>
        <ul className={styles.ul}>
          {isLoggedIn && (
            <>
              <li className={styles.li}>
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>

              <li className={styles.li} onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li className={styles.li}>
                <Link href="/register">
                  <a>Register</a>
                </Link>
              </li>

              <li className={styles.li}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div style={{ padding: "10px" }}>{children}</div>
    </div>
  );
}
