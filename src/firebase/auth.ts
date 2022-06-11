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
	'ffcccc',
	'cc6633',
	'669966',
	'339966',
	'ccffcc',
	'33cc99',
	'339999',
	'339966',
	'ccffcc',
	'33cc99',
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
