import axios from "./axios";

export const authLogin = (nis, password) => {
  return axios.post("/login/siswa", {
    nis,
    password,
  });
};

export const logout = () => {
  return localStorage.clear();
};
