import { API_URL , COMPANY_CONFIG } from "@/app/api";

const getCompany: () => Promise<any> = async () => {
  const response = await fetch(`${API_URL}/website/base-company-info/${COMPANY_CONFIG.id}/`);
  const data = await response.json();
  return data;
};

const getSupProducts: () => Promise<any> = async () => {
  const response = await fetch(`${API_URL}/website/SupProducts/${COMPANY_CONFIG.id}/`);
  const data = await response.json();
  return data;
};

export { getCompany, getSupProducts };
