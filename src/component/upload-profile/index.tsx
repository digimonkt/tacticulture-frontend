// import React, { useState } from "react";
// import styles from "./uploadProfile.module.css";
// import { SVG } from "@/assets/svg";
// import Image from "next/image";
// import { IMAGES } from "@/assets/images";
// import { OutlinedButton } from "../buttons";
// import { useAppDispatch } from "@/redux/hooks/hooks";
// import { handleImageCropperToggle } from "@/redux/reducers/modalsToggle";
// import { ImageCropper } from "../lightBoxes";
// import { IMAGE_VARIENTS } from "@/utils/enum";

// interface PropsI {
//   handleSetProfileImage: (arg: string | null) => void;
// }

// function UploadProfileComponent(props: PropsI) {
//   const dispatch = useAppDispatch();

//   const [croppedImage, setCroppedImage] = useState<string | null>(null);
//   const [selectedFileType, setSelectedFileType] = useState<string>("");

//   const fileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fileExtension = e.target?.files && e.target?.files[0]?.type;
//     if (
//       fileExtension === "image/jpeg" ||
//       fileExtension === "image/jpg" ||
//       fileExtension === "image/png"
//     ) {
//       e.target?.files &&
//         setCroppedImage(URL.createObjectURL(e.target?.files[0]));
//       setSelectedFileType(fileExtension);
//       dispatch(handleImageCropperToggle(true));
//     }
//   };

//   return (
//     <>
//       <div className="ps-4 pe-4 photosection">
//         <h4 className="mb-3">Profile Photo</h4>
//         <div className={`${styles.profileBox}`}>
//           <h6>
//             <SVG.Faupload width="16px" /> Drag and Drop Here
//           </h6>
//           {croppedImage ? (
//             <>
//               <div
//                 style={{ backgroundImage: `url(${croppedImage})` }}
//                 className={`${styles.profile_img}`}
//               ></div>
//             </>
//           ) : (
//             <>
//               <div className={`${styles.profile_img}`}>
//                 <Image src={IMAGES.UploadPic} alt="" />
//               </div>
//             </>
//           )}
//           {croppedImage ? (
//             <OutlinedButton>Replace</OutlinedButton>
//           ) : (
//             <OutlinedButton>or Choose a File</OutlinedButton>
//           )}

//           <input type="file" onChange={fileUpload} />
//         </div>
//       </div>
//       <ImageCropper
//         fileExtension={selectedFileType}
//         fileToCrop={croppedImage || ""}
//         setCroppedImage={(file) => {
//           setCroppedImage(file && file);
//           props.handleSetProfileImage(file);
//         }}
//         imageType={IMAGE_VARIENTS.profile}
//       />
//     </>
//   );
// }

// export default UploadProfileComponent;
import React, { useState, useRef } from "react";
import styles from "./uploadProfile.module.css";
import { SVG } from "@/assets/svg";
import { OutlinedButton } from "../buttons";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { handleImageCropperToggle } from "@/redux/reducers/modalsToggle";
import AvatarEditor from "react-avatar-editor";
import { IMAGE_VARIENTS } from "@/utils/enum";

interface PropsI {
  handleSetProfileImage: (arg: string | null) => void;
}

function UploadProfileComponent(props: PropsI) {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setCroppedImage(null);
      dispatch(handleImageCropperToggle(true));
    }
  };

  const handleImageCrop = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
      props.handleSetProfileImage(croppedImageUrl);
    }
  };

  const handleClickChooseFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
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
              <img src={croppedImage} alt="Cropped" />
            </>
          ) : (
            <>
              <div className={`${styles.profile_img}`}>
                <Image src={IMAGES.UploadPic} alt="" />
              </div>
            </>
          )}
          {croppedImage ? (
            <OutlinedButton onClick={handleClickChooseFile}>
              Replace
            </OutlinedButton>
          ) : (
            <OutlinedButton onClick={handleClickChooseFile}>
              or Choose a File
            </OutlinedButton>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            style={{ display: "none" }}
            ref={fileInputRef}
          />

          {selectedImage && (
            <AvatarEditor
              ref={fileInputRef}
              image={URL.createObjectURL(selectedImage)}
              width={250}
              height={250}
              border={50}
              borderRadius={250}
              color={[255, 255, 255, 0.6]}
              scale={1}
              rotate={0}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default UploadProfileComponent;
