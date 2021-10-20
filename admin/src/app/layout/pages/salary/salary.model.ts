export interface Salary {
  id?: string;
  name?: string;
  active?: string;
}

export interface SalaryResponse {
  data: Salary[];
}
