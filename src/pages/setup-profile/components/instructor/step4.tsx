import { FilledButton, OutlinedButton } from "@/component/buttons";
import { Col, Row } from "antd";
import React, {
  Ref,
  forwardRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import styles from "../../profile.module.css";
import { SVG } from "@/assets/svg";
import { subscriptionPlansList } from "@/api/subscriptionPlan";
import { SubscriptionPlan } from "@/api/types/subscriptionPlan";
import { updateUser } from "@/api/user";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { setPreLoader } from "@/redux/reducers/preLoader";
import {
  resetAlertMessage,
  setAlertMessage,
} from "@/redux/reducers/modalsToggle";
import { UpdateUserType } from "@/api/types/user";

// export default function Step4() {
export interface InstructorStepFourRef {
  handleSubmitPlanForm: () => void;
}

// function Step1() {

const Step4 = forwardRef(function Step4(
  props,
  ref: Ref<InstructorStepFourRef>
) {
  // const Plan = [
  //   {
  //     id: "1",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Unlimited Paid Events",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "2",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "1 Calendar Integration",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "3",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Basic Event Promotion on the Tacticulture events library  ",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "4",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Basic Event Promotion on the Tacticulture events library  ",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "5",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Basic Event Promotion on the Tacticulture events library  ",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "6",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Basic Event Promotion on the Tacticulture events library  ",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  //   {
  //     id: "7",
  //     check: (
  //       <>
  //         <SVG.Fillcheck />
  //       </>
  //     ),
  //     name: "Basic Event Promotion on the Tacticulture events library  ",
  //     info: (
  //       <>
  //         <SVG.InfoIcon />{" "}
  //       </>
  //     ),
  //   },
  // ];
  const [plansList, setPlansList] = useState<SubscriptionPlan[]>([]);
  const [planType, setPlanType] = useState("annually");
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedPlanType, setSelectedPlanType] = useState("");

  const dispatch = useAppDispatch();

  // router
  const router = useRouter();
  // reset AlertMessage
  const handleResetAlert = () => {
    setTimeout(() => {
      dispatch(resetAlertMessage());
    }, 2000);
  };
  // handle submit
  const handleSubmit = async () => {
    dispatch(setPreLoader(true));

    if (selectedPlanType === "free") {
      const payload: UpdateUserType = {
        is_profile_complete: true,
      };
      const response = await updateUser(payload);
      if (response.remote === "success") {
        router.push("/instructor/home");
      } else {
        if (response.error.status === 500) {
          dispatch(
            setAlertMessage({
              error: true,
              message: response.error.errors,
              show: true,
            })
          );
          handleResetAlert();
        } else if (response.error.status === 404) {
          dispatch(
            setAlertMessage({
              error: true,
              message: response.error.errors,
              show: true,
            })
          );
          handleResetAlert();
        } else {
          handleResetAlert();
        }
      }
      dispatch(setPreLoader(false));
    } else {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, step: 5 },
      });
    }
  };

  useImperativeHandle(ref, () => ({
    handleSubmitPlanForm: handleSubmit,
  }));

  // fetch Plans  list
  const fetchPlansList = async () => {
    const response = await subscriptionPlansList();

    if (response.remote === "success") {
      setPlansList(response.data.results);
    }
  };

  useEffect(() => {
    fetchPlansList();
  }, []);

  return (
    <div>
      <Row className="pe-4 ps-4">
        <Col md={6}>
          <div>
            <h4 className="mb-0">Choose A Plan</h4>
          </div>
        </Col>
        <Col md={18}>
          <div className="d-flex justify-content-end">
            <FilledButton
              className={
                planType === "annually"
                  ? `${styles.btnannual}`
                  : `${styles.btnmonthly}`
              }
              onClick={() => setPlanType("annually")}
            >
              Paid Annually
            </FilledButton>
            <OutlinedButton
              className={
                planType === "annually"
                  ? `${styles.btnmonthly}`
                  : `${styles.btnannual}`
              }
              onClick={() => setPlanType("monthly")}
            >
              Paid Monthly
            </OutlinedButton>
          </div>
        </Col>
        {plansList.map((plan) => (
          <React.Fragment key={plan.id}>
            {planType === plan.monthlyOrAnnualPlan ? (
              <Col md={12}>
                <div className={`${styles.planDetail}`}>
                  <h5>{plan.planName}</h5>
                  <h1 className="mb-0">${plan.amount}</h1>
                  <span className="mb-0 d-block">
                    {plan.planDuration}.
                    {plan.otherDescription ? (
                      <>
                        <br />
                        <span style={{ color: "#FF4646" }}>
                          {plan.otherDescription}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </span>
                  <br />
                  <FilledButton
                    onClick={() => {
                      setSelectedPlan(plan.id);
                      setSelectedPlanType(plan.planType);
                    }}
                    style={{
                      background: "#CB2C2C",
                      boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.2)",
                      borderRadius: "3px",
                      fontSize: "17px",
                      color: "#fff",
                      fontFamily: "Proxima Nova",
                      width: "140px",
                      height: "37px",
                      border: "0",
                    }}
                  >
                    {selectedPlan === plan.id
                      ? "Selected"
                      : plan.planType === "paid"
                      ? "Buy Now"
                      : "Sign Up Free"}
                  </FilledButton>
                  <ul className="p-0">
                    {plan.choices.map((choice) => (
                      <li key={choice.id}>
                        <span className={`${styles.CheckIcon}`}>
                          {" "}
                          <SVG.Fillcheck />
                        </span>
                        {choice.choices}
                        <span>
                          {" "}
                          <SVG.InfoIcon />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ) : (
              ""
            )}
          </React.Fragment>
        ))}
      </Row>
    </div>
  );
});

export default Step4;
