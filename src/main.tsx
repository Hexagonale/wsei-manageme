import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import {
	CreateProjectView,
	CreateStoryView,
	ProjectDetailsView,
	LoginView,
	ProjectsView,
	RegisterView,
	StoryDetailsView,
} from './views';
import { CurrentUserProvider, FirebaseProvider, MessageProvider, ThemeProvider } from './providers';

import './index.scss';

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root element not found');
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<ThemeProvider>
			<MessageProvider>
				<Router>
					<FirebaseProvider>
						<CurrentUserProvider>
							<Routes>
								<Route path="/" element={<Navigate to="/login" replace />} />
								<Route path="login" element={<LoginView />} />
								<Route path="register" element={<RegisterView />} />
								<Route path="projects" element={<ProjectsView />} />
								<Route path="projects/new" element={<CreateProjectView />} />
								<Route path="/projects/:projectId" element={<ProjectDetailsView />} />
								<Route path="/projects/:projectId/stories/new" element={<CreateStoryView />} />
								<Route path="/projects/:projectId/stories/:storyId" element={<StoryDetailsView />} />
							</Routes>
						</CurrentUserProvider>
					</FirebaseProvider>
				</Router>
			</MessageProvider>
		</ThemeProvider>
	</React.StrictMode>
);
