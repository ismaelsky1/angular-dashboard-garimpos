import {State} from '../state/state.model';

export interface City {
  id?: string;
  name?: string;
  state_id?: string;
  active?: boolean;

  state?: State;
}

export interface CityResponse {
  data: City[];
}
