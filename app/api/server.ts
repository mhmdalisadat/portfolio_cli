const API_URL = "http://192.168.10.64:1296";

interface CompanyConfigType {
  id: number;
  domain: string;
}

const COMPANY_CONFIG: CompanyConfigType = {
  id: 25,
  domain: "findev.isatispooya.com",
};

export { API_URL, COMPANY_CONFIG };
