import {User} from './user.model';

export class UserInfo{
    page!: {
        totalElements:number;
        totalPages:number;
    };
    _embedded!: {
        users:User[]
    };
    _links!:{
        first:string;
        last:string;
        prev:string;
        next:string;
        self:string;
    };
}