// src/components/WorkoutWrapper.js
import "./Workouts.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";
import { getAccessToken } from "../utils";

function WorkoutWrapper() {
  const [workoutList, setWorkoutList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getAllActivities() {
    try {
      const BEARER_TOKEN = await getAccessToken();
      const response = await Axios.get(
        "https://www.strava.com/api/v3/activities",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${BEARER_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching activities", error);
      setError("Failed to fetch activities");
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchActivities = async () => {
      const allActivitiesList = await getAllActivities();
      if (allActivitiesList) {
        setWorkoutList(allActivitiesList);
      }
      setLoading(false);
    };

    fetchActivities();
  }, []);

  return (
    <div className="workout-wrapper">
      <h1>MOJE TRENINGI:</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading &&
        workoutList.map((val, key) => (
          <div key={key} className={`workout-wrapper-background ${val.type}`}>
            <div className="workout-wrapper-details">
              <p>
                <span>RODZAJ SPORTU: {val.type}</span>
                <span>NAZWA TRENINGU: {val.name}</span>
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
