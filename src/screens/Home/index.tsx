import { StatusBar } from "expo-status-bar";
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Header } from "../../components/Header";
import { styles } from "./styles";
import LogoNeki from "../../assets/image/logoneki.png";
import { DataContext } from "../../context/dataContext";
import { CardUserSkill } from "../../components/CardUserSkills";
import { ApiNeki } from "../../services/apiUser";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../context/Auth";
import { clearStorage } from "../../services/LocalStorageService";
import { BottomTab } from "../../components/BottomTab";

export function Home({ navigation }) {
  const { dataUser } = useContext(DataContext);
  const [user, setUser] = useState();
  const [updateList, setUpdateList] = useState(false);
  const { auth } = React.useContext(AuthContext);
  const { setAuth } = React.useContext(AuthContext);

  const onRefresh = React.useCallback(() => {
    setUpdateList(true);
    setTimeout(() => {
      setUpdateList(false);
    }, 2000);
  }, []);

  const Login = () => {
    navigation.navigate("Login");
  };

  const LogOut = () => {
    setTimeout(() => {
      Login();
    }, 3000);
    clearStorage();
    setAuth(false);
  };

  const getUserData = async () => {
    await ApiNeki.get(`/user/${dataUser.id}`, {
      headers: { Authorization: `Bearer ${dataUser.token}` },
    })
      .then((resp) => {
        setUser(resp.data.user_skills);
      })
      .catch((error) => {
        console.log("Erro no GET USER   " + JSON.stringify(error));
      });
  };

  const DeleteUserSkill = async (id) => {
    ApiNeki.delete(`/user_skill/${id}`, {
      headers: { Authorization: `Bearer ${dataUser?.token}` },
    })
      .then((resp) => {
        setUpdateList(true);
      })
      .catch((error) => {});
  };

  

  useEffect(() => {
    getUserData();
    setUpdateList(false);
  }, [updateList]);

  return (
    <>
    <View style={styles.container}>
      <StatusBar style="light" />
      <Header update={() => setUpdateList(true)} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={updateList} onRefresh={onRefresh} />
        }
      >
        <Image style={styles.logo} source={LogoNeki} />
        <Text style={{fontSize:28, textAlign:'center', marginBottom:30}}>Bem vindo, {dataUser?.userLogin}</Text>
      </ScrollView>
      <FlatList
      style={{marginBottom:50}}
        data={user}
        keyExtractor={(item) => item.userSkillId}
        numColumns={1}
        renderItem={({ item }) => {
          return (
            <>
              <CardUserSkill
                name={item.skill.skillName}
                description={item.skill.skillDescription}
                image={item.skill.skillImage}
                version={item.skill.skillVersion}
                knowledgeLevel={item.knowledgeLevel}
                id={item.userSkillId}
                deleteUserSkill={DeleteUserSkill}
                skillId={item.skill.skillId}
              />

              <View style={{ width: 30 }} />
            </>
          );
        }}
      />
    </View>
    <BottomTab logout={LogOut}/>
    </>
  );
}
