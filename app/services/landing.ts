import { API_URL } from "../api";

export interface LandingData {
  description: string;
  email: string;
  heroDescription: string;
  heroTitle: string;
  mobile: string;
}

export async function getLandingData(): Promise<LandingData | null> {
  try {
    const response = await fetch(`${API_URL}/api/landing/`, {
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
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
