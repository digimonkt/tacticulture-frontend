export type RemoteDataStatus = "success" | "failure";

export type ServerError = {
  status?: number;
  errors: any;
};

export type SuccessResult<T> = {
  remote: Extract<RemoteDataStatus, "success">;
  data: T;
};

export type ErrorResult = {
  remote: Extract<RemoteDataStatus, "failure">;
  error: ServerError;
};

export type GetListWithPagination<T> = {
  count: number;
  next?: string;
  previous?: string;
  results: T;
};
