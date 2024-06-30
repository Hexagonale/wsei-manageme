import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { User } from '../types';
import { UserAPI } from '.';

interface AuthAPI {
	login(email: string, password: string): Promise<User>;
	register(firstName: string, lastName: string, email: string, password: string): Promise<User>;
	logout(): Promise<void>;
}

export class AuthService implements AuthAPI {
	constructor(
		private readonly auth: Auth,
		private readonly usersRepository: UserAPI
	) {}

	async login(email: string, password: string): Promise<User> {
		const credentials = await signInWithEmailAndPassword(this.auth, email, password);

		return this.usersRepository.read(credentials.user.uid);
	}

	async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
		const credentials = await createUserWithEmailAndPassword(this.auth, email, password);

		return this.usersRepository.create({
			id: credentials.user.uid,
			email,
			firstName,
			lastName,
			role: 'developer',
		});
	}

	async logout(): Promise<void> {
		await signOut(this.auth);
	}
}
