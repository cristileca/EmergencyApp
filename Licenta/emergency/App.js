import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./sceens/Login";
import Register from "./sceens/SignUp";
import Home from "./sceens/Home";
import Learning from "./Learning/LearningHome";
import UserContextProvider, { UserContext } from "./src/userContext";
import Emergency from "./emergency/EmergencyHome";
import EmergencyShow from "./emergency/EmergencyShow";
import Lesson from "./sceens/Lesson";
import Profil from "./sceens/profil";

const Stack = createStackNavigator();

function Navigator() {
  const { userLogged } = useContext(UserContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="EmergencyApp">
        <Stack.Screen name="EmergencyApp" component={Home} />
        <Stack.Screen
          name="Emergency"
          component={Emergency}
          style={{ alignItems: "center" }}
        />
        <Stack.Screen
          name="EmergencyShow"
          component={EmergencyShow}
          style={{ alignItems: "center" }}
        />
        {userLogged ? (
          <>
            <Stack.Screen
              name="Profil"
              component={Profil}
              style={{ alignItems: "center" }}
            />
            <Stack.Screen
              name="Learning"
              component={Learning}
              style={{ alignItems: "center" }}
            />
            <Stack.Screen
              name="Lesson"
              component={Lesson}
              style={{ alignItems: "center" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Login}
              style={{ alignItems: "center" }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              style={{ alignItems: "center" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function App() {
  return (
    <UserContextProvider>
      <Navigator />
    </UserContextProvider>
  );
}

export default App;
