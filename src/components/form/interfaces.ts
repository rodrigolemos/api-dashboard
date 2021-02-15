export interface ISelect {
  value: number | string;
  label: string;
}

export interface IAPI {
  api: string;
  rota: string;
  representante: string;
  login_cri: string;
  name: string;
  group: string;
}

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}
