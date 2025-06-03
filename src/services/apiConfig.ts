import axios from "axios";

export const userAPI = axios.create({
  baseURL:"localhost:3000/api",
  // baseURL: "https://jp-recruiter-api-btqulzzzoa-el.a.run.app/app",
});