import React from "react";
import styles from "./profile.module.css";
import { IMAGES } from "@/assets/images";
import Image from "next/image";

function ProfileHeaderComponent() {
  return (
    <div className={`${styles.logo}`}>
      <Image src={IMAGES.LogoIcon} alt="" />
    </div>
  );
}

export default ProfileHeaderComponent;
