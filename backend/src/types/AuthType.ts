export interface IAuthRequest extends Request {
  user_id: number;
  idMinistryToken: number;
  isAdmin: boolean;
}
