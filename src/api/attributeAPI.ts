import axios from "axios";

  export const templatesAPI = {
    async getTemplatesData(limit: number, offset: number) {
      const res = await axios.get(`/api/templates/v1/templates/list?limit=${limit}&offset=${offset}`, {
          headers: {
            "accept": "application/json",
          }
        })
      return res.data;
    },
  };