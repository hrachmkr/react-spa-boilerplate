declare type ApiFactoryParams = {
  [x: string]: string | number
}

declare type ApiFactoryClassParams = {
  path: string
}

declare type IFetch = string | Request | Object

declare interface IAPIResponse<T> {
  status: number;
  message: string;
  data: T;
}
