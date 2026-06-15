import Resume from "../components/resume";

export const dynamic = "auto";
export const revalidate = 3600; 

export default function ResumePage() {
  return <Resume />;
}
