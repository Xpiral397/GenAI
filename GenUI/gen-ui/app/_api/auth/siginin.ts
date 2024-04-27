import { BASE_URL } from "../setting";
import { LoginPayLoad, UserPayLoad } from "./interface";

export async function Signup(payload: UserPayLoad) {
  console.log(payload);
  try {
    const response = await fetch(`${BASE_URL}/auth/users/`, {
      method: "POST",
      // mode: "no-cors",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(payload),
    });
    if (response.status == 201) return 200;
    return 500;
  } catch (err) {
    console.log(err, "2");
    return 500;
  }
}
