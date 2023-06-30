import React, { useEffect } from "react";
// import EventHeaderComponent from "../event-header";
import TextareaComponent from "@/component/textarea";
import styles from "../course.module.css";
import { FilledButton, OutlinedButton } from "@/component/buttons";

import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";

import CustomizedForm from "./CustomizedForm";
import { createEvent } from "@/redux/reducers/event";
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
    requirements: "",
    cancellationPolicies: "",
    customWaiverSettings: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      requirements: Yup.string().required("Requirement is required"),
      cancellationPolicies: Yup.string().required("Cancellation is required"),
      customWaiverSettings: Yup.string().required("Waiver is required"),
    }),
    onSubmit: (values) => {
      dispatch(
        createEvent({
          customWaiverSettings: values.customWaiverSettings,
          requirements: values.requirements,
          cancellationPolicies: values.cancellationPolicies,
        })
      );

      router.push(`../instructor/create-event?step=${Number(4)}`);
    },
  });

  useEffect(() => {
    formik.setFieldValue("requirements", eventData.requirements);
    formik.setFieldValue(
      "cancellationPolicies",
      eventData.cancellationPolicies
    );
    formik.setFieldValue(
      "customWaiverSettings",
      eventData.customWaiverSettings
    );
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
          onChange={(e) => formik.setFieldValue("requirements", e)}
          onBlur={() => formik.setTouched({ requirements: true })}
          value={formik.values.requirements}
        />
        <p style={{ color: "red" }}>{formik.errors.requirements}</p>
        <div>
          <h5>Cancellation</h5>

          <TextareaComponent
            onChange={(e) => formik.setFieldValue("cancellationPolicies", e)}
            onBlur={() => formik.setTouched({ cancellationPolicies: true })}
            value={formik.values.cancellationPolicies}
          />
        </div>
        <p style={{ color: "red" }}>{formik.errors.cancellationPolicies}</p>
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
              addMoreQuestion={() => addEventQuestion("add")}
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
            // onChange={(e) => dispatch(createEvent({ customWaiverSettings: e }))}
            onChange={(e) => {
              formik.setFieldValue("customWaiverSettings", e);
            }}
            value={formik.values.customWaiverSettings}
          />
          <p
            className="pb-0 mb-0"
            style={{
              color: "red",
              fontSize: "16px",
              position: "relative",
              bottom: "16px",
            }}
          >
            {formik.errors.customWaiverSettings}
          </p>
          <p className="mb-0">
            By publishing this event utilizing this this waiver you agree to the
            Tacticulture<span style={{ color: "#FF3030" }}> Terms of Use</span>{" "}
            and assume all liability.
          </p>
        </div>
        <EventHeaderComponent onPress={() => formik.handleSubmit()} />
      </div>
    </div>
  );
}

export default EventRequirement;
