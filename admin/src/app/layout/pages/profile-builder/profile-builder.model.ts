import {Company} from '../company/company.model';
import {Cbo} from '../cbo/cbo.model';
import {Salary} from '../salary/salary.model';
import {WorkHour} from '../work-hour/work-hour.model';
import {City} from '../city/city.model';

export interface ProfileBuilder {
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
  city_id?: string;
  work_hour_id?: string;
  gender?: string;
  human_characteristics?: string;
  technical_characteristics?: string;
  experiences?: string;
  observations?: string;
  key_words?: any;
  active?: string;

  company?: Company;
  city?: City;
  cbo?: Cbo;
  salary?: Salary;
  work_hour?: WorkHour;
}

export interface ProfileBuilderResponse {
  data: ProfileBuilder;
  status: string;
  message: any[];
}

export interface ProfileBuildersResponse {
  data: ProfileBuilder[];
  status: string;
  message: any[];
}
