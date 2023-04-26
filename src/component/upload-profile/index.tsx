import React, { useState } from "react";
import styles from "./uploadProfile.module.css";
import { SVG } from "@/assets/svg";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { OutlinedButton } from "../buttons";

function UploadProfileComponent() {
  const [fileSelect, setFileSelect] = React.useState<
    string | ArrayBuffer | null
  >("");
  const [addImages, setAddImages] = useState<File>();
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      var reader = new FileReader();
      setAddImages(e.target.files[0]);

      reader.onloadend = function () {
        setFileSelect(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  return (
    <>
      <div className="ps-4 pe-4 photosection">
        <h4 className="mb-3">Profile Photo</h4>
        <div className={`${styles.profileBox}`}>
          <h6>
            <SVG.Faupload width="16px" /> Drag and Drop Here
          </h6>
          {fileSelect ? (
            <>
              <div
                style={{ backgroundImage: `url(${fileSelect})` }}
                className={`${styles.profile_img}`}
              ></div>
            </>
          ) : (
            <>
              <div className={`${styles.profile_img}`}>
                <Image src={IMAGES.UploadPic} alt="" />
              </div>
            </>
          )}
          {fileSelect ? (
            <OutlinedButton>Replace</OutlinedButton>
          ) : (
            <OutlinedButton>or Choose a File</OutlinedButton>
          )}

          <input type="file" onChange={fileUpload} />
        </div>
      </div>
    </>
  );
}

export default UploadProfileComponent;
