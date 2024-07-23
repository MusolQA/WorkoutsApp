// src/utils.js
import Axios from "axios";
import {
  REACT_APP_CLIENT_ID,
  REACT_APP_CLIENT_SECRET,
  REACT_APP_REFRESH_TOKEN,
} from "./config/config.js";

export async function getAccessToken() {
  try {
    const response = await Axios.post(
      `https://www.strava.com/api/v3/oauth/token`,
      {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: REACT_APP_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: REACT_APP_REFRESH_TOKEN,
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token", error);
    throw error;
  }
}
