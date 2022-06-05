import { auth } from '../../firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'

const ProfileContainer: React.FC = () => {
	const [user] = useAuthState(auth)
	return (
		<div>
			<h3>{user?.displayName}</h3>
			<h3>{user?.email}</h3>
		</div>
	)
}

export default ProfileContainer
