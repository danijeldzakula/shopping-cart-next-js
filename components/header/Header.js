import Navbar from "../navbar/Navbar";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className="container">
        <Navbar />
      </div>
    </header>
  );
}
