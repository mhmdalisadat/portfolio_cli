import { getBlogData, getLandingData, getWorksData } from "@/app/services";
import { LandingClient } from "./landing/LandingClient";

const Landing = async () => {
  const data = await getLandingData();

  return <LandingClient data={data} />;
};

export default Landing;
