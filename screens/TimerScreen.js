import React, { useLayoutEffect, useState } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TaskCard from "../components/TaskCard";
import {
  backgroundDefault,
  colorBackground,
  colorLight,
  fontRegular,
} from "./styles/variables";
import TimerControls from "../components/TimerControls";
import { auth, db } from "../firebase";

const TimerScreen = ({ route }) => {
  const focus = route?.params?.focus || 0,
    rest = route?.params?.rest || 0,
    taskId = route?.params?.taskId || "",
    date = route?.params?.date || "",
    name = route?.params?.name || "",
    projectId = route?.params?.projectId || "",
    isCompletedTask = route?.params?.isCompleted || false;

  const calculateSecs = (time) => {
    return parseInt(time) * 60;
  };

  const [restTime, setRestTime] = useState(calculateSecs(rest));
  const [focusTime, setFocusTime] = useState(calculateSecs(focus));
  const [playingTime, setPlayingTime] = useState(focusTime);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingFocus, setIsPlayingFocus] = useState(false);
  const [isPlayingRest, setIsPlayingRest] = useState(false);
  const [isCompleted, setIsCompleted] = useState(isCompletedTask);
  const [id, setId] = useState(taskId);

  useLayoutEffect(() => {
    setId(taskId);
    setRestTime(calculateSecs(rest));
    setFocusTime(calculateSecs(focus));
    setPlayingTime(calculateSecs(focus));
  }, [route]);

  const updateTask = async () => {
    await db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection("tasks")
      .doc(taskId)
      .set({
        focus: focusTime / 60,
        rest: restTime / 60,
        isCompleted,
        date,
        name,
        projectId,
      });
  };

  const transformSec = (sec) => {
    let minutes = Math.floor(sec / 60);
    let secs = sec - minutes * 60;
    if (secs < 10) {
      secs = "0" + secs;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    const timeString = `${minutes}:${secs}`;

    return timeString;
  };

  const playTiming = (timer) => {
    if (timer === "rest") {
      setIsPlayingRest(true);
      setIsPlayingFocus(false);

      setId("restTime");
      setPlayingTime(restTime);
    }
    if (timer === "focus") {
      setIsPlayingFocus(true);
      setIsPlayingRest(false);

      setId("focusTime");
      setPlayingTime(focusTime);
    }
    setIsPlaying(true);
  };

  const pauseTiming = (timer) => {
    if (timer === "rest") {
      setIsPlayingRest(false);
    }
    if (timer === "focus") {
      setIsPlayingFocus(false);
    }

    setIsPlaying(false);
  };

  const showTime = (remainingTime) => {
    const timeMinutes = focusTime / 60;
    const minute = Math.floor(timeMinutes);

    if (isPlayingFocus) {
      setFocusTime(remainingTime);
    }
    if (isPlayingRest) {
      setRestTime(remainingTime);
    }

    if (focusTime === 0) {
      setIsCompleted(true);
      pauseTiming("focus");
    }

    if (timeMinutes === minute) {
      updateTask();
    }

    return <Text style={styles.time}>{transformSec(remainingTime)}</Text>;
  };

  return (
    <View style={styles.container}>
      {taskId !== "" && <TaskCard {...route.params} />}
      <View style={styles.clockContainer}>
        <View style={styles.clock}>
          <CountdownCircleTimer
            key={id}
            isPlaying={isPlaying}
            duration={playingTime}
            colors={colorLight}
          >
            {({ remainingTime }) => showTime(remainingTime)}
          </CountdownCircleTimer>
        </View>
      </View>

      <View style={styles.controls}>
        <TimerControls
          time={transformSec(focusTime)}
          name="Focus"
          isPlaying={isPlayingFocus}
          setIsPlaying={() => playTiming("focus")}
          setIsPause={() => pauseTiming("focus")}
        />
        <TimerControls
          time={transformSec(restTime)}
          name="Rest"
          isPlaying={isPlayingRest}
          setIsPlaying={setIsPlayingRest}
          setIsPlaying={() => playTiming("rest")}
          setIsPause={() => pauseTiming("rest")}
        />
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    ...backgroundDefault,
    height: "100%",
    paddingHorizontal: 31,
  },
  clockContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  time: {
    color: "white",
    fontFamily: fontRegular,
    fontSize: 30,
  },
  clock: {
    padding: 30,
    backgroundColor: colorBackground,
    borderRadius: 200,
    width: 240,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
