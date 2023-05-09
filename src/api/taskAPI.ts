import { instance } from ".";
import { TUpdateTask } from "../types/index.type";

export const taskAPI = {
  getAllTasks: () => {
    return instance.get(`task`)
      .then(res => res.data);
  },

  createTask: (createBody: TUpdateTask) => {
    return instance.post(`task`, createBody)
      .then(res => res.data);
  },

  updateTask: (id: string, updateBody: TUpdateTask) => {
    return instance.put(`task/${id}`, updateBody)
      .then(res => res.data);
  },

  deleteTask: (id: string) => {
    return instance.delete(`task/${id}`)
      .then(res => res.data);
  },
}