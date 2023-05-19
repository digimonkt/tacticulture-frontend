import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { FilledButton } from "@/component/buttons";
import { useRouter } from "next/router";

function Header() {
  // router
  const router = useRouter();

  return (
    <div className={`${styles.headers}`}>
      <Link href="/">
        <span>New to Tacticulture?</span>
      </Link>
      {router.pathname === "/login" ? (
        <Link href={"/create-account"}>
          <FilledButton
            className="btn-grey btnCreate"
            color="#414141"
            style={{
              width: "179px",
              height: "39px",
            }}
          >
            Create an Account
          </FilledButton>
        </Link>
      ) : (
        <Link href={"/login"}>
          <FilledButton
            className="btn-grey btnCreate"
            color="#414141"
            style={{
              width: "179px",
              height: "39px",
            }}
          >
            Sign In
          </FilledButton>
        </Link>
      )}
    </div>
  );
}

export default Header;
