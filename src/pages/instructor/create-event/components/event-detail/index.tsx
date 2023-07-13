import { SVG } from "@/assets/svg";
import { LabeledInput, TextInput } from "@/component/input";
import TextareaComponent from "@/component/textarea";
import { Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import styles from "../../course.module.css";
import _, { debounce } from "lodash";

import EventHeaderComponent from "../event-header";
import { useFormik } from "formik";
import { FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { useRouter } from "next/router";

import { createEvent, getEventData } from "@/redux/reducers/event";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import EventInterest, { IEventCategories } from "@/component/eventInterest";
import {
  checkUrlExistAPI,
  getGoogleLocation,
  updateOwnEventDetailAPI,
} from "@/api/event";
import { FilledButton } from "@/component/buttons";
import Swal from "sweetalert";
import { updateEventDetailPayload } from "@/api/types/event";

// export interface IEventStepOne {
//   handleSubmitEventStepOne: () => void;
// }

const EventDetailComponent = ({ mode }: { mode: string }) => {
  const [showDiv, setShowDiv] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [locationValue, setLocationValue] = useState(false);

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  //   setShowDiv(true);
  // };

  const [data, setData] = useState({
    name: "",
    description: "",
    location: "",
    courseUrl: "",
    availableSpots: "",
    perSpotCost: "",
    isIncludeTransactionFeeInCost: "",
    isAddSalesTax: "",
    salesTaxPercent: "",
    courseCategory: [],
  });

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { eventData }: any = useAppSelector((state) => state.EventReducer);
  const { ownEventDetail }: any = useAppSelector((state) => state.EventReducer);
  const { currentUser } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (mode === "update") {
      setData(ownEventDetail);
    } else {
      setData(eventData);
    }
  }, []);

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
    courseCategory: [],
    eventIds: [],
  };

  const formik = useFormik({
    // enableReinitialize : use this  flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Event name is required!"),
      description: Yup.string().required("Please Enter Event Description"),
      location: Yup.string()
        .required("Please Enter Event Location")
        .test(
          "location-condition",
          "Please enter Selected Location",
          function () {
            // const { availableSpots, state } = this.parent;
            return locationValue;
          }
        ),
      availableSpots: Yup.number().required("Please Enter Available Spots No."),
      courseCategory: Yup.array()
        .min(1)
        .required("Please select minimum 1 category"),
      // perSpotCost: Yup.string().required("Please Enter Sport Cost"),
    }),
    onSubmit: async (values) => {
      if (mode === "update") {
        const payload: any = {
          id: ownEventDetail.id,
          data: values,
        };

        const resp = await updateOwnEventDetailAPI(payload);

        if (resp.remote === "success") {
          Swal({
            title: "Event update successfully",
            icon: "success",
          });

          dispatch(getEventData());
        }
      } else {
        // console.log(values, "values");
        const resp = await checkUrlExistAPI(values.courseUrl.toLowerCase());

        if (resp?.remote) {
          dispatch(createEvent(values));
          router.push(`../instructor/create-event?step=${2}`);
        } else {
          Swal({
            title: `this event url is already exist\n${values.courseUrl}`,
            icon: "error",
          });
        }
      }
    },
  });
  // add event interest list
  const handleAddEventInterestList = (item: IEventCategories) => {
    if (formik.values.courseCategory.length < 3) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const isExist = formik.values.courseCategory?.includes(item);

      if (!isExist) {
        formik.setValues({
          ...formik.values,

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          courseCategory: [...formik.values.courseCategory, item],
          // eventIds: [...formik.courseCategory.eventIds, item.id],
        });
      }
    }
  };

  // handle remove interest from list
  const handleRemoveEventInterest = (item: IEventCategories) => {
    const filteredList = formik.values.courseCategory?.filter(
      (el) => el !== item
    );
    // const filteredIds = formik.values.eventIds?.filter((el) => el !== item.id);
    formik.setValues({
      ...formik.values,
      courseCategory: filteredList || [],
      // eventIds: filteredIds || [],
    });
  };

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
    formik.setFieldValue("courseCategory", data.courseCategory);
  }, [data]);

  const findLocation = debounce(async (e) => {
    if (e.target.value === "") {
      setLocationData([]);
    }
    const resp = await getGoogleLocation(e.target.value);

    if (resp?.results.length > 0) {
      setLocationData(resp.results);
    }
  }, 1000);

  useEffect(() => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      courseUrl: `https://tacticulture.com/${currentUser.username.toLowerCase()}/`,
    }));
  }, [currentUser.username]);

  const handleNameChange = (event: any) => {
    const { value } = event.target;
    formik.setFieldValue("name", value); // Update the name field value
    formik.setFieldValue(
      "courseUrl",
      `https://tacticulture.com/${currentUser.username.toLowerCase()}/${value.replace(
        /\s/g,
        ""
      )}`
    ); // Update the courseUrl field value
  };
  console.log(formik.values.location, "lo");
  return (
    <div>
      {mode === "update" ? (
        <div className="btnUpdate">
          <FilledButton onClick={() => formik.handleSubmit()}>
            Update
          </FilledButton>
        </div>
      ) : (
        <EventHeaderComponent
          heading="Event Detail"
          onPress={() => formik.handleSubmit()}
        />
      )}
      <div style={{ width: "570px" }} className="pe-0 ps-3 mb-4 eventForem">
        <TextInput
          {...formik.getFieldProps("name")}
          row={3}
          text="Event Name*"
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          onChange={handleNameChange}
        />
        <p style={{ color: "red" }} className="formik">
          {formik.errors.name}
        </p>
      </div>
      <div style={{ width: "570px" }} className="pe-0 ps-3 mb-4 eventInter">
        <EventInterest
          eventInterestValues={formik.values.courseCategory}
          handleSetInterest={(vl) => handleAddEventInterestList(vl)}
          handleRemoveInterest={(vl) => handleRemoveEventInterest(vl)}
          headerValue="Course Category* (Limit 3)"
          formikProps={formik.getFieldProps("courseCategory")}
        />
      </div>
      <p
        style={{
          color: "red",
          paddingLeft: "15px",
          textTransform: "capitalize",
          marginBottom: "0",
          position: "relative",
          bottom: "24px",
        }}
        className="formik"
      >
        {formik.errors.courseCategory}
      </p>
      <div className="textArea_section mb-4">
        <label className="ps-3 ms-0">Description*</label>
        <TextareaComponent
          title="Description"
          onChange={(e) => formik.setFieldValue("description", e)}
          onBlur={() => formik.setTouched({ description: true })}
          value={formik.values.description}
        />
        <p
          style={{
            color: "red",
            paddingLeft: "15px",
            textTransform: "capitalize",
            marginBottom: "0",
          }}
          className="formik"
        >
          {formik.errors.description}
        </p>
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput
          label="Location*"
          onChange={(e) => {
            setLocationValue(false);
            formik.setFieldValue("location", e.target.value);
            findLocation(e);
          }}
          value={formik.values.location}
        />
        {locationData.length > 0 && (
          <div className="locationList">
            {locationData.map((el: any, index) => (
              <ul
                onClick={() => {
                  setLocationValue(true);
                  formik.setFieldValue("location", el?.name);
                }}
                key={index}
              >
                <li>{el?.name}</li>
              </ul>
            ))}
          </div>
        )}
        <p style={{ color: "red", marginLeft: "18px" }} className="dataError">
          {formik.errors.location}
        </p>
      </div>
      <div className={`${styles.customInput}`}>
        <label>Course Link*</label>
        <p className="mb-0 ps-3 ms-1 guestCount">
          {`https://tacticulture.com/${currentUser.username.toLowerCase()}/`}
        </p>
        <LabeledInput className="mb-0" {...formik.getFieldProps("courseUrl")} />
        <span
          onClick={() =>
            formik.setFieldValue(
              "isPrivateEvent",
              !formik.values.isPrivateEvent
            )
          }
          style={{ position: "relative", top: "6px" }}
          className="ps-3 ms-1 mb-3 d-block alertText"
        >
          {formik.values.isPrivateEvent ? (
            <FaEyeSlash className="me-2" width="20px" />
          ) : (
            <SVG.Eye className="me-2" width="20px" />
          )}
          <b>Make this a Private Event?</b> (Event Not Displayed on Your
          Profile)
        </span>
        <p style={{ color: "red" }} className="dataError">
          {formik.errors.courseUrl}
        </p>
      </div>
      <div className={`${styles.customInput}`}>
        <LabeledInput
          label="Max # of Spots Available*"
          className="mb-2 d-block"
          style={{ width: "235px" }}
          {...formik.getFieldProps("availableSpots")}
        />
        <p className="ps-3 ms-1 guestCount">Does not include guest count</p>
        <p style={{ color: "red" }} className="dataErrors">
          {formik.errors.availableSpots}
        </p>
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
          <p className="mb-0 Transaction">
            Include Transaction Fee in my Defined Event Cost{" "}
            <SVG.InfoIcon width="16px" className={`${styles.info}`} />
          </p>
        </div>
        <div className="d-flex align-items-center mb-4 lastStep">
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
          {/* <p onClick={() => formik.handleSubmit()} style={{ left: "0px" }}>
            update
          </p> */}
        </div>
      </div>
      {mode === "update" ? null : (
        <EventHeaderComponent
          heading="Event Detail"
          onPress={() => formik.handleSubmit()}
        />
      )}
    </div>
  );
};

export default EventDetailComponent;
