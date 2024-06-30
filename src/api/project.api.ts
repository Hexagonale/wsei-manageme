import { Project } from '../types/project.entity';
import { collection, doc, setDoc, getDoc, deleteDoc, getDocs, Firestore } from 'firebase/firestore';

export interface ProjectAPI {
	create(project: Project): Promise<Project>;
	read(id: string): Promise<Project>;
	update(project: Project): Promise<Project>;
	delete(id: string): Promise<void>;
	list(): Promise<Project[]>;
}

export class ProjectsRepository implements ProjectAPI {
	constructor(private readonly db: Firestore) {}

	private readonly collection = collection(this.db, 'projects');

	async create(project: Project): Promise<Project> {
		const projectDoc = doc(this.collection);
		await setDoc(projectDoc, { ...project, id: projectDoc.id });

		return { ...project, id: projectDoc.id };
	}

	async read(id: string): Promise<Project> {
		const projectDoc = doc(this.collection, id);
		const projectSnap = await getDoc(projectDoc);
		if (!projectSnap.exists()) {
			throw new Error(`Project with id ${id} not found`);
		}

		return projectSnap.data() as Project;
	}

	async update(project: Project): Promise<Project> {
		const projectDoc = doc(this.collection, project.id);
		await setDoc(projectDoc, project);

		return project;
	}

	async delete(id: string): Promise<void> {
		const projectDoc = doc(this.collection, id);
		await deleteDoc(projectDoc);
	}

	async list(): Promise<Project[]> {
		const projectSnaps = await getDocs(this.collection);

		return projectSnaps.docs.map((doc) => doc.data() as Project);
	}
}
