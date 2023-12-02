import axios from "axios";

  export const templatesAPI = {
    async getTemplatesData(limit: number, offset: number, isMarked: string, filter?: string) {
      const res = await axios.get(filter ? `https://bb62-85-143-112-84.ngrok-free.app/image/search_image?limit=${limit}&offset=${offset}&filter=${filter}&is_marked${isMarked}` : `https://bb62-85-143-112-84.ngrok-free.app/image/search_image?limit=${limit}&offset=${offset}&is_marked${isMarked}`, {
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