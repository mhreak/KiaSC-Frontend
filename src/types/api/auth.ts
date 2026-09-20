export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  roles: string[];
  token?: string;
}
