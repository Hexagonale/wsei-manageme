import { message } from 'antd';
import { AuthService, PreferencesRepository, UsersRepository } from '../../api';
import { useFirebase } from '../../providers/firebase.provider';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
	const navigate = useNavigate();
	const { auth, firestore } = useFirebase();
	const usersRepository = new UsersRepository(firestore);
	const authService = new AuthService(auth, usersRepository);
	const preferencesRepository = new PreferencesRepository(firestore);

	const login = async (email: string, password: string) => {
		try {
			const user = await authService.login(email, password);
			const projectId = await preferencesRepository.getActiveProject(user.id);

			message.success('Login successful');

			if (!projectId) {
				navigate('/projects');
			} else {
				navigate(`/projects/${projectId}`);
			}
		} catch (error) {
			message.error('Failed to login');

			console.error(error);
		}
	};

	return {
		login,
	};
};
