import Resume from "../components/resume";

// Enable static generation for better performance
export const dynamic = "auto";
export const revalidate = 3600; // Revalidate every hour

export default function ResumePage() {
  return <Resume />;
}
