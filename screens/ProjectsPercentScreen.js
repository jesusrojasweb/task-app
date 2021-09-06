import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useCollectionById } from "../hooks/useCollectionById";
import { useSpecificCollection } from "../hooks/useSpecificCollection";
import { useSpecificTask } from "../hooks/useCollection";
import { backgroundDefault, colorPrincipal } from "./styles/variables";
import ProjectCard from "../components/ProjectCard";
import { PieChart } from "react-native-chart-kit";

const ProjectsPercentScreen = () => {
  const [tasks, setTasks] = useSpecificCollection("isCompleted", true, "tasks");
  const [tasksOrdenated, setTasksOrdenated] = useState(tasks);
  const [projectIds, setProjectIds] = useState([]);
  const [projects, setProjects] = useSpecificTask("projects");
  const [projectsActual, setProjectsActual] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);
  const [isProjectsCharged, setIsProjectsCharged] = useState(false);

  useLayoutEffect(() => {
    setTasksOrdenated(
      tasks.sort(function (a, b) {
        if (a.data.projectId > b.data.projectId) {
          return 1;
        }
        if (a.data.projectId < b.data.projectId) {
          return -1;
        }

        return 0;
      })
    );
    findProjects();
  }, [tasks, tasksOrdenated]);

  useLayoutEffect(() => {
    console.log("\n\n\n\n\n\n\n\n\n\n\n");
    if (projectIds[0] !== undefined) {
      const actuals = projects.filter(({ id }) => projectIds.includes(id));
      setProjectsActual(actuals);

      if (!isProjectsCharged) {
        dataProjects.forEach(({ id, data: { name, color } }, index) => {
          console.log("\n\n\n\n\n\n\n");
          const length = dataProjects.length;
          const projectTasks = tasks.filter(
            ({ data }) => data.projectId === id
          );
          const count = projectTasks.length;

          const projectData = {
            name,
            color: `#${color}`,
            population: count,
            legendFontColor: `#${color}`,
            legendFontSize: 15,
          };

          console.log("projectData", projectData);
          if (length > 0) {
            console.log("\n\nincognita", dataProjects.includes(projectData));
            if (!dataProjects.includes(projectData)) {
              setDataProjects([...dataProjects, projectData]);
              console.log("\n\nestas dentro");
            }
          } else {
            setDataProjects([projectData]);
          }
        });
      }
      // console.log("\n\n\n\n\n\n\nactuals:", actuals);
    }
    // console.log("\n\n\n\n\n\n\ndataProjects:", dataProjects);
    console.log("\n\ndataProjects:", dataProjects);

    console.log("hola como estas");
    // console.log(projectsActual.length === dataProjects.length);
    // console.log(isProjectsCharged);
    // console.log(projectsActual);
  }, [projectIds, projects, projectsActual]);

  const findProjects = () => {
    tasksOrdenated.map(({ data: { projectId } }) => {
      const length = projectIds.length;

      if (length > 0) {
        if (!projectIds.includes(projectId)) {
          setProjectIds([...projectIds, projectId]);
        }
      } else {
        setProjectIds([projectId]);
      }
    });
  };

  // console.log("estas en projectsPrecentScreen");

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <PieChart
          data={dataProjects}
          width={Dimensions.get("window").width} // from react-native
          height={200}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"15"}
          center={[75, 0]}
          absolute
          hasLegend={false}
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => colorPrincipal,
            labelColor: (opacity = 1) => colorPrincipal,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
        />
        {projectsActual.map(({ id, data }) => (
          <ProjectCard key={id} {...data} onPress={() => {}} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProjectsPercentScreen;

const styles = StyleSheet.create({
  container: {
    ...backgroundDefault,
    flex: 1,
  },
});
