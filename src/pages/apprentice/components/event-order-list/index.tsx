import React, { useEffect } from "react";
import styles from "./list.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { getAllEventData, getBookedEventData } from "@/redux/reducers/event";
import { useRouter } from "next/router";
import EventCardComponent from "@/component/card/event-card";
function EventOrderList() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { allEventData, bookedEventData } = useAppSelector((state) => state.EventReducer);
  useEffect(() => {
    dispatch(getBookedEventData());
  }, [dispatch]);

  return (
    <div>
      {bookedEventData.results.map((res) => (
        <EventCardComponent
          key={res.eventId}
          date={res.bookingDate}
          time={res.bookingTime}
          // Share="Share"
          // CopyLink="Copy Link"
          // CourseText="View Course Page"
          description={res.event.name}
          address={res.event.location}
        />
      ))}
    </div>
  );
}

export default EventOrderList;
