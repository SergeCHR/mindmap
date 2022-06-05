import { Redirect, Route, RouteProps } from 'react-router'
import { User as FirebaseUser } from 'firebase/auth'
export type ProtectedRouteProps = {
	isAuthenticated: boolean
	authenticationPath: string
} & RouteProps
export type IsUserRedirectProps = {
	user: FirebaseUser | null | undefined
	loggedInPath: string
} & RouteProps

export const ProtectedRoute = ({
	isAuthenticated,
	authenticationPath,
	...routeProps
}: ProtectedRouteProps) => {
	if (isAuthenticated) {
		return <Route {...routeProps} />
	} else {
		return <Redirect to={{ pathname: authenticationPath }} />
	}
}

export const IsUserRedirect = ({
	user,
	loggedInPath,
	children,
	...rest
}: IsUserRedirectProps) => {
	return (
		<Route
			{...rest}
			render={() => {
				if (!user) return children
				if (user) return <Redirect to={{ pathname: loggedInPath }} />
				return null
			}}
		/>
	)
}
