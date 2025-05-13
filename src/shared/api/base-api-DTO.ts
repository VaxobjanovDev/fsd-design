export interface GetListResponse<T> {
  readonly list: T[]
  readonly content: T[]
  readonly count: number
}
