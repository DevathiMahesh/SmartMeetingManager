import React, { useState, useEffect } from "react";
import MeetingDashboard from "./MeetingDashboard";
import CreateMeeting from "./CreateMeeting";
import "./styles.css";
import { Buidling } from "./smartmeeting.types";
import { fetchAllBuildings } from "./Apiclient";
import { Button } from "@material-ui/core";

export default function App() {
  const [buildingData, setBuildingData] = useState<Buidling[] | null>(null);
  const [showCreation, setShowCreation] = useState(false);

  useEffect(() => {
    fetchAllBuildings().then(setBuildingData);
  }, []);
  return (
    <div className="App">
      {!showCreation && (
        <>
          <MeetingDashboard buildingData={buildingData} />
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowCreation(true)}
          >
            Create New Meeting
          </Button>
        </>
      )}
      {showCreation && (
        <CreateMeeting
          buildingData={buildingData}
          setShowCreation={setShowCreation}
        />
      )}
    </div>
  );
}
