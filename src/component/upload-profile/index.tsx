import React, { useState } from "react";
import styles from "./uploadProfile.module.css";
import { SVG } from "@/assets/svg";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { OutlinedButton } from "../buttons";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleImageCropperToggle } from "@/redux/reducers/modalsToggle";
import { ImageCropper } from "../lightBoxes";
import { IMAGE_VARIENTS } from "@/utils/enum";
// import { Upload } from "antd";
// import ImgCrop from "antd-img-crop";

interface PropsI {
  handleSetProfileImage: (arg: string | null) => void;
}

function UploadProfileComponent(props: PropsI) {
  // redux
  const dispatch = useAppDispatch();

  // state management
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string>("");

  // handle file upload
  const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileExtension = e.target?.files && e.target?.files[0]?.type;
    if (
      fileExtension === "image/jpeg" ||
      fileExtension === "image/jpg" ||
      fileExtension === "image/png"
    ) {
      e.target?.files &&
        setCroppedImage(URL.createObjectURL(e.target?.files[0]));
      setSelectedFileType(fileExtension);
      dispatch(handleImageCropperToggle(true));
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
          {croppedImage ? (
            <>
              <div
                style={{ backgroundImage: `url(${croppedImage})` }}
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
          {croppedImage ? (
            <OutlinedButton>Replace</OutlinedButton>
          ) : (
            <OutlinedButton>or Choose a File</OutlinedButton>
          )}

          {/* <ImgCrop>
            <Upload>+ Add image</Upload>
          </ImgCrop> */}

          <input type="file" onChange={fileUpload} />
        </div>
      </div>
      <ImageCropper
        fileExtension={selectedFileType}
        fileToCrop={croppedImage || ""}
        setCroppedImage={(file) => {
          setCroppedImage(file && file);
          props.handleSetProfileImage(file);
        }}
        imageType={IMAGE_VARIENTS.profile}
      />
    </>
  );
}

export default UploadProfileComponent;
