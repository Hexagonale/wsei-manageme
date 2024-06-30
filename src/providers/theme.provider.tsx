import { ConfigProvider, theme } from 'antd';
import React, { ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react';

export enum Theme {
	DARK = 'dark',
	LIGHT = 'light',
}

const getThemeByName = (name: string | null) => {
	switch (name) {
		case Theme.LIGHT:
			return Theme.LIGHT;

		case Theme.DARK:
		default:
			return Theme.DARK;
	}
};

interface ThemeManager {
	currentTheme: Theme;
	changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeManager>({
	currentTheme: Theme.DARK,
	changeTheme: () => {},
});

interface Props {
	children: ReactNode;
}

const { defaultAlgorithm, darkAlgorithm } = theme;

export const ThemeProvider: React.FC<Props> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>(getThemeByName(localStorage.getItem('theme')));

	const themeManager: ThemeManager = {
		currentTheme: theme,
		changeTheme: (theme: Theme) => setTheme(theme),
	};

	const algorithm = useMemo(() => {
		switch (theme) {
			case Theme.DARK:
				return darkAlgorithm;

			case Theme.LIGHT:
				return defaultAlgorithm;
		}
	}, [theme]);

	useEffect(() => {
		localStorage.setItem('theme', theme);

		switch (theme) {
			case Theme.DARK:
				document.documentElement.style.setProperty('--bg-color', '#111d2c');
				document.documentElement.style.setProperty('--bg-editable-text', 'rgba(255, 255, 255, 0.15)');
				break;

			case Theme.LIGHT:
				document.documentElement.style.setProperty('--bg-color', '#f0f2f5');
				document.documentElement.style.setProperty('--bg-editable-text', 'rgba(0, 0, 0, 0.15)');
				break;
		}
	}, [theme]);

	return (
		<ThemeContext.Provider value={themeManager}>
			<ConfigProvider
				theme={{
					algorithm,
					token: {
						fontFamily: 'Montserrat, sans-serif',
					},
				}}
			>
				{children}
			</ConfigProvider>
		</ThemeContext.Provider>
	);
};

export const useThemeManager = () => useContext(ThemeContext);
