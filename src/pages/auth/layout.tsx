import Header from "@/component/header";
import React from "react";
import styles from "./auth.module.css";
import Image from "next/image";
import { IMAGES } from "@/assets/images";

interface ILayout {
  children: React.ReactNode;
  title: string;
}

function Layout({ children, title }: ILayout) {
  return (
    <div>
      <div className={`${styles.auth_layout_page}`}>
        <Header />
        <div className={`${styles.auth_layout}`}>
          <Image src={IMAGES.LogoIcon} alt="" />
          <h1>{title}</h1>
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}

export default Layout;
