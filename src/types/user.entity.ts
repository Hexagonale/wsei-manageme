export type Role = 'admin' | 'devops' | 'developer';

export interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: Role;
}
