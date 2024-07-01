import { User } from '../types/user.entity';
import { collection, doc, setDoc, getDoc, deleteDoc, getDocs, Firestore } from 'firebase/firestore';
import { removeUndefinedKeys } from '../utils';

export interface UserAPI {
	create(user: User): Promise<User>;
	read(id: string): Promise<User>;
	update(user: User): Promise<User>;
	delete(id: string): Promise<void>;
	list(): Promise<User[]>;
}

export class UsersRepository implements UserAPI {
	constructor(private readonly db: Firestore) {}

	private readonly collection = collection(this.db, 'users');

	async create(user: User): Promise<User> {
		const userDoc = doc(this.collection);
		await setDoc(userDoc, { ...user, id: userDoc.id });

		return { ...user, id: userDoc.id };
	}

	async read(id: string): Promise<User> {
		const userDoc = doc(this.collection, id);
		const userSnap = await getDoc(userDoc);
		if (!userSnap.exists()) {
			throw new Error(`User with id ${id} not found`);
		}

		return userSnap.data() as User;
	}

	async update(user: Pick<User, 'id'> & Partial<User>): Promise<User> {
		removeUndefinedKeys(user);

		const userDoc = doc(this.collection, user.id);
		await setDoc(userDoc, user);

		return this.read(user.id);
	}

	async delete(id: string): Promise<void> {
		const userDoc = doc(this.collection, id);
		await deleteDoc(userDoc);
	}

	async list(): Promise<User[]> {
		const userSnaps = await getDocs(this.collection);

		return userSnaps.docs.map((doc) => doc.data() as User);
	}
}
