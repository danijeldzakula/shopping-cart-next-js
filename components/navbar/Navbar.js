import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import useIsomorphicLayoutEffect from "@/hooks/useLayoutEffect";
import styles from "./navbar.module.css";

export default function Navbar() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useIsomorphicLayoutEffect(() => {}, [dispatch]);

  return (
    <nav className={styles.navbar}>
      <ul>
        <Link href="/" className="logo-brand">
          <span className="text">Redux</span>
        </Link>
      </ul>

      <ul>
        <li>
          <Link href="/" className={styles.navLink}>
            <span className="text">Home</span>
          </Link>
        </li>
        <li>
          <Link href="/products" className={styles.navLink}>
            <span className="text">Products</span>
          </Link>
        </li>
        <li>
          <Link href="/about" className={styles.navLink}>
            <span className="text">About</span>
          </Link>
        </li>
        <li>
          <Link
            href="/cart"
            className={[styles.navLink, styles.navLinkCart].join(" ")}
          >
            <span className="text">Cart</span>
            <span className={styles.navLinkCartIcon}>{cart.totalCount}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
