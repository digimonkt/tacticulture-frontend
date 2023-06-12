import React, { useState, useEffect } from "react";
// import EventHeaderComponent from "../event-header";
import TextareaComponent from "@/component/textarea";
import styles from "../course.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { SVG } from "@/assets/svg";
import { EVENT_QUESTION_TYPE } from "@/utils/enum";
import CustomizedForm from "./CustomizedForm";
import { createEvent, eventData } from "@/redux/reducers/event";
import { useFormik } from "formik";
import * as Yup from "yup";
import EventHeaderComponent from "../event-header";
import { useRouter } from "next/router";

function EventRequirement() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { eventData } = useAppSelector((state) => state.EventReducer);
  const addEventQuestion = (type: string, id?: number) => {
    if (type === "add") {
      dispatch(
        createEvent({
          customQuestions: [
            ...eventData.customQuestions,
            {
              id: eventData.customQuestions.length + 1,
              fieldType: "ShortText",
              answerRequired: true,
            },
          ],
        })
      );
    } else {
      dispatch(
        createEvent({
          customQuestions: [
            ...eventData.customQuestions.filter((el) => el.id !== id),
          ],
        })
      );
    }
  };

  const initialValues = {
    requirement: "",
    cancellation: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      requirement: Yup.string().required("Requirement is required"),
      cancellation: Yup.string().required("Cancellation is required"),
    }),
    onSubmit: (values) => {
      // dispatch(createEvent(values));
      console.log({ values });
      router.push(`../instructor/create-event?step=${Number(4)}`);
    },
  });

  useEffect(() => {
    console.log(eventData, "ell");
  }, [eventData]);

  // console.log(eventData, "ef");
  return (
    <div>
      <EventHeaderComponent
        heading="Policies, Questions and Waiver"
        onPress={() => formik.handleSubmit()}
      />
      <div className="eventRequirement">
        <h5>Requirements</h5>
        <p className="mb-0">
          ex. Necessary equipment, physical requirements or any additional event
          restrictions the user should consider when booking this event.
        </p>
        <TextareaComponent
          title="Requirement"
          onChange={(e) => formik.setFieldValue("requirement", e)}
          onBlur={() => formik.setTouched({ requirement: true })}
          value={formik.values.requirement}
        />
        <p style={{ color: "red" }}>{formik.errors.requirement}</p>
        <div>
          <h5>Cancellation</h5>

          <TextareaComponent
            // onChange={(value) =>
            //   dispatch(createEvent({ cancellationPolicies: value }))
            // }
            title="Cancellation"
            onChange={(e) => formik.setFieldValue("cancellation", e)}
            onBlur={() => formik.setTouched({ cancellation: true })}
            value={formik.values.cancellation}
          />
        </div>
      </div>
      <div className={`${styles.customEvents}`}>
        <h4>Custom Event Questions</h4>

        <p>
          Configure the information you’d like to collect. We automatically
          collect each users personal profile information in addition to
          requiring Emergency Contact Name and Phone information, but you can
          add additional questions, including paid additions.
        </p>
        <FilledButton
          onClick={() => addEventQuestion("add")}
          className={`${styles.btnAdd}`}
        >
          + Add Questions
        </FilledButton>
      </div>

      {eventData.customQuestions.map((el, index) => {
        return (
          <div key={el.id}>
            <CustomizedForm
              index={index}
              data={el}
              deleteQuestion={() => addEventQuestion("delete", el.id)}
            />
          </div>
        );
      })}
      <div className="waiverSetting">
        <div className={`${styles.waiverHeader}`}>
          <h3>Waiver Settings</h3>
          <div className={`${styles.waiverBtn}`}>
            <OutlinedButton
              onClick={() =>
                dispatch(createEvent({ defaultWaiverSettings: "default" }))
              }
              className={
                eventData.defaultWaiverSettings === "default"
                  ? `${styles.btnCustom}`
                  : `${styles.btnDefault}`
              }
            >
              Use Tacticulture Default
            </OutlinedButton>
            <OutlinedButton
              onClick={() =>
                dispatch(createEvent({ defaultWaiverSettings: "custom" }))
              }
              className={
                eventData.defaultWaiverSettings === "custom"
                  ? `${styles.btnCustom}`
                  : `${styles.btnDefault}`
              }
            >
              Set Custom Waiver
            </OutlinedButton>
          </div>
        </div>
        <div className={`${styles.waiverTextarea}`}>
          <TextareaComponent
            title="Set Your Custom Waiver Contents"
            className="mb-3"
            onChange={(e) => dispatch(createEvent({ customWaiverSettings: e }))}
          />
          <p className="mb-0">
            By publishing this event utilizing this this waiver you agree to the
            Tacticulture<span style={{ color: "#FF3030" }}> Terms of Use</span>{" "}
            and assume all liability.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventRequirement;
