import { BASE_URL } from "../setting";

export async function Logout() {
  localStorage.removeItem("refresh_token");
}
