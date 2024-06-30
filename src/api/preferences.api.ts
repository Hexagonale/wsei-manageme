import { collection, doc, getDoc, Firestore, setDoc } from 'firebase/firestore';

interface PreferencesAPI {
	setActiveProject(userId: string, projectId: string): Promise<void>;
	getActiveProject(userId: string): Promise<string | undefined>;
}

export class PreferencesRepository implements PreferencesAPI {
	constructor(private db: Firestore) {}

	private readonly collection = collection(this.db, 'preferences');

	async setActiveProject(userId: string, projectId: string): Promise<void> {
		const docRef = doc(this.collection, userId);
		await setDoc(docRef, { projectId }, { merge: true });
	}

	async getActiveProject(userId: string): Promise<string | undefined> {
		const docRef = doc(this.collection, userId);
		const docSnap = await getDoc(docRef);

		return docSnap.data()?.projectId;
	}
}
