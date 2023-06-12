import { SVG } from "@/assets/svg";
import { LabeledInput, TextInput } from "@/component/input";
import TextareaComponent from "@/component/textarea";
import { Checkbox } from "antd";
import React, { Ref, useEffect } from "react";
import styles from "../../course.module.css";

import EventHeaderComponent from "../event-header";
import { useFormik } from "formik";
import { FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { createEvent, eventData } from "@/redux/reducers/event";
import { useAppSelector } from "@/redux/hooks/hooks";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import EventInterest from "@/component/eventInterest";

// export interface IEventStepOne {
//   handleSubmitEventStepOne: () => void;
// }

const EventDetailComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useAppSelector(eventData);
  // formik
  const initialValues = {
    name: "",
    description: "",
    location: "",
    courseUrl: "",
    isPrivateEvent: false,
    availableSpots: 1,
    perSpotCost: "",
    transactionFee: false,
    isAddSalesTax: false,
    salesTaxPercent: "",
    isIncludeTransactionFeeInCost: false,
  };

  const formik = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Event name is required!"),
      // description: Yup.string().required("Please Enter Event Description"),
      location: Yup.string().required("Please Enter Event Location"),
      courseUrl: Yup.string().required("Please Enter Course Link"),
      availableSpots: Yup.number().required("Please Enter Available Spots No."),
      // perSpotCost: Yup.string().required("Please Enter Sport Cost"),
    }),
    onSubmit: (values) => {
      // handleSubmit(values);
      // console.log(values, "value");
      dispatch(createEvent(values));
      router.push(`../instructor/create-event?step=${2}`);
      // router.push(`../instructor/create-event?step=${2}`);
    },
  });

  // const handleSubmit = (data: any) => {
  //   console.log(data, "data");
  // };
  // useImperativeHandle(ref, () => ({
  //   handleSubmitEventStepOne: formik.handleSubmit,
  // }));

  useEffect(() => {
    formik.setFieldValue("name", data.name);
    formik.setFieldValue("description", data.description);
    formik.setFieldValue("location", data.location);
    formik.setFieldValue("courseUrl", data.courseUrl);
    formik.setFieldValue("availableSpots", data.availableSpots);
    formik.setFieldValue("perSpotCost", data.perSpotCost);
    formik.setFieldValue(
      "isIncludeTransactionFeeInCost",
      data.isIncludeTransactionFeeInCost
    );
    formik.setFieldValue("isAddSalesTax", data.isAddSalesTax);
    formik.setFieldValue("salesTaxPercent", data.salesTaxPercent);
  }, []);

  return (
    <div>
      <EventHeaderComponent
        heading="Event Detail"
        onPress={() => formik.handleSubmit()}
      />
      <div style={{ width: "570px" }} className="pe-0 ps-3 mb-4">
        <TextInput
          {...formik.getFieldProps("name")}
          row={3}
          text="Event Name*"
        />
        <p style={{ color: "red" }}>{formik.errors.name}</p>
      </div>
      <div style={{ width: "570px" }} className="pe-0 ps-3 mb-4">
        <EventInterest
          eventInterestValues={[]}
          handleSetInterest={(vl) => console.log(vl)}
          handleRemoveInterest={(vl) => console.log(vl)}
          headerValue="Course Category* (Limit 3)"
          formikProps={formik.getFieldProps("category")}
        />
      </div>

      <div className="textArea_section mb-4">
        <label className="ps-3 ms-1">Description*</label>
        <TextareaComponent
          title="Description"
          onChange={(e) => formik.setFieldValue("description", e)}
          onBlur={() => formik.setTouched({ description: true })}
          value={formik.values.description}
        />
        <p style={{ color: "red" }}>{formik.errors.description}</p>
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput label="Location*" {...formik.getFieldProps("location")} />
        <p style={{ color: "red" }}>{formik.errors.location}</p>
      </div>
      <div className={`${styles.customInput}`}>
        <label>Course Link*</label>
        <p className="mb-0 ps-3 ms-1">tacticulture.com/eddiegallagher/</p>
        <LabeledInput className="mb-0" {...formik.getFieldProps("courseUrl")} />
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
        <p style={{ color: "red" }}>{formik.errors.courseUrl}</p>
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput
          label="Max # of Spots Available*"
          className="mb-2 d-block"
          style={{ width: "235px" }}
          {...formik.getFieldProps("availableSpots")}
        />
        <p className="ps-3 ms-1">Does not include guest count</p>
        <p style={{ color: "red" }}>{formik.errors.availableSpots}</p>
      </div>
      <div className={`${styles.customInput}`}>
        <label>
          Event Cost (per spot) <SVG.InfoIcon width="16px" />
        </label>
        <LabeledInput
          className="mb-2 d-block"
          style={{ width: "235px", paddingLeft: "36px" }}
          {...formik.getFieldProps("perSpotCost")}
        />
        <span className={`${styles.dollarIcon}`}>
          <SVG.Dollar width="24px" />
        </span>
        <div className="d-flex mt-3" style={{ whiteSpace: "nowrap" }}>
          <Checkbox
            className="me-3 "
            checked={formik.values.isIncludeTransactionFeeInCost}
            onChange={(e: CheckboxChangeEvent) =>
              formik.setFieldValue(
                "isIncludeTransactionFeeInCost",
                e.target.checked
              )
            }
          />
          <p className="mb-0">
            Include Transaction Fee in my Defined Event Cost{" "}
            <SVG.InfoIcon width="16px" className={`${styles.info}`} />
          </p>
        </div>
        <div className="d-flex align-items-center mb-4">
          <div className="d-flex mt-3" style={{ whiteSpace: "nowrap" }}>
            <Checkbox
              className="me-3 mt-4"
              checked={formik.values.isAddSalesTax}
              onChange={(e: CheckboxChangeEvent) =>
                formik.setFieldValue("isAddSalesTax", e.target.checked)
              }
            />
            <p className="mb-0 me-4 mt-4">
              Add Sales Tax?
              <SVG.InfoIcon width="16px" className={`${styles.info}`} />
            </p>
          </div>
          <div className={`${styles.sales}`}>
            <LabeledInput
              label="Sales Tax Percent  "
              style={{ paddingLeft: "40px" }}
              {...formik.getFieldProps("salesTaxPercent")}
            />
            <span className={`${styles.dollarIcon}`}>
              <SVG.Percent width="24px" />
            </span>
          </div>
        </div>
      </div>
      <EventHeaderComponent
        heading="Event Detail"
        onPress={() => formik.handleSubmit()}
      />
    </div>
  );
};

export default EventDetailComponent;
