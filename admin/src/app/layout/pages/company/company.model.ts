export interface Company {
  id: string;
  user_id: string;
  name: string;
  fantasy_name: string;
  document: string;
  phone: string;
  email: string;
  street: string;
  district: string;
  city_id: string;
  zipcode: number;
  number: string;
  complement: string;
  reference: string;
  created_at: string;
  active: string;
}

export interface CompanyResponse {
  data: Company[];
}
