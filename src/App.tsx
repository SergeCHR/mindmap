import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTab,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { person, list, gitBranch } from 'ionicons/icons'
import Templates from './pages/Templates'
import Mindmap from './pages/Mindmap'
import Profile from './pages/Profile'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'
import Login from './pages/Login'
import Register from './pages/Register'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/auth'
import { ProtectedRoute, IsUserRedirect } from './components/PrivateRoute'
import { useEffect } from 'react'
setupIonicReact()

const App: React.FC = () => {
	const [user] = useAuthState(auth)
	useEffect(() => {
		console.log(user)
	}, [user])
	return (
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<ProtectedRoute
							authenticationPath='/login'
							isAuthenticated={user !== null && user !== undefined}
							exact
							path='/my-templates'>
							<Templates />
						</ProtectedRoute>
						<ProtectedRoute
							authenticationPath='/login'
							isAuthenticated={user !== null && user !== undefined}
							exact
							path='/mindmap'>
							<Mindmap />
						</ProtectedRoute>
						<ProtectedRoute
							authenticationPath='/login'
							isAuthenticated={user !== null && user !== undefined}
							path='/profile'>
							<Profile />
						</ProtectedRoute>
						<IsUserRedirect loggedInPath='/mindmap' user={user} path='/login'>
							<Login />
						</IsUserRedirect>
						<IsUserRedirect
							loggedInPath='/mindmap'
							user={user}
							path='/register'>
							<Register />
						</IsUserRedirect>
					</IonRouterOutlet>
					{user ? (
						<IonTabBar slot='bottom'>
							<IonTabButton tab='my-templates' href='/my-templates'>
								<IonIcon icon={list} />
								<IonLabel>My templates</IonLabel>
							</IonTabButton>
							<IonTabButton tab='mindmap' href='/mindmap'>
								<IonIcon icon={gitBranch} />
								<IonLabel>Mindmap</IonLabel>
							</IonTabButton>
							<IonTabButton tab='profile' href='/profile'>
								<IonIcon icon={person} />
								<IonLabel>Profile</IonLabel>
							</IonTabButton>
						</IonTabBar>
					) : (
						<IonTabBar slot='bottom'>
							<IonTabButton tab='login' href='/login'>
								<IonIcon icon={list} />
								<IonLabel>Login</IonLabel>
							</IonTabButton>
							<IonTabButton tab='register' href='/register'>
								<IonIcon icon={gitBranch} />
								<IonLabel>Register</IonLabel>
							</IonTabButton>
						</IonTabBar>
					)}
					)
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	)
}

export default App
