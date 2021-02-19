export interface ISelect {
  value: number | string;
  label: string;
}

export interface IAPI {
  route: string;
  method: string;
  name: string;
  group: string;
}

export interface IRequest {
  isLoading: boolean;
  isError: boolean;
}

interface IAdditional {
  field: string;
  value: string;
}
export interface IForm {
  api: string;
  additionalFilters: IAdditional[];
}