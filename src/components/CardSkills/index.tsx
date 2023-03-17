import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { DataContext } from "../../context/dataContext";
import { ApiNeki } from "../../services/apiUser";
import { ModalSkillLevel } from "../ModalSkillLevel";
import { ModalSkills } from "../ModalSkills";
import { styles } from "./styles";

export const CardSkills = ({ name, image, id, navigation}) => {
  const [userId, setUserId] = useState(null);
  const [userSkill, setUserSkill] = useState();
  const [isSelectedModal, setIsSelectedModal] = useState(false);
  const [isSelectedModalSkills, setIsSelectedModalSkills] = useState(false);
  const { dataUser } = useContext(DataContext);
  const [updateList, setUpdateList] = useState(false);
  

  const getCurrentDate = () => {
    const date = new Date().toDateString().slice(0, 10);
    return date;
  };

  function fodase() {
    navigation.navigate("Home")
  }

  const handleSaveUserSkill = async () => {
    try {
      console.log("pele morreu");
      
      await ApiNeki.post(
        "/user_skill",
        {
          user: {
            userId: dataUser.id,
          },
          skill: {
            skillId: id,
          },
          knowledgeLevel: 0,
          createdAt:getCurrentDate(),
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } }
        
      );
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!");
    }
    
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={() => {() => fodase();handleSaveUserSkill()}}>
        <Image style={styles.image} source={image} />
        <Text
          style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
        >
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
