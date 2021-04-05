import { reserved } from './reserved';

export class User{

username : string;
Password: string;
first_name: string;
last_name: string;
birthdate: string;
gender: string;
city: string;
address: string;
email: string;
id : number; //id is the role {0 => 'Admin', 1 => 'Manager' , 2 => 'Fan'}
role: string;

tickets: reserved[];

}
