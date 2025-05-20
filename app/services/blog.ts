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
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}
