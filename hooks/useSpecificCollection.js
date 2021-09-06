import { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";

export const useSpecificCollection = (item, value, collectionSearched) => {
  const [collection, setTasks] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection(collectionSearched)
      .where(item, "==", value)
      .onSnapshot((snapshot) =>
        setTasks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  });

  return [collection, setTasks];
};
