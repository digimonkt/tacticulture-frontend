import React from "react";
import Loader from "@/component/preLoaderComponent";
import { useAppSelector } from "@/redux/hooks/hooks";
import { preLoader } from "@/redux/reducers/preLoader";
import { alertMessage } from "@/redux/reducers/modalsToggle";
import AlertBox from "@/component/AlertComponent";

const GlobalCompRender = () => {
  // redux
  const preLoaderData = useAppSelector(preLoader);
  const alertMessageData = useAppSelector(alertMessage);
  return (
    <>
      {preLoaderData && <Loader />}
      {alertMessageData.show && <AlertBox />}
    </>
  );
};

export default GlobalCompRender;
