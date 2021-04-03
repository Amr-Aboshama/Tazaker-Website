export class Users {
    public Id: number;
    public firstName: string;
    public lastName: string;
    public pwd: string;
    public email: string;
    public userName: string;
    public address: string;
    public birthDate: string;
    public confirmPassword: string;

    genders: Array<any> = ['Male', 'Female'];
    roles: Array<any> = ['Manager', 'Fan'];
    cities: Array<any> = ["Cairo", "Alexandria", "Aswan", "	Asyut", "	Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Ismailia", "Kafr El Sheikh", "Luxor", "Matruh", "Minya", "Monufia", "New Valley", "North Sinai", "Port Said", "Qalyubia", "Qena", "Red Sea", "Sharqia", "Sohag", "South Sinai", "Suez"];

    
    constructor(Id:number, username: string, fname: string, lname: string, pwd: string, confpwd: string, email: string, adr: string, bdate: string) {
        this.Id = Id;
        this.firstName = fname;
        this.lastName = lname;
        this.pwd = pwd;
        this.confirmPassword = confpwd;
        this.email = email;
        this.userName = username;
        this.address = adr;
        this.birthDate = bdate;
    }
}