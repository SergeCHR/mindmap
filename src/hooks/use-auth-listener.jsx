import { useState, useEffect } from 'react'
import { getAuth } from '@firebase/auth'
export const useAuthListener = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))
	useEffect(() => {
		const auth = getAuth()
		const listener = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				localStorage.setItem('authUser', JSON.stringify(authUser))
				setUser(authUser)
			} else {
				setUser(null)
				localStorage.removeItem('authUser')
			}
		})
		return () => listener()
	}, [])
	return { user }
}
