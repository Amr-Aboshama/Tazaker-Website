import { seat } from './seat';
export class User{

username : string;
Password: string;
first_name: string;
last_name: string;
Birth_date: Date;
Gender: string;
city: string;
Address: string;
email: string;
id : number; //id is the role {0 => 'Admin', 1 => 'Manager' , 2 => 'Fan'}
role: string;


}
