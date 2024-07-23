import "./Workouts.css";
import Axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REFRESH_TOKEN,
} from "../config/config";

function WorkoutWrapper() {
  const [workoutList, setWorkoutList] = useState([]);

  //TODO: Move it to utils
  async function getAccessToken() {
    const accessToken = await Axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REACT_APP_REFRESH_TOKEN}`,
      {}
    );
    return accessToken.data.access_token;
  }

  async function getAllActivities() {
    const BEARER_TOKEN = await getAccessToken();
    const allActivities = await Axios.get(
      "https://www.strava.com/api/v3/activities",
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    return allActivities.data;
  }

  useEffect(() => {
    const fetchActivities = async () => {
      const allActivitiesList = await getAllActivities();
      setWorkoutList(allActivitiesList);
    };

    fetchActivities();
  }, []);

  return (
    <div className="workout-wrapper">
      <h1>MOJE TRENINGI:</h1>
      {workoutList.map((val, key) => (
        <div key={key} className={`workout-wrapper-background ${val.type}`}>
          <div className="workout-wrapper-details">
            <p>
              <span> RODZAJ SPORTU: {val.type} </span>
              <span> NAZWA TRENINGU: {val.name}</span>
              <span>
                DATA ROZPOCZECIA:{" "}
                {val.start_date_local.replace("T", " ").replace("Z", " ")}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutWrapper;
