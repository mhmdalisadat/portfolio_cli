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
    // Use absolute URL for server-side requests
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/blog`, {
      headers: {
        Accept: "application/json",
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
