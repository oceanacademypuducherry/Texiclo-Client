import axios from "axios";

export const userAPI = axios.create({
  // baseURL:"http://127.0.0.1:5001/texiclo-8b211/asia-south1/texiclo_client_api/api",
  // baseURL: "https://jp-recruiter-api-btqulzzzoa-el.a.run.app/app",
    baseURL:"https://texiclo-client-api-szkqgxi2aq-el.a.run.app/api",
});