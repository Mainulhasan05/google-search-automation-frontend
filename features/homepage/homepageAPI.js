import axiosInstance from "../../utils/axiosInstance";

// const loadData = async () => {
//   const res = await axiosInstance.get("/data");
//   setData(res.data);
// };

export const loadHomeData = async () => {
  const res = await axiosInstance.get("/api/dashboard");
  return res.data;
};

export const loadProfileList = async (page=1) => {
  const res = await axiosInstance.get("/api/profile"+"?page=" + page);
  return res.data;
};

export const deleteProfile = async (id) => {
  const res = await axiosInstance.delete(`/api/profile/${id}`);
  return res.data;
};

export const editProfile = async (id) => {
  const res = await axiosInstance.put(`/api/profile/${id}`);
  return res.data;
};

