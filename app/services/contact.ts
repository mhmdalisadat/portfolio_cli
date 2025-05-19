import { API_URL } from "../api";

export interface ContactReqType {
  name: string;
  email: string;
  message: string;
  phone: string;
}

export async function sendContactEmail(data: ContactReqType) {
  const response = await fetch(`${API_URL}/api/send-contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
