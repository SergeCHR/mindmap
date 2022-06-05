import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
} from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'

import { app } from '.'
import { db } from './firestore'

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
export const registerWithEmailAndPassword = async (
	name: string,
	email: string,
	password: string
) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		await addDoc(collection(db, 'users'), {
			uid: user.uid,
			name,
			authProvider: 'local',
			email,
		})
	} catch (err) {
		console.error(err)
	}
}
export const sendPasswordReset = async (email: string) => {
	try {
		await sendPasswordResetEmail(auth, email)
		alert('Password reset link sent!')
	} catch (err) {
		console.error(err)
	}
}
export const logout = () => {
	signOut(auth)
}
