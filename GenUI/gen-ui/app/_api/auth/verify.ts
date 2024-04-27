import { BASE_URL } from "../setting";

export async function verifyAccount(uid: string, token: string) {
  try {
    const response = fetch(`${BASE_URL}/auth/users/activation/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        token,
      }),
    });
    if ((await response).status == 204) return 200;
    return 500;
  } catch (err) {
    return 500;
  }
}
