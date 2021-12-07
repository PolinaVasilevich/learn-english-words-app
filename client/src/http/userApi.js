import { $host, $authHost } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (formData) => {
  const { data } = await $host.post("api/user/registration", {
    ...formData,
  });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const login = async (formData) => {
  const { data } = await $host.post("api/user/login", {
    ...formData,
  });

  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};
