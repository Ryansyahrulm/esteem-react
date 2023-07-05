import axios from "./axios";

export const getUser = () => {
  return axios.get("/siswa/profile", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const getAttendance = () => {
  return axios.get("/kehadiran/history", {
    headers: {
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const attendanceIn = (formData) => {
  return axios.post("/kehadiran", formData, {
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};

export const attendanceOut = (formData) => {
  return axios.put("/kehadiran", formData, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.token}`,
    },
  });
};
