export interface IUserCreate {
  name: string;
  email: string;
  phone: string;
  password: string;
  idMinistry?: number;
  isAdmin?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
