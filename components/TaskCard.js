import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  colorBackground,
  colorText,
  fontRegular,
  fontSemiBold,
} from "../screens/styles/variables";
import ModalComponent from "./ModalComponent";
import { auth, db } from "../firebase";

const TaskCard = (props) => {
  const {
    focus,
    name,
    isCompleted,
    rest,
    date,
    navigation,
    taskId,
    projectId,
  } = props;

  const [showModal, setShowModal] = useState(false);

  const goTask = (to) => {
    navigation.navigate(to, props);
  };

  const deleteTask = async () => {
    db.collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => {
        alert("Tarea borrada satisfactoriamente");
        setShowModal(false);
      })
      .catch((error) => {
        alert("Hubo un error", error);
        setShowModal(false);
      });
  };

  const completeTask = () => {
    db.collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(taskId)
      .set({ focus, name, rest, date, projectId, isCompleted: !isCompleted })
      .catch((error) => {
        alert("Hubo un error", error);
      });
  };

  return (
    <TouchableOpacity
      style={styles().container}
      onPress={() => !isCompleted && goTask("Create Tasks")}
    >
      <View style={styles().info}>
        <TouchableOpacity
          style={styles(isCompleted).checked}
          onPress={completeTask}
        >
          {isCompleted && (
            <FontAwesome name="check" size={14} color={colorText} />
          )}
        </TouchableOpacity>
        <View style={styles().texts}>
          <Text style={styles(isCompleted).name}>{name}</Text>
          <Text style={styles().time}>
            Focus: {focus} m Rest: {rest} m
          </Text>
        </View>
      </View>
      <ModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        header="Atencion"
        onPress={deleteTask}
      >
        <Text>¿Desea borrar esta tarea? </Text>
      </ModalComponent>
      {isCompleted ? (
        <TouchableOpacity
          style={{ ...styles().play, ...styles().close }}
          onPress={() => setShowModal(true)}
        >
          <FontAwesome name="times" size={10} color={"#E5697C"} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles().play} onPress={() => goTask("Reloj")}>
          <FontAwesome name="play" size={10} color={"#707BF7"} />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default TaskCard;

const styles = (isCompleted) =>
  StyleSheet.create({
    container: {
      backgroundColor: colorBackground,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 8,
      padding: 14,
      marginBottom: 15,
    },
    info: {
      flexDirection: "row",
      alignItems: "center",
    },
    checked: {
      width: 26,
      height: 26,
      borderWidth: 2,
      borderColor: isCompleted ? colorText : "#3D8B68",
      borderRadius: 200,
      backgroundColor: isCompleted ? "transparent" : "#2C5B45",
      marginRight: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    texts: {
      position: "relative",
    },
    name: {
      color: isCompleted ? colorText : "white",
      fontFamily: fontSemiBold,
      fontSize: 14,
      marginBottom: 8,
      textDecorationLine: isCompleted ? "line-through" : "none",
      textDecorationStyle: "solid",
    },
    time: {
      color: colorText,
      fontFamily: fontRegular,
      fontSize: 12,
    },
    play: {
      width: 26,
      height: 26,
      borderRadius: 100,
      borderWidth: 2,
      borderColor: "#707BF7",
      justifyContent: "center",
      alignItems: "center",
    },
    close: {
      borderColor: "#E5697C",
    },
  });
