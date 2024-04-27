import { data } from "autoprefixer";
import { BASE_URL } from "../setting";
import { LoginPayLoad, UserPayLoad } from "./interface";

export default async function _Login(payload: LoginPayLoad) {
  try {
    const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    if (response.status == 200) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("refresh_token", data?.refresh);
      return 200;
    }
    return 500;
  } catch (err) {
    console.log(err);
    return 500;
  }
}
