import Link from "next/link";
import styles from "../../styles/components/Layout.module.css";

export default function Layout({ children }) {
  return (
    <div>
      <div>
        <ul className={styles.ul}>
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
        </ul>
      </div>
      <div>{children}</div>
    </div>
  );
}
