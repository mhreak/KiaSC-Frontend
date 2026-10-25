export interface APIGlobalErrorResponse<T = any> {
  Success: boolean;
  Data: T;
  MessageList: string[];
}
export interface APIAddTemplateResponse<T = any> {
  Success: boolean;
  Data: T;
  MessageList: string[];
}

export interface APIGetTemplate<T = any> {
  // status: number;
  // success: boolean;
  // message: string;
  // data: T;
  // meta?: APIMetaData | null;
  // errors?: string | null;
  Items: T;
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  TotalPages: number;
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

export interface BaseParams {
  PageNumber?: number;
  PageSize?: number;
  SortField?: string;
  SortDirection?: string;
}
