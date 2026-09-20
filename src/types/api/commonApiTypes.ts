export interface APIGlobalErrorResponse<T = any> {
  status: number;
  success: boolean;
  message: string;
  data?: T | null;
  meta?: string | null;
  errors?: any | null;
}

export interface APIGetTemplate<T = any> {
  status: number;
  success: boolean;
  message: string;
  data: T;
  meta?: APIMetaData | null;
  errors?: string | null;
}

export interface APIMetaData {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
  firstItemOnPage: number;
  lastItemOnPage: number;
  sortBy: string | null;
  sortDirection: string | null;
}

export interface APIAttachment {
  id: string;
  fileName: string;
  extension: string; //TODO: transfer fo extensions list
  url: string;
  thumbnailUrl: string;
  size: number;
}
