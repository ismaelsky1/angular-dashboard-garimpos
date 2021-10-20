import {Cbo} from '../cbo/cbo.model';
import {Salary} from '../salary/salary.model';
import {WorkHour} from '../work-hour/work-hour.model';
import {Company} from '../company/company.model';
import {JobStep} from './job-step.service';

export interface Job {
  id: string;
  title?: string;
  created_at?: Date;
  expirate_at?: Date;
  age_range_start?: number;
  age_range_end?: number;
  age_weight_start?: number;
  age_weight_end?: number;
  age_height_start?: number;
  age_height_end?: number;
  company_id?: any;
  cbo_id?: string;
  salary_id?: string;
  work_hour_id?: string;
  gender?: string;
  human_characteristics?: string;
  technical_characteristics?: string;
  experiences?: string;
  observations?: string;
  key_words?: any;
  active?: string;

  company?: Company;
  cbo?: Cbo;
  salary?: Salary;
  work_hour?: WorkHour;
  job_step?: JobStep[];
}

export interface JobResponse {
  data: Job;
  status: string;
  message: any[];
}

export interface JobsResponse {
  data: Job[];
  status: string;
  message: any[];
}
