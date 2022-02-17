import { StatusBar } from "expo-status-bar";
import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { UserContext } from "../src/userContext";

const EmergencyShow = ({ navigation, route }) => {
  const { name, content } = route.params;
  var [prompt_id, changePrompt] = React.useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name ?? "no content"}</Text>
      <ScrollView>
        {content.prompts.map((intrebare) => {
          return (
            <>
              <Text
                style={
                  intrebare.id == prompt_id ? styles.intrebare : styles.ascunde
                }
              >
                {intrebare.variants[0].text}
              </Text>
              <View>
                {intrebare.image != "" && intrebare.id == prompt_id && (
                  <Image
                    source={{ uri: `data:image/png;base64,${intrebare.image}` }}
                    style={styles.image}
                  />
                )}
              </View>
              <View style={styles.raspunsuri}>
                {intrebare.responses.map((raspuns) => {
                  return (
                    <TouchableOpacity
                      onPress={() => changePrompt(raspuns.next_prompt_id)}
                      style={
                        intrebare.id == prompt_id
                          ? styles.raspuns
                          : styles.ascunde
                      }
                    >
                      <Text>{raspuns.text}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          );
        })}
      </ScrollView>
      {/* <Text style={styles.linie}>{content}</Text> */}
      {/* <Text style={styles.lesson}>{content ?? "no content"}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    flex: 1,
    padding: 20,
  },
  intrebare: {
    fontSize: 25,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: "center",
  },
  raspunsuri: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  raspuns: {
    padding: 15,
    backgroundColor: "#AFAFAF",
    marginBottom: 10,
    color: "#ffffff",
    borderRadius: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  ascunde: {
    display: "none",
  },
  containerInput: {
    margin: 20,
  },
  Login: {
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginVertical: 7,

    backgroundColor: "#0000b3",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3366ff",
  },

  SignUp: {
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginVertical: 7,

    backgroundColor: "#cc3300",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ff6633",
  },

  buttonText: {
    marginHorizontal: 8,
    justifyContent: "center",
    fontSize: 30,
    color: "white",
    textAlign: "center",
  },

  containerButoane: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginHorizontal: 50,
    marginVertical: 7,
  },
  input: {
    borderRadius: 25,
    width: 200,
    backgroundColor: "#FFFFF0",
    height: 40,
    margin: 12,
    borderWidth: 1,
    justifyContent: "center",
    textAlign: "center",
  },
  image: {
    width: null,
    resizeMode: "contain",
    height: 350,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default EmergencyShow;
