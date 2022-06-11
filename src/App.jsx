import { IonApp, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

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
import { AuthentificatedContent } from './components/AuthentificatedContent'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase/auth'
import { Redirect, Route } from 'react-router'
setupIonicReact()

const App = () => {
	const [user] = useAuthState(auth)
	return (
		<IonApp>
			<IonReactRouter>
				<Route path='/' component={user ? AuthentificatedContent : Login} />
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
				<Redirect from='*' to='/login' />
			</IonReactRouter>
		</IonApp>
	)
}

export default App
