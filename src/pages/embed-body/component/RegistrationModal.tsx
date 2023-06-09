import Modal from "@/component/model";
import ModalHeader from "@/component/model/modalHeader";
import React, { useState } from "react";
import RegisterBodyComponent from "@/component/model/component/registerBody";
import RegisterGuestComponent from "@/component/model/component/registerGuest";
import CourseRequirementComponent from "@/component/model/component/courseRequirement";
import BillingInformationComponent from "@/component/model/component/billingInformation";
import { useAppSelector } from "@/redux/hooks/hooks";
import moment from "moment";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
// import { guestRegistration } from "@/redux/reducers/booking";

interface IRegistrationModal {
  registerModalOpen: () => void;
  registerModal: boolean;
  handleCancel: () => void;
  handleOk: () => void;
}

function RegistrationModal({
  registerModalOpen,
  registerModal,
  handleCancel,
  handleOk,
}: IRegistrationModal) {
  //   const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  // const dispatch = useAppDispatch();
  const { bookingData } = useAppSelector(
    (state) => state.BookingReducer
  );

  const prev = () => {
    setCurrent(current - 1);
  };
  // useEffect(() => {
  //   if (guestRegistrationStatus === "success") {
  //     setCurrent(current + 1);
  //   }
  // }, [guestRegistrationStatus]);

  const next = () => {
    //

    switch (current) {
      case 0:
        setCurrent(current + 1);
        break;
      case 1:
        setCurrent(current + 1);
        break;
      case 2:
        setCurrent(current + 1);
        break;
      case 3:
        setCurrent(0);
        handleCancel();
        break;

      default:
        break;
    }
  };
  console.log(current, "current");
  const steps = [
    {
      title: "First",
      content: (
        <RegisterBodyComponent handleStepNext={next} handleStepPrev={prev} />
      ),
    },
    {
      title: "Second",
      content: (
        <RegisterGuestComponent handleStepNext={next} handleStepPrev={prev} />
      ),
    },
    {
      title: "third",
      content: (
        <CourseRequirementComponent
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          handleStepNext={next}
          handleStepPrev={prev}
        />
      ),
    },
    {
      title: "four",
      content: (
        <BillingInformationComponent
          handleStepPrev={prev}
          handleStepNext={next}
        />
      ),
      //   content: (
      //     <CourseRequirementComponent
      //       handleStepNext={next}
      //       handleStepPrev={prev}
      //     />
      //   ),
    },
  ];

  //   const items = steps.map((item) => ({
  //     key: item.title,
  //     title: item.title,
  //   }));
  return (
    <div>
      <Modal
        className="courseModal"
        showModal={registerModalOpen}
        open={registerModal}
        onCancel={handleCancel}
        handleOk={handleOk}
      >
        <ModalHeader title={bookingData.title} text={`${moment(bookingData.date).format("MMMM DD,YYYY")} - ${bookingData.time}`} content="View Details" />
        <div className="registerModal">
          <div>{steps[current].content}</div>
          {/* <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div> */}
        </div>
      </Modal>
    </div>
  );
}

export default RegistrationModal;
