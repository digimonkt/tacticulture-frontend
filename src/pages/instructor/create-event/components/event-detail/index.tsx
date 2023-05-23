import { SVG } from "@/assets/svg";
import { LabeledInput, TextInput } from "@/component/input";
// import TextareaComponent from "@/component/textarea";
import { Checkbox } from "antd";
import React from "react";
import styles from "../../course.module.css";
import EventHeaderComponent from "../event-header";
import { useFormik } from "formik";
import { FaEyeSlash } from "react-icons/fa";

function EventDetailComponent() {
  // formik
  const initialValues = {
    eventName: "",
    courceCategory: [],
    description: "",
    location: "",
    courceLink: "",
    isPrivateEvent: false,
    availableSpots: 1,
    perSpotCost: "",
    transactionFee: false,
    isAddSaleTax: false,
    saleTaxValue: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("values -- ", values);
    },
  });
  console.log("first push of event create");
  return (
    <div>
      <EventHeaderComponent heading="Event Details" />
      <div style={{ width: "570px" }} className="pe-0 ps-3 mb-4">
        <TextInput
          {...formik.getFieldProps("eventName")}
          row={3}
          text="Event Name*"
        />
      </div>
      <div className="textArea_section mb-4">
        <label className="ps-3 ms-1">Description*</label>
        {/* <TextareaComponent /> */}
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput label="Location*" {...formik.getFieldProps("location")} />
      </div>
      <div className={`${styles.customInput}`}>
        <label>Course Link*</label>
        <p className="mb-0 ps-3 ms-1">tacticulture.com/eddiegallagher/</p>
        <LabeledInput
          className="mb-0"
          {...formik.getFieldProps("courceLink")}
        />
        <span
          style={{ position: "relative", top: "6px" }}
          className="ps-3 ms-1 mb-3 d-block"
        >
          {formik.values.isPrivateEvent ? (
            <FaEyeSlash className="me-2" width="20px" />
          ) : (
            <SVG.Eye className="me-2" width="20px" />
          )}
          <b>Make this a Private Event?</b> (Event Not Displayed on Your
          Profile)
        </span>
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput
          label="Max # of Spots Available*"
          className="mb-2 d-block"
          value="1"
          style={{ width: "235px" }}
        />
        <p className="ps-3 ms-1">Does not include guest count</p>
      </div>
      <div className={`${styles.customInput}`}>
        <label>
          Event Cost (per spot) <SVG.InfoIcon width="16px" />
        </label>
        <LabeledInput
          className="mb-2 d-block"
          style={{ width: "235px", paddingLeft: "36px" }}
        />
        <span className={`${styles.dollarIcon}`}>
          <SVG.Dollar width="24px" />
        </span>
        <div className="d-flex mt-3" style={{ whiteSpace: "nowrap" }}>
          <Checkbox className="me-3 " />
          <p className="mb-0">
            Include Transaction Fee in my Defined Event Cost{" "}
            <SVG.InfoIcon width="16px" className={`${styles.info}`} />
          </p>
        </div>
        <div className="d-flex align-items-center mb-4">
          <div className="d-flex mt-3" style={{ whiteSpace: "nowrap" }}>
            <Checkbox className="me-3 mt-4" />
            <p className="mb-0 me-4 mt-4">
              Add Sales Tax?
              <SVG.InfoIcon width="16px" className={`${styles.info}`} />
            </p>
          </div>
          <div className={`${styles.sales}`}>
            <LabeledInput
              label="Sales Tax Percent  "
              style={{ paddingLeft: "40px" }}
              value="500.00"
            />
            <span className={`${styles.dollarIcon}`}>
              <SVG.Percent width="24px" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetailComponent;
