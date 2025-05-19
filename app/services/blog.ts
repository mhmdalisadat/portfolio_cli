import { API_URL } from "../api";

export interface BlogData {
  description: string;
  email: string;
  location: string;
  techDesc: string;
  techTitle: string;
  title: string;
}

export async function getBlogData(): Promise<BlogData | null> {
  try {
    const response = await fetch(`${API_URL}/api/blog/`, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Failed to fetch landing data");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching landing data:", error);
    return null;
  }
}
