import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Buidling, MeetingRoom, Meeting } from "./smartmeeting.types";
import "./MeetingDashboard.scss";

type Props = {
  buildingData: Buidling[] | null;
};

export default function MeetingDashboard(props: Props) {
  const { buildingData } = props;
  const [active, setActive] = useState("today");
  const getFreeRoomsCount = (rooms: MeetingRoom[]) => {
    return rooms.filter((x) => x.isFree).length;
  };

  const getMeetingsForTimeline = (type: string) => {
    let filteredMeetings: Meeting[] = [];
    buildingData?.forEach((building) => {
      building?.meetings.forEach((meeting) => {
        if (
          type === "today" &&
          new Date().getDate() === new Date(meeting?.date).getDate()
        ) {
          filteredMeetings.push(meeting);
        } else if (
          type === "now" &&
          new Date().toTimeString().split(" ")[0] >= meeting?.startTime &&
          new Date().toTimeString().split(" ")[0] <= meeting?.endTime
        ) {
          filteredMeetings.push(meeting);
        } else if (type === "total") {
          filteredMeetings.push(meeting);
        }
      });
    });
    return filteredMeetings;
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <div className="dashboard-container">
        <div className="left-section">
          <div className="overview-section">
            <div className="card-section">
              <h2>Buildings</h2>
              <hr />
              <h4>Total: {buildingData?.length}</h4>
              {buildingData?.map((item) => {
                return <p style={{ color: "blue" }}>{item.name}</p>;
              })}
            </div>
            <div className="card-section">
              <h2>Meetings</h2>
              <hr />
              <h4>
                Total {getMeetingsForTimeline("total")?.length} Meetings
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: "8px", fontWeight: "bold" }}
                  onClick={() => setActive("total")}
                >
                  Show All
                </Button>
              </h4>
              <h4>
                Total {getMeetingsForTimeline("today")?.length} Today{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: "8px", fontWeight: "bold" }}
                  onClick={() => setActive("today")}
                >
                  Today
                </Button>
              </h4>
              <h4>
                Total {getMeetingsForTimeline("now")?.length} Going On Now{" "}
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginLeft: "8px", fontWeight: "bold" }}
                  onClick={() => setActive("now")}
                >
                  Live
                </Button>
              </h4>
            </div>
          </div>
        </div>
        <div className="right-section">
          <div className="card-section">
            <h2>Rooms</h2>
            <hr />
            <div>
              {buildingData?.map((building) => {
                return (
                  <div>
                    <h3>
                      Buidling Name:{" "}
                      <span className="item-value">{building.name}</span>{" "}
                    </h3>
                    <h4>
                      Total Rooms:{" "}
                      <span className="item-value">
                        {building.meetingRooms.length}
                      </span>
                    </h4>
                    <h4>
                      Free Now:{" "}
                      <span className="item-value">
                        {getFreeRoomsCount(building?.meetingRooms)}
                      </span>
                    </h4>
                    <hr />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="meetings-container">
        <h2>
          {active === "total"
            ? "List Of Meetings"
            : active === "today"
            ? "Today Meetings"
            : "Live Meetings"}
        </h2>
        <div className="meetings-section">
          {getMeetingsForTimeline(active)?.map((item) => {
            return (
              <div className="meet-item">
                <h2>{item.title}</h2>
                <p className="para">Date: {item.date}</p>
                <p className="para">
                  Timing: {item.startTime + " - " + item.endTime}
                </p>
                <p className="para">Host: {item?.host?.name}</p>
                <p className="para">
                  Attendees : {item.attendees.map((x) => x.name).join(",")}{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
