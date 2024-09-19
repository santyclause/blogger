import { Account } from "@/models/Account.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"


class UsersService {
  async getUserById(userId) {
    AppState.activeProfile = null;
    const response = await api.get(`/api/profiles/${userId}`)
    const newActiveUser = new Account(response.data)
    AppState.activeProfile = newActiveUser;    
  }
}

export const usersService = new UsersService()