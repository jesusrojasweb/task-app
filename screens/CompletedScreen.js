import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import TaskCard from "../components/TaskCard";
import { auth, db } from "../firebase";
import { useSpecificCollection } from "../hooks/useSpecificCollection";
import { backgroundDefault } from "./styles/variables";

const CompletedScreen = () => {
  const [tasks, setTasks] = useSpecificCollection("isCompleted", true, "tasks");
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {tasks.map(({ id, data }) => (
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
