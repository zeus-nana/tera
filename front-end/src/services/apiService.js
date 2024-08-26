import axios from "axios";
import { API_CONFIG } from "./apiConfig.js"; // Notez le changement d'extension

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      withCredentials: true,
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        throw error;
      },
    );
  }

  get(url, config) {
    return this.api.get(url, config);
  }

  post(url, data, config) {
    return this.api.post(url, data, config);
  }

  // Ajoutez d'autres méthodes HTTP si nécessaire, en suivant le même modèle
}

export default new ApiService();
