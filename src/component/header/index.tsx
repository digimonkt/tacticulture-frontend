import React, { useEffect, useState } from "react";
import styles from "./header.module.css";
import Link from "next/link";
import { FilledButton } from "@/component/buttons";

function Header() {
  // state management
  const [urlPathName, setUrlPathName] = useState<string>("");

  useEffect(() => {
    const pathName = window.location.pathname;

    setUrlPathName(pathName);
  }, []);

  return (
    <div className={`${styles.headers}`}>
      <Link href="/">
        <span>New to Tacticulture?</span>
      </Link>
      {urlPathName === "/login" ? (
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
