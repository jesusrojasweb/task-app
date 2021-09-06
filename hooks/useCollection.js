import { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";

export const useSpecificTask = (collectionName) => {
  const [collection, setCollection] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection(collectionName)
      .onSnapshot((snapshot) =>
        setCollection(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  });

  return [collection, setCollection];
};
