export interface WorkHour {
  id?: string;
  name?: string;
  active?: string;
}

export interface WorkHourResponse {
  data: WorkHour[];
}
