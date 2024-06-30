import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { createContext, useContext } from 'react';

const firebaseConfig = {
	apiKey: 'AIzaSyCr_jB123G_wLYvVWVanR1_G2MyLBCk99w',
	authDomain: 'rbrzegowy-bca66.firebaseapp.com',
	projectId: 'rbrzegowy-bca66',
	storageBucket: 'rbrzegowy-bca66.appspot.com',
	messagingSenderId: '570288000725',
	appId: '1:570288000725:web:8ef13754a28c7ae6149c5c',
	measurementId: 'G-LS0DVN8WB2',
} as const;

interface FirebaseContextType {
	app: FirebaseApp;
	auth: Auth;
	firestore: Firestore;
}
const FirebaseContext = createContext<FirebaseContextType>({} as FirebaseContextType);

interface Props {
	children: React.ReactNode;
}

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
	const app = initializeApp(firebaseConfig);

	const contextValue: FirebaseContextType = {
		app,
		auth: getAuth(app),
		firestore: getFirestore(app),
	};

	return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};

export const useFirebase = () => useContext(FirebaseContext);
