const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface CompanyConfigType {
  id: number;
  domain: string;
}

const COMPANY_CONFIG: CompanyConfigType = {
  id: 25,
  domain: "findev.isatispooya.com",
};

export { API_URL, COMPANY_CONFIG };
