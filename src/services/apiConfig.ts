import axios from "axios";

export const userAPI = axios.create({
  baseURL:"http://127.0.0.1:5001/texiclo/asia-south1/texiclo/api/",
  // baseURL: "https://jp-recruiter-api-btqulzzzoa-el.a.run.app/app",
});