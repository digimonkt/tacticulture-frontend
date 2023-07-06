import ApprenticeHeaderComponent from "@/component/header/user-header";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Col, Row } from "antd";
import { OutlinedButton } from "@/component/buttons";
import { SVG } from "@/assets/svg";
import Image from "next/image";
import { IMAGES } from "@/assets/images";
import { OptionsInput } from "@/component/input";
import { Dropdown } from "react-bootstrap";

import ForumCardComponent from "../apprentice/components/forum-card";
import FilledButtonComponent from "@/component/buttons/filledButton";
import { currentUser } from "@/redux/reducers/user";
import { availableEventData } from "@/redux/reducers/event";
import { useAppSelector } from "@/redux/hooks/hooks";
import moment from "moment";

interface IUpcomingCard{ 
  id?: number;
  eventStartDate: string;
  eventStartTime: string;
  eventEndDate: string;
  eventEndTime: string;
}

function InstructorProfileLayout() {
  const user= useAppSelector(currentUser)
  const eventData = useAppSelector(availableEventData);
  const [upcomingEvent, setUpcomingEvent]= useState<any[]>([])

  useEffect(()=>{
    // console.log(moment("2023-07-05").isAfter(moment().format("YYYY-MM-DD")))
      const filter= eventData.results.filter(item=> item.eventScheduledDateTime && item.eventScheduledDateTime?.length>0 && item.eventScheduledDateTime?.some(value=> moment(value.eventStartDate).isAfter(moment().format("YYYY-MM-DD")) ) )
      console.log(filter)
      const sort = filter.sort((_event1, _event2)=>{
        const start1= _event1.eventScheduledDateTime && _event1.eventScheduledDateTime[0]
        const start2 =_event2.eventScheduledDateTime && _event2.eventScheduledDateTime[0]
      const startDate1 = new Date(start1?.eventStartDate||"")
      const startDate2 = new Date(start2?.eventStartDate ||"" )
      if (startDate1 > startDate2) {
        return -1;
      }
      if (startDate1 < startDate2) {
        return 1;
      }
      return 0;
    })
    setUpcomingEvent(sort)
    // console.log({sort})
  
  },[eventData])

  return (
    <div>
      <ApprenticeHeaderComponent />
      <div className={`${styles.bodySection}`}>
        <div className={`${styles.content}`}>
          <Row className="pt-5">
            <Col md={12} className="pt-5">
              <div className="profileBox">
                <div className="text-end d-flex justify-content-end">
                  <OutlinedButton
                    icon={<SVG.Dots width="20px" />}
                    className="me-2 bg-white "
                    style={{
                      border: "1px solid #5C5C5C",
                      borderRadius: "3px",
                      padding: "0px 6px 3px",
                    }}
                  ></OutlinedButton>
                  <OutlinedButton
                    className="bg-white "
                    style={{
                      border: "1px solid #5C5C5C",
                      borderRadius: "3px",
                      padding: "0px 6px 3px",
                      fontSize: "14px",
                      color: "#5C5C5C",
                      fontWeight: "700",
                      fontFamily: "Proxima Nova",
                      letterSpacing: "1px",
                    }}
                  >
                    Following{" "}
                  </OutlinedButton>
                </div>
                <div className="text-center">
                  <Image src={IMAGES.Ellipse} alt="" />
                  <h3>
                    <SVG.Guard /> {user.firstName} {user.lastName}
                  </h3>
                  <span>INSTRUCTOR - @{user.username}</span>
                  {/* <div className="pt-1 pb-1">
                    <Image src={IMAGES.Badge} alt="" />
                    <Image src={IMAGES.Badge} alt="" />
                  </div> */}

                  <div className={`${styles.following}`}>
                    <p className="me-3">
                      <span>
                        <b>20</b>
                      </span>{" "}
                      Following
                    </p>
                    <p>
                      <span>
                        <b>5000</b>
                      </span>{" "}
                      Followers
                    </p>
                  </div>
                  <div className={`${styles.embeded}`}>
                    <p dangerouslySetInnerHTML={{__html:user.bio}}>
                     
                    </p>
                 
                  </div>
                  <div className="text-start ms-3 ps-1 socilemedia">
                    <OutlinedButton
                      icon={
                        <SVG.Question
                          width="20px"
                          style={{
                            position: "relative",
                            bottom: "2px",
                            right: "7px",
                          }}
                        />
                      }
                      style={{
                        color: "#333333",
                        fontSize: "15px",
                        fontWeight: "700",
                        fontFamily: "Proxima Nova",
                        width: "172px",
                        height: "34px",
                        border: "1px solid #666666",
                        borderRadius: "3px",
                      }}
                    >
                      Ask a Question{" "}
                    </OutlinedButton>
                    <div className={`${styles.IconsSocial}`}>
                      <div className="socilemedia">
                        {" "}
                        <SVG.Fb width="20px" />
                        <SVG.Insta width="20px" />
                        <SVG.Linkedin width="20px" />
                        <SVG.Twitter width="20px" />
                      </div>
                      <p className="socilemedia">
                        <SVG.Clip width="20px" /> TheEddieGallagher.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={12} className="pt-5 ps-3 activityList">
              <OptionsInput title="Upcoming Event">
                <Dropdown.Item href="#/action-1">
                  Latest Activity{" "}
                </Dropdown.Item>
                <Dropdown.Item href="#/action-2">
                  Completed Courses
                </Dropdown.Item>
                <Dropdown.Item href="#/action-3">
                  Community Updates
                </Dropdown.Item>
              </OptionsInput>
             { upcomingEvent.slice(0,2).map(item=>{
              return item.eventScheduledDateTime.map((value:IUpcomingCard )=>{
                return <ForumCardComponent
                Heading={item.name}
                Content={`${value.eventStartDate} - ${item.location}`}
                Description="View Course Page"
              />
              })
             }) }
             
              <FilledButtonComponent
                className={`${styles.upcomingEvents}`}
                style={{
                  width: "100%",
                  border: "1px solid #fff",
                  background: "transparent",
                  height: "34px",
                  borderRadius: "3px",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                  fontFamily: "Proxima Nova",
                  letterSpacing: "1px",
                }}
              >
                Browse All Upcoming Events
              </FilledButtonComponent>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default InstructorProfileLayout;
