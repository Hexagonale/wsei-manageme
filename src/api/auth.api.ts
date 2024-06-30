import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, doc, setDoc, getDoc, Firestore } from 'firebase/firestore';
import { User } from '../types';

interface AuthAPI {
	login(email: string, password: string): Promise<User>;
	register(firstName: string, lastName: string, email: string, password: string): Promise<User>;
	logout(): Promise<void>;
}

export class AuthService implements AuthAPI {
	constructor(
		private readonly auth: Auth,
		private db: Firestore
	) {}

	private readonly collection = collection(this.db, 'users');

	async login(email: string, password: string): Promise<User> {
		const credentials = await signInWithEmailAndPassword(this.auth, email, password);

		const userDoc = doc(this.collection, credentials.user.uid);
		const user = await getDoc(userDoc);

		return { id: credentials.user.uid, ...user.data() } as User;
	}

	async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
		const credentials = await createUserWithEmailAndPassword(this.auth, email, password);

		const userDoc = doc(this.collection, credentials.user.uid);
		await setDoc(userDoc, { firstName, lastName, email });
		const user = await getDoc(userDoc);

		return { id: credentials.user.uid, ...user.data() } as User;
	}

	async logout(): Promise<void> {
		await signOut(this.auth);
	}
}
