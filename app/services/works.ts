import { API_URL } from "../api";

export interface WorksData {
  category: string;
  company: string;
  description: string;
  endYear: string;
  startYear: string;
  title: string;
}

export async function getWorksData(): Promise<WorksData | null> {
  try {
    const response = await fetch(`${API_URL}/api/works/`, {
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
