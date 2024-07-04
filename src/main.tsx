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
	CreateTaskView,
	TaskDetailsView,
	NotificationsView,
} from './views';
import {
	CurrentUserProvider,
	FirebaseProvider,
	MessageProvider,
	NotificationsProvider,
	ThemeProvider,
} from './providers';

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
							<NotificationsProvider>
								<Routes>
									<Route path="/" element={<Navigate to="/login" replace />} />
									<Route path="login" element={<LoginView />} />
									<Route path="register" element={<RegisterView />} />
									<Route path="notifications" element={<NotificationsView />} />
									<Route path="projects" element={<ProjectsView />} />
									<Route path="projects/new" element={<CreateProjectView />} />
									<Route path="/projects/:projectId" element={<ProjectDetailsView />} />
									<Route path="/projects/:projectId/stories/new" element={<CreateStoryView />} />
									<Route path="/projects/:projectId/stories/:storyId" element={<StoryDetailsView />} />
									<Route path="/projects/:projectId/stories/:storyId/tasks/new" element={<CreateTaskView />} />
									<Route path="/projects/:projectId/stories/:storyId/tasks/:taskId" element={<TaskDetailsView />} />
								</Routes>
							</NotificationsProvider>
						</CurrentUserProvider>
					</FirebaseProvider>
				</Router>
			</MessageProvider>
		</ThemeProvider>
	</React.StrictMode>
);
