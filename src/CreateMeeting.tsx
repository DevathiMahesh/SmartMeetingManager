import React, { useState } from "react";
import { Buidling, Attendee, Meeting, MeetingRoom } from "./smartmeeting.types";
import { attendees, addMeeting } from "./Apiclient";
import { createStyles, makeStyles, useTheme } from "@material-ui/core/styles";
import {
  TextField,
  NativeSelect,
  Select,
  Input,
  MenuItem,
  InputLabel,
  Chip,
  Button
} from "@material-ui/core";
import "./MeetingContainer.scss";

let meetInc = 4;
const generateId = () => "meet" + meetInc++;
const useStyles = makeStyles((theme: any) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300
    },
    chips: {
      display: "flex",
      flexWrap: "wrap"
    },
    chip: {
      margin: 2
    },
    noLabel: {
      marginTop: theme.spacing(3)
    }
  })
);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};
type Props = {
  buildingData: Buidling[] | null;
  setShowCreation: (value: boolean) => void;
};

export default function CreateMeeting(props: Props) {
  const { buildingData, setShowCreation } = props;
  const buildingOptions = [
    { buildingId: "bd1", name: "Nexus" },
    { buildingId: "bd2", name: "Pheonix" },
    { buildingId: "bd3", name: "Arena" }
  ];
  const [formData, setFormData] = useState<Meeting>({
    id: generateId(),
    title: "",
    meetingRoomId: "",
    host: attendees[0],
    date: "",
    startTime: "",
    endTime: "",
    buildingId: buildingOptions[0].buildingId,
    attendees: [attendees[0]]
  });
  const [freeRooms, setFreeRooms] = useState<MeetingRoom[] | null | undefined>(
    null
  );
  const theme = useTheme();
  const classes = useStyles(theme);
  const handleSelectedAttendees = (
    event: React.ChangeEvent<{ value: any }>
  ) => {
    const value: Attendee[] = attendees.filter((x) =>
      event.target.value.includes(x.name)
    );
    setFormData((prevData) => ({ ...prevData, attendees: value }));
  };

  const handleRoomSelection = (roomid: string) => {
    let elements = document.querySelectorAll(".rooms-section");
    elements?.forEach((elem) => {
      if (elem?.id !== roomid) {
        elem?.classList.remove("selected");
      } else {
        elem?.classList.add("selected");
      }
    });
    setFormData((prevData) => ({ ...prevData, meetingRoomId: roomid }));
  };

  function getStyles(name: string, attendees: Attendee[], theme: any) {
    return {
      fontWeight: theme.typography.fontWeightMedium
    };
  }

  const getFreeRoomsOfBuilding = () => {
    let building = buildingData?.find((x) => x.id === formData.buildingId);
    console.log(building?.meetingRooms);
    let freeMeetingRooms:
      | MeetingRoom[]
      | null
      | undefined = building?.meetingRooms?.filter(
      (room) =>
        room.availableSlots.findIndex(
          (x) =>
            x.startTime <= formData.startTime &&
            x.endTime >= formData.endTime &&
            new Date(x.date).getDate() === new Date(formData.date).getDate()
        ) !== -1
    );
    setFreeRooms(freeMeetingRooms);
  };

  return (
    <>
      {!freeRooms ? (
        <div className="meeting-container">
          <form noValidate className="form-container">
            <h2 style={{ marginTop: "-16px" }}>Schedule Meet </h2>

            <TextField
              id="title"
              label="Title"
              value={formData.title}
              type="text"
              placeholder="Enter the title..."
              InputLabelProps={{
                shrink: true
              }}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  title: e.target.value
                }))
              }
            />
            <TextField
              id="date"
              label="Date"
              type="date"
              InputLabelProps={{
                shrink: true
              }}
              value={formData.date}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  date: e.target.value
                }))
              }
            />
            <TextField
              id="time"
              label="Start Time"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              value={formData.startTime}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  startTime: e.target.value
                }))
              }
            />
            <TextField
              id="time"
              label="End Time"
              type="time"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 300 // 5 min
              }}
              value={formData.endTime}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  endTime: e.target.value
                }))
              }
            />
            <InputLabel
              style={{
                textAlign: "left",
                marginBottom: "-16px",
                fontSize: "12px"
              }}
            >
              Building
            </InputLabel>
            <NativeSelect
              defaultValue={buildingOptions[0].buildingId}
              inputProps={{
                name: "building",
                id: "building-native"
              }}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  buildingId: e.target.value
                }))
              }
            >
              {buildingOptions.map((building) => {
                return (
                  <option value={building.buildingId}>{building.name}</option>
                );
              })}
            </NativeSelect>
            <InputLabel
              style={{
                textAlign: "left",
                marginBottom: "-16px",
                fontSize: "12px"
              }}
            >
              Host
            </InputLabel>
            <NativeSelect
              defaultValue={attendees[0].id}
              inputProps={{
                name: "host",
                id: "host-native"
              }}
              onChange={(e) => {
                setFormData((prevData) => ({
                  ...prevData,
                  host:
                    attendees.find((x) => x.id === e.target.value) ??
                    attendees[0]
                }));
              }}
            >
              {attendees.map((item: Attendee) => {
                return <option value={item.id}>{item.name}</option>;
              })}
            </NativeSelect>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={formData.attendees.map((x) => x.name)}
              onChange={handleSelectedAttendees}
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {(selected as string[]).map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {attendees?.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.name}
                  style={getStyles(item.name, attendees, theme)}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </form>
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="outlined"
              style={{ marginRight: "16px" }}
              color="primary"
              onClick={() => {
                setShowCreation(null);
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                getFreeRoomsOfBuilding();
              }}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div className="free-rooms-container">
          <h2>Available Free Rooms</h2>
          {freeRooms?.map((room) => {
            return (
              <div
                className={`rooms-section ${
                  formData.meetingRoomId === room.id ? "selected" : ""
                }`}
                onClick={() => handleRoomSelection(room.id)}
                id={room.id}
              >
                <h3>{room.name}</h3>
                <h4>Floor: {room.floor}</h4>
                <h4>
                  Slot: {formData.startTime} {formData.endTime}
                </h4>
              </div>
            );
          })}
          {freeRooms?.length === 0 && (
            <p style={{ marginBottom: "30px" }}>No Rooms Available.</p>
          )}
          <div>
            <Button
              variant="outlined"
              style={{ marginRight: "16px" }}
              color="primary"
              onClick={() => {
                setFreeRooms(null);
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setFreeRooms(null);
                setShowCreation(false);
                addMeeting(formData);
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
