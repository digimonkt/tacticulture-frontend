import styles from "./eventInterest.module.css";
import { MdCancel } from "react-icons/md";
import React, { useState, useEffect } from "react";
import { eventCategoriesList } from "@/api/event";
import { FieldInputProps } from "formik";
import { EventCategory } from "@/api/types/event";

export type IEventCategories = {
  id: number;
  slug_name: string;
  event_categories: string;
};

interface IEventInterest {
  eventInterestValues: IEventCategories[];
  handleSetInterest: (arg: IEventCategories) => void;
  handleRemoveInterest: (arg: IEventCategories) => void;
  formikProps: FieldInputProps<string>;
  headerValue: string;
}

function EventInterest({
  eventInterestValues,
  handleSetInterest,
  handleRemoveInterest,
  formikProps,
  headerValue,
}: IEventInterest) {
  // state management
  const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);

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
      <h4>{headerValue}</h4>
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
                  handleSetInterest({
                    id: item.id,
                    slug_name: item.slugName,
                    event_categories: item.eventCategory,
                  });
                  formikProps.onBlur({ target: { name: formikProps.name } });
                }}
                key={item.id}
                className={`${styles.Eventlist}`}
              >
                <label className="position-relative">
                  {item.eventCategory}
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
