import { useLayoutEffect, useState } from "react";
import { auth, db } from "../firebase";

export const useCollectionById = (collectionSearched, id) => {
  let collection = new Promise(function (resolve, reject) {
    const suscribe = db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection(collectionSearched)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.id === id) {
            const collectionData = {
              id: doc.id,
              data: doc.data(),
            };
            resolve(collectionData);
          }
        });
      });
  });

  // .onSnapshot((snapshot) => {
  //   collection = snapshot.docs.map((doc) => ({
  //     id: doc.id,
  //     data: doc.data(),
  //   }));
  // });

  return collection;
};
