import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	updateProfile,
	updatePassword,
	EmailAuthProvider,
} from 'firebase/auth'
import { app } from '.'

export const auth = getAuth(app)
export const logInWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
	} catch (err) {
		console.error(err)
	}
}
const colors = [
	'ff9966',
	'996633',
	'cc6633',
	'669966',
	'339966',
	'33cc99',
	'339999',
]
export const registerWithEmailAndPassword = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		updateProfile(user, {
			displayName: name,
			photoURL: '#' + colors[Math.round(Math.random() * colors.length)],
		})
		const commonOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		}
		const dbRes = await fetch(
			'https://evening-earth-40603.herokuapp.com/users',
			{
				...commonOptions,
				body: JSON.stringify({ firebaseId: user?.uid }),
			}
		)
	} catch (err) {
		console.error(err)
	}
}
export const sendPasswordReset = async (email: string) => {
	try {
		await sendPasswordResetEmail(auth, email)
	} catch (err) {
		console.error(err)
	}
}
export const logout = () => {
	signOut(auth)
}
export const changePassword = async (newPass: string) => {
	try {
		updatePassword(auth.currentUser!, newPass)
	} catch (err) {
		console.error(err)
	}
}
