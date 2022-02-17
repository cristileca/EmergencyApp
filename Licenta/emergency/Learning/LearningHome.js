import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { UserContext } from "../src/userContext";

const Learning = ({ navigation }) => {
  const { setUserLogged } = useContext(UserContext);
  var [dataFetched, setData] = React.useState("");
  var [lessons, setLessons] = React.useState("");

  const logout = () => {
    setUserLogged(false);
  };
  const lessonsFunction = () => {
    fetch("http://localhost:3000/lessons", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setLessons(data.data);
        setData(true);
      })
      .catch((err) => alert(JSON.stringify(err.message)));
  };

  if (!dataFetched) {
    lessonsFunction();
    console.log(lessons);
  }

  return (
    <View style={styles.container}>
      {dataFetched != 0 &&
        lessons.map((element) => {
          return (
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.lesson}
                key={element._id}
                onPress={() =>
                  navigation.navigate("Lesson", {
                    name: element.name,
                    content: element.content,
                  })
                }
              >
                <Text style={styles.button}>{element.name} </Text>
              </TouchableOpacity>
            </View>
          );
        })}

      <TouchableOpacity style={styles.lesson} onPress={() => logout()}>
        <Text style={styles.button}>Logout </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  button: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
  },
  lesson: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#fafafa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  Title: {
    alignItems: "center",
    borderRadius: 20,
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor: "#5900b3",
  },
  TitleText: {
    color: "#00ace6",
    fontWeight: "bold",
    fontSize: 40,
    alignItems: "center",
  },
});

export default Learning;
