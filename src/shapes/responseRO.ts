export interface ReturnValue<T> {
  statusCode: number;
  message?: string | [];
  data?: T;
  trace?: unknown;
}
