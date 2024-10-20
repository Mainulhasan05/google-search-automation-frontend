import axiosInstance from "../../utils/axiosInstance";
import toast from "react-hot-toast";
export const getTasks = async (page=1) => {
  const response = await axiosInstance.get("/api/tasks?page=" + page);
  return response.data;
};

export const createTaskAPI = async (task) => {
  try {
    const response = await axiosInstance.post("/api/tasks", task);
    return response.data;
  } catch (error) {
    console.log("error", error);
    toast.error(error?.response?.data?.message);
  }
};

// delete task
export const deleteTaskAPI = async (taskId) => {
  try {
    const response = await axiosInstance.delete(`/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

// get task list
export const getTaskListAPI = async (taskListId) => {
  try {
    const response = await axiosInstance.get(
      `/api/tasks/${taskListId}/task-lists`
    );
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

// execute task /api/automation/id
export const executeTaskAPI = async (taskId) => {
  try {
    const response = await axiosInstance.post(`/api/automation/${taskId}`);
    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
