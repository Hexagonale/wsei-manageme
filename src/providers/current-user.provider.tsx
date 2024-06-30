import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '.';

const CurrentUserContext = createContext<User | undefined>(undefined);

export const useCurrentUser = () => useContext(CurrentUserContext);

interface Props {
	children: ReactNode;
}

export const CurrentUserProvider: React.FC<Props> = ({ children }: Props) => {
	const navigate = useNavigate();
	const { auth } = useFirebase();
	const [user, setUser] = useState<User>();

	useEffect(() => {
		return onAuthStateChanged(auth, (user) => {
			setUser(user ?? undefined);

			if (!user) {
				navigate('/');
			}
		});
	}, []);

	return <CurrentUserContext.Provider value={user}>{children}</CurrentUserContext.Provider>;
};
