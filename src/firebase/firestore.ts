import {
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc,
} from 'firebase/firestore'

import { app } from '.'
export const db = getFirestore(app)
