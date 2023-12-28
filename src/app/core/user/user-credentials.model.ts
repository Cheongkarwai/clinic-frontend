import { User } from "./user.model";

export class UserCredentials extends User{
    accessToken:string = '';
    refreshToken:string = '';

}