import api from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../models/IUser";
import { UpdateResponse } from "../models/response/UserResponse";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return api.get<IUser[]>("/users");
  }
  static fetchUser(id: number): Promise<AxiosResponse<IUser>> {
    return api.get<IUser>(`/user/${id}`);
  }
  static blockUser(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/users/${id}`, { status: "blocked" });
  }
  static unblockUser(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.put<UpdateResponse>(`/users/${id}`, { status: "active" });
  }
  static deleteUser(id: number): Promise<AxiosResponse<UpdateResponse>> {
    return api.delete<UpdateResponse>(`/users/${id}`);
  }
}
