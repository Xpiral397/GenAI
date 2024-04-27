import { BASE_URL, getToken } from "../setting";

export async function loadChatForMathAI(topic: string) {
  try {
    const value = await fetch(`${BASE_URL}/get/chats/all/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${await getToken()}`,
      },
    });
    if (value.status == 200) {
      return await value.json();
    } else {
      return "NO Data";
    }
  } catch (err) {
    console.log(err);
    return "Not Valid";
  }
}
