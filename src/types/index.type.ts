export type TTask = {
  _id?: string;
  title: string,
  address: string,
  status: string,
  role: string,
  sum: number
}

export type TSuccessPromise = {
  success: boolean;
  data: any;
}

export type TUpdateTask = {
  title?: string,
  address?: string,
  status?: string,
  role?: string,
  sum?: number
}

export type TFilters = {
  title: string;
  status: string;
  role: string;
}