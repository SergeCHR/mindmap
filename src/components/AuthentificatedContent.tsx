import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from '@ionic/react'
import { fitness, list, person } from 'ionicons/icons'
import { Route } from 'react-router'
import Profile from '../pages/Profile'
import Articles from '../pages/Articles'
import ArticlePage from '../pages/Articles/Article'
import Workouts from '../pages/Workouts'
import Exercise from '../pages/Workouts/Exercise'
export const AuthentificatedContent: React.FC<{ user: any }> = ({ user }) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route exact path='/articles'>
					<Articles />
				</Route>
				<Route exact path='/workouts'>
					<Workouts />
				</Route>
				<Route path={`/workouts/:workoutId/:exerciseId`}>
					<Exercise />
				</Route>
				<Route path='/articles/:slug/'>
					<ArticlePage />
				</Route>
				<Route exact path='/profile' component={Profile} />
			</IonRouterOutlet>
			<IonTabBar color={'tertiary'} slot='bottom'>
				<IonTabButton tab='articles' href='/articles'>
					<IonIcon icon={list} />
					<IonLabel>Fitness Info</IonLabel>
				</IonTabButton>
				<IonTabButton tab='workouts' href='/workouts'>
					<IonIcon icon={fitness} />
					<IonLabel>Your workouts</IonLabel>
				</IonTabButton>
				<IonTabButton tab='profile' href='/profile'>
					<IonIcon icon={person} />
					<IonLabel>Profile</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	)
}
