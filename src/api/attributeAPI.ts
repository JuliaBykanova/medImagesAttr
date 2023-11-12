import axios from "axios";

  export const templatesAPI = {
    async getTemplatesData(limit: number, offset: number, filter?: string) {
      const res = await axios.get(filter ? `https://9500-85-143-112-90.ngrok-free.app/image/search_image?limit=${limit}&offset=${offset}&filter=${filter}` : `https://9500-85-143-112-90.ngrok-free.app/image/search_image?limit=${limit}&offset=${offset}`, {
          headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            "ngrok-skip-browser-warning": "69420", 
          }
        })
      return res.data;
    },
  };