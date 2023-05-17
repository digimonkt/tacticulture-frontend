import React, { useCallback, useState } from "react";
import { Modal, Slider } from "antd";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import { getCroppedImg } from "@/utils/cropperFunction";
import {
  handleImageCropperToggle,
  imageCropperToggle,
} from "@/redux/reducers/modalsToggle";
import { IMAGE_VARIENTS } from "@/utils/enum";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

interface imageCropperI {
  fileToCrop: string;
  setCroppedImage: (arg: string | null) => void;
  imageType: IMAGE_VARIENTS;
  fileExtension: string;
}

const ImageCropperComponent = ({
  fileToCrop,
  setCroppedImage,
  imageType,
  fileExtension,
}: imageCropperI) => {
  // redux selector and dispatcher
  const dispatch = useAppDispatch();
  const toggleImageCropper = useAppSelector(imageCropperToggle);

  // state management
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        fileToCrop,
        croppedAreaPixels,
        rotation,
        fileExtension
      );

      setCroppedImage(croppedImage);
      setTimeout(() => {
        dispatch(handleImageCropperToggle(false));
      }, 1000);
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [croppedAreaPixels, rotation, setCroppedImage]);

  return (
    <Modal
      open={toggleImageCropper}
      onOk={() => showCroppedImage()}
      onCancel={() => dispatch(handleImageCropperToggle(false))}
      title="Crop your image in your desire ratio"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 250,
          background: "#333",
        }}
      >
        <Cropper
          image={fileToCrop}
          crop={crop}
          rotation={rotation}
          zoom={zoom}
          aspect={
            imageType === IMAGE_VARIENTS.profile
              ? 1 / 1
              : imageType === IMAGE_VARIENTS.event
              ? 300 / 157
              : 1 / 1
          }
          cropShape={imageType === IMAGE_VARIENTS.event ? "rect" : "round"}
          onCropChange={setCrop}
          onRotationChange={setRotation}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <h5 style={{ fontSize: "16px", fontWeight: 700 }}>Zoom</h5>
        <div style={{ width: "70%", marginLeft: "30px" }}>
          <Slider
            value={zoom}
            min={1}
            max={10}
            onChange={(zoom) => setZoom(zoom)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ImageCropperComponent;
