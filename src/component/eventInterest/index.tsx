import styles from "./eventInterest.module.css";
import { MdCancel } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { eventCategoriesList } from "@/api/auth";
import { FieldInputProps } from "formik";

export interface IEventCategories {
  id: string;
  event_categories: string;
}

interface IEventInterest {
  eventInterestValues: {
    id: string;
    event_categories: string;
  }[];
  handleSetInterest: (arg: IEventCategories) => void;
  handleRemoveInterest: (arg: IEventCategories) => void;
  formikProps: FieldInputProps<string>;
}

function EventInterest({
  eventInterestValues,
  handleSetInterest,
  handleRemoveInterest,
  formikProps,
}: IEventInterest) {
  // state management
  const [eventCategories, setEventCategories] = useState<IEventCategories[]>(
    []
  );

  // fetch event categories  list
  const fetchEventCategoryList = async () => {
    const response = await eventCategoriesList();

    if (response.remote === "success") {
      setEventCategories(response.data.results);
    }
  };

  useEffect(() => {
    fetchEventCategoryList();
  }, []);
  return (
    <div className={`${styles.Eventinterest}`}>
      <h4>Event Interests</h4>
      <div className={`${styles.eventInterestItemContainer}`}>
        {eventInterestValues.map((item) => (
          <span key={item.id} className={`${styles.Eventlist2}`}>
            <label className="position-relative">{item.event_categories}</label>
            <MdCancel
              onClick={() => handleRemoveInterest(item)}
              color="#fff"
              style={{ marginLeft: 5, cursor: "pointer" }}
            />
          </span>
        ))}
      </div>

      <>
        <div className={`${styles.EventDropdown}`}>
          <ul className="p-0 listevent">
            {eventCategories.map((item) => (
              <li
                onClick={() => {
                  handleSetInterest(item);
                  formikProps.onBlur({ target: { name: formikProps.name } });
                }}
                key={item.id}
                className={`${styles.Eventlist}`}
              >
                <label className="position-relative">
                  {item.event_categories}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </>
    </div>
  );
}

export default EventInterest;
