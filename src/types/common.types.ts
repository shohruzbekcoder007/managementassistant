// Common Types - Shared across multiple modules

/**
 * Multi-language text support
 */
export interface MultiLangText {
  en?: string;
  ru?: string;
  uz?: string;
  [key: string]: string | undefined;
}

/**
 * Paginated Response - Generic type for paginated lists
 */
export interface PaginatedResponse<T> {
  page: number;
  size: number;
  total: number;
  items: T[];
}

/**
 * Pagination Query Parameters
 */
export interface PaginationParams {
  page?: number;
  limit?: number;
}

/**
 * Address Types
 */
export interface Address {
  uuid: string;
  name: MultiLangText;
  code: number;
  parent_id: string | null;
  parent?: Address | null;
  children?: Address[];
}

export interface CreateAddressRequest {
  name: MultiLangText;
  code: number;
  parent_id?: string;
}

export interface UpdateAddressRequest {
  name: MultiLangText;
  code: number;
  parent_id?: string;
}

export type AddressListResponse = PaginatedResponse<Address>;

/**
 * Category Types
 */
export interface Category {
  uuid: string;
  name: MultiLangText;
  description: MultiLangText;
}

export interface CreateCategoryRequest {
  name: MultiLangText;
  description: MultiLangText;
}

export interface UpdateCategoryRequest {
  name?: MultiLangText;
  description?: MultiLangText;
}

export type CategoryListResponse = PaginatedResponse<Category>;

/**
 * Company Types
 */
export interface Company {
  uuid: string;
  name: string;
  tax_id: string;
  mobile: string;
  email: string;
  parent_id: string | null;
  address_id: string;
  address?: Address | null;
  parent?: Company | null;
  children?: Company[];
}

export interface CreateCompanyRequest {
  name: string;
  tax_id: string;
  mobile: string;
  email: string;
  parent_id?: string;
  address_id: string;
}

export interface UpdateCompanyRequest {
  name?: string;
  tax_id?: string;
  mobile?: string;
  email?: string;
  parent_id?: string;
  address_id?: string;
}

export type CompanyListResponse = PaginatedResponse<Company>;
