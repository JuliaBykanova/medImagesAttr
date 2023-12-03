import axios from "axios";

const API_BASE_URL = "http://64.23.136.87:8000";

  export const templatesAPI = {
    async getTemplatesData(limit: number, offset: number, isMarked: string, filter?: string) {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(filter ? `${API_BASE_URL}/image/search_image?limit=${limit}&offset=${offset}&filter=${filter}&is_marked${isMarked}` : `${API_BASE_URL}/image/search_image?limit=${limit}&offset=${offset}&is_marked${isMarked}`, {
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "ngrok-skip-browser-warning": "69420", 
            Authorization: `Bearer ${token}`,
          }
        })
      return res.data;
    },

    async postTemplatesData(name: string, body: any) {
      const token = localStorage.getItem("accessToken");
      const res = axios.post(`${API_BASE_URL}/image/update/${name}`, body, {
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "ngrok-skip-browser-warning": "69420", 
            Authorization: `Bearer ${token}`,
          }
        })
      return res;
    },
  };