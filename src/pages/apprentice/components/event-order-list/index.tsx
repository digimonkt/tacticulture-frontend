import React, { useEffect } from "react";
import styles from "./list.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAllEventData } from "@/redux/reducers/event";
import { useRouter } from "next/router";
function EventOrderList() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { allEventData } = useAppSelector((state) => state.EventReducer);
  useEffect(() => {
    dispatch(getAllEventData());
  }, []);

  return allEventData.results.map((res) => {
    return (
      <span
        onClick={() =>
          router.push({
            pathname: "/embed-body",
            query: { ...router.query, id: res.id },
          })
        }
        key={res.id}
        className={`${styles.list}`}
      >
        <div className={`${styles.listBox}`}>
          <h3>{res.name}</h3>
          <p>{res.description}</p>
        </div>
      </span>
    );
  });
}

export default EventOrderList;
