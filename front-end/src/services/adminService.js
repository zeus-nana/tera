import ApiService from "./apiService.js";
import { API_CONFIG } from "./apiConfig.js";
import axios from "axios";

class AdminService {
  static instance = null;

  constructor() {}

  static getInstance() {
    if (!AdminService.instance) {
      AdminService.instance = new AdminService();
    }
    return AdminService.instance;
  }

  async getAllUsers() {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw new Error(
          `Erreur ${error.response.status}: ${error.response.statusText}`,
        );
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de récupérer la liste des utilisateurs. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async createUser(newUser) {
    try {
      return await ApiService.post(
        `${API_CONFIG.ENDPOINTS.ADMIN.USERS}`,
        newUser,
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw error;
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de créer l'utilisateur. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async getUserById(id) {
    try {
      return await ApiService.get(`${API_CONFIG.ENDPOINTS.ADMIN.USERS}/${id}`);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Si c'est une erreur Axios avec une réponse du serveur
        throw error;
      } else {
        // Pour les autres types d'erreurs
        throw new Error(
          "Impossible de sélectionner l'utilisateur. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async activateUser(id) {
    try {
      return await ApiService.post(
        `${API_CONFIG.ENDPOINTS.ADMIN.ACTIVATE_USER}/${id}`,
        { active: true },
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible d'activer l'utilisateur. Veuillez réessayer plus tard.",
        );
      }
    }
  }

  async deactivateUser(id) {
    try {
      return await ApiService.post(
        `${API_CONFIG.ENDPOINTS.ADMIN.DEACTIVATE_USER}/${id}`,
        { active: false },
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible de désactiver l'utilisateur. Veuillez réessayer plus tard.",
        );
      }
    }
  }
  
  async resetUserPassword(id) {
    try {
      return await ApiService.post(
        `${API_CONFIG.ENDPOINTS.ADMIN.RESET_USER_PASSWORD}/${id}`
      );
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw error;
      } else {
        throw new Error(
          "Impossible de définir le mot de passe. Veuillez réessayer plus tard.",
        );
      }
    }
  }
}

export default AdminService.getInstance();
