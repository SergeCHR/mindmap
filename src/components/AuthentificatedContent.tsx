import {
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
} from '@ionic/react'
import { fitness, list, person } from 'ionicons/icons'
import { Redirect, Route } from 'react-router'
import Profile from '../pages/Profile'
import Templates from '../pages/Templates'
import Workouts from '../pages/Workouts'
export const AuthentificatedContent: React.FC<{ user: any }> = ({ user }) => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				<Route exact path='/my-templates'>
					<Templates />
				</Route>
				<Route exact path='/workouts'>
					<Workouts />
				</Route>
				<Route exact path='/profile' component={Profile} />
			</IonRouterOutlet>
			<IonTabBar slot='bottom'>
				<IonTabButton tab='my-templates' href='/my-templates'>
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
