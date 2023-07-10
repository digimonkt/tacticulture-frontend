import React, { useEffect } from "react";
import styles from "./styles.module.css";
import ApprenticeHeaderComponent from "@/component/header/user-header";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import EventCardComponent from "@/component/card/event-card";
import { getAllEventData } from "@/redux/reducers/event";
interface IUpcomingCard {
    id?: number;
    eventStartDate: string;
    eventStartTime: string;
    eventEndDate: string;
    eventEndTime: string;
  }
function BrowseEvent() {
    const { allEventData } = useAppSelector((state) => state.EventReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllEventData());
      }, [dispatch]);

    return <div style={{
        background: "#212121",
        height: "100%",
        minHeight: "100vh",
        paddingBottom: "20px",
      }}>
        <ApprenticeHeaderComponent />
        <div
          style={{
            height: "100%",
            width: "818px",
            margin: "0 auto",
            paddingTop: "60px",
          }}
          className="tabs"
        >
            <div className={styles.mainBoxCard}>
               {/* < EventCardComponent
                        date={"value.eventStartDate"}
                        time={"value.eventStartTime"}
                        Share="Share"
                        CopyLink="Copy Link"
                        CourseText="View Course Page"
                        description={"item.name"}
                        address={item.location}
                      /> */}
               {
                allEventData.results?.map(item => {
                    return item.eventScheduledDateTime?.map((value:IUpcomingCard) => {
                        return <EventCardComponent
                        key={item.id}
                        date={value.eventStartDate}
                        time={value.eventStartTime}
                        Share="Share"
                        CopyLink="Copy Link"
                        CourseText="View Course Page"
                        description={item.name}
                        address={item.location}
                      />;
                      });
                })
               }
            </div>
        </div>
    </div>;
}

export default BrowseEvent;
