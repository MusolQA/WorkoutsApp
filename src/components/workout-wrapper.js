import "./Workouts.css";
import Axios from "axios";
import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REFRESH_TOKEN,
} from "../config/config";

function WorkoutWrapper() {
  const [workoutList, setWorkoutList] = useState([]);
  const BEARER_TOKEN = useRef("");

  useEffect(() => {
    Axios.post(
      `https://www.strava.com/api/v3/oauth/token?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${REACT_APP_REFRESH_TOKEN}`,
      {}
    )
      .then((response) => {
        BEARER_TOKEN.current = response.data.access_token;
      })
      .then(() => {
        Axios.get("https://www.strava.com/api/v3/activities", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN.current}`,
          },
        }).then((response) => {
          setWorkoutList(response.data);
        });
      }, []);
  }, []);

  return (
    <div className="workout-wrapper">
      <h1>MOJE TRENINGI:</h1>
      <h1>Hello ${REACT_APP_CLIENT_ID}</h1>
      {workoutList.map((val, key) => {
        return (
          <div className={`workout-wrapper-background ${val.type}`}>
            <div className="workout-wrapper-details">
              <p>
                <p> RODZAJ SPORTU: {val.type} </p>
                <p> NAZWA TRENINGU: {val.name}</p>
                <p>
                  DATA ROZPOCZECIA:{" "}
                  {val.start_date_local.replace("T", " ").replace("Z", " ")}
                </p>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default WorkoutWrapper;
