"use client";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const pathname = decodeURIComponent(usePathname());

  return (
    <div className={styles.container}>
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/dashboard/qrcode">QR Code</Link>
        <Link href="/dashboard/upload">Upload</Link>
        <Link href="/dashboard/logicapp">Logic App</Link>
        <Link href="/api/auth/signout?callbackUrl=/">Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;