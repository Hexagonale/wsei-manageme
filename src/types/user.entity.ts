export type Role = 'admin' | 'devops' | 'developer';

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	role: Role;
}
