export const BASE_URL = "http://127.0.0.1:8000";

export async function getToken() {
  try {
    const repsonse = await fetch(`${BASE_URL}/auth/jwt/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("refresh_token"),
      }),
    });
    return (await repsonse.json())["access"];
  } catch (error) {
    console.log(error);
    return "null";
  }
}
