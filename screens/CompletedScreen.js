import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { auth, db } from "../firebase";
import { backgroundDefault } from "./styles/variables";

const CompletedScreen = () => {
  const [taks, setTaks] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .where("isCompleted", "==", true)
      .onSnapshot((snapshot) =>
        setTaks(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );

    return unsubscribe;
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {taks.map(({ id, data }) => (
          <TaskCard key={id} taskId={id} {...data} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompletedScreen;

const styles = StyleSheet.create({
  container: {
    ...backgroundDefault,
    padding: 31,
    height: "100%",
  },
});
