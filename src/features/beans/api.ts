import { db } from "../../lib/firebase";
import { DocumentSnapshot, QuerySnapshot, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { Beans } from "./types";

export const fetchAllBeans = async (): Promise<Beans[]> => {
  const querySnapshot: QuerySnapshot = await getDocs(collection(db, "beans"));
  const allBeans: Beans[] = [];
  querySnapshot.forEach((doc: DocumentSnapshot) => {
    const beans = doc.data();
    if (beans) {
      allBeans.push(beans as Beans);
    }
  });
  return allBeans;
}

export const fetchBeans = async (docId: string): Promise<Beans> => {
  const docRef = doc(db, "beans", docId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Beans;
  } else {
    // docSnap.data() will be undefined in this case
    throw new Error(`Doc ID: ${docId} - no such document!`);
  }
};

export const updateBeans = async (
  docId: string,
  beansUpdate: Partial<Beans>
): Promise<Beans> => {
  const docRef = doc(db, "beans", docId);
  await updateDoc(docRef, beansUpdate);
  return {
    id: docId,
    amount: beansUpdate.amount,
    label: beansUpdate.label,
  } as Beans;
};
