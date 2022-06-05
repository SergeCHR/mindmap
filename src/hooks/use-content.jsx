import { useState, useEffect } from 'react'
import { getFirestore, collection, query, getDocs } from 'firebase/firestore'
export const useContent = (target) => {
	const [content, setContent] = useState([])
	const db = getFirestore()
	useEffect(() => {
		const q = query(collection(db, target))
		getDocs(q).then((querySnapshot) => {
			const allContent = []
			querySnapshot.forEach((doc) =>
				allContent.push({
					// doc.data() is never undefined for query doc snapshots
					...doc.data(),
					docID: doc.id,
				})
			)
			setContent(allContent)
		})
	}, [db])
	return { [target]: content }
}
