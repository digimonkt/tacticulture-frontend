import { FilledButton } from "@/component/buttons";
import { LabeledInput, SelectInput } from "@/component/input";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { Col, Radio, Row } from "antd";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { guestBookingAPI } from "@/api/booking";
import Swal from "sweetalert";
import { resetBookingData } from "@/redux/reducers/booking";
import moment from "moment";

interface ICourseRequirement {
  handleStepNext: () => void;
  handleStepPrev: () => void;
}

function BillingInformationComponent({
  handleStepNext,
  handleStepPrev,
}: ICourseRequirement) {
  const dispatch = useAppDispatch();
  const { registrationData, bookingData, informationRequirement } =
    useAppSelector((state) => state.BookingReducer);
  const { eventDetail } = useAppSelector((state) => state.EventReducer);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      city: "",
      zipCode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("first name is required"),
      lastName: Yup.string().required("last name is required"),
      city: Yup.string().required("city is required"),
      zipCode: Yup.string().required("zip code is required"),
    }),
    onSubmit: async (values) => {
      console.log(values, "val");
      // handleStepNext();
      const payload = {
        email: registrationData.email,
        event_id: bookingData.eventId,
        booking_date: bookingData.date,
        booking_time: moment(bookingData.time, "hh:mm A").format("HH:mm"),
        booking_type: bookingData.type,
        custom_questions_answers: {
          // answerLongText: values.answerLongText,
          // answerShortText: values.answerShortText,
          answerLongText: "",
          answerShortText: "",
        },
        contact_details: [],
      };
      const resp = await guestBookingAPI(payload);
      if (resp.remote === "success") {
        Swal({
          title: "Congratulation",
          icon: "success",
        }).then((value) => {
          handleStepNext();

          dispatch(resetBookingData());
        });
      } else {
        Swal("Oops!", "Something went wrong!", "error");
      }
    },
  });
  console.log("checking", eventDetail);
  return (
    <div className="bg-white">
      <div className="guestBody">
        <div className="BillingBody ">
          <p
            onClick={handleStepPrev}
            style={{ color: "red", marginLeft: "10px" }}
          >
            Go Back
          </p>
          <div className="scheduleSteps pb-2">
            <span style={{ color: "#5C5C5C", fontWeight: "500" }}>
              {registrationData.email}
            </span>
          </div>
          <div className="guest">
            <h3>Checkout Billing Information</h3>
          </div>
          <Row>
            <Col md={12} className="input-1">
              <LabeledInput
                {...formik.getFieldProps("firstName")}
                placeholder="First Name*"
              />
              <p style={{ color: "red" }} className="verificationErrors">
                {formik.errors.firstName}
              </p>
            </Col>
            <Col md={12} className="input-1">
              <LabeledInput
                {...formik.getFieldProps("lastName")}
                placeholder="Last Name*"
              />
              <p style={{ color: "red" }} className="verificationErrors">
                {formik.errors.lastName}
              </p>
            </Col>
            <Col md={24} className="input-3">
              <LabeledInput placeholder="Address Line 1" />
            </Col>
            <Col md={12} className="input-4">
              <LabeledInput
                {...formik.getFieldProps("city")}
                placeholder="City*"
              />
              <p style={{ color: "red" }} className="verificationErrors">
                {formik.errors.city}
              </p>
            </Col>
            <Col md={6} className="input-5">
              <SelectInput />
            </Col>
            <Col md={6} className="input-6">
              <LabeledInput
                {...formik.getFieldProps("zipCode")}
                placeholder="Zip Code*"
              />
              <p style={{ color: "red" }} className="verificationErrors">
                {formik.errors.city}
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div className="billingDiv">
        <Row className="w-100 justify-content-between">
          <Col md={14}>
            <h4>Pay with</h4>
            <div className="creditSection mb-3">
              <div className="mb-2">
                <Radio />
                <span>
                  <b>Credit / Debit Card</b>
                </span>
              </div>
              <LabeledInput placeholder="Card Number*" />
              <div className="cvvSection">
                <LabeledInput placeholder="Exp. Date*" />
                <LabeledInput placeholder="CVV*" />
                <LabeledInput placeholder="Zip Code" />
              </div>
            </div>
            <div className="paypal">
              <div className="mb-2">
                <Radio />
                <span>Credit / Debit Card</span>
              </div>
            </div>
            <div className="orderBtn">
              <FilledButton onClick={() => formik.handleSubmit()}>
                Place Order
              </FilledButton>
            </div>
          </Col>
          <Col md={8}>
            <div className="orderSummary">
              <span>Order Summary</span>
              <h6>{eventDetail.name}</h6>
              <p>{moment(bookingData.date).format("MMMM DD, YYYY")} </p>

              <p>
                Event Start:{" "}
                {moment(bookingData.time, "hh:mm:ss").format("HH:mm a")}{" "}
              </p>
              <h5>
                {" "}
                + Event Price{" "}
                <span style={{ fontWeight: "bold" }}>
                  (+${eventDetail.perSpotCost})
                </span>
              </h5>
              {Object.entries(informationRequirement).map(([key, value]) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <h5>
                    {" "}
                    + {key}{" "}
                    <span style={{ fontWeight: "bold" }}>{`+$${value}`}</span>
                  </h5>
                );
              })}
            </div>
            <div className="summary">
              <div className="d-flex align-items-center justify-content-between">
                <span>Subtotal</span>
                <span>
                  $
                  {eventDetail.perSpotCost +
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    Object.values(informationRequirement).reduce(
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore
                      (acc, value) => acc + value,
                      0
                    )}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Fees</span>
                <span>$0.00</span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <span>Sales Tax</span>
                <span>$0.00</span>
              </div>
            </div>
            <div className="total d-flex align-items-center justify-content-between">
              <span>Total</span>
              <span>
                $
                {eventDetail.perSpotCost +
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  Object.values(informationRequirement).reduce(
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    (acc, value) => acc + value,
                    0
                  )}
              </span>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BillingInformationComponent;
