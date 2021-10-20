export interface State {
  id?: string;
  name?: string;
  initials?: string;
  active?: boolean;
}

export interface StateResponse {
  data: State[];
}
