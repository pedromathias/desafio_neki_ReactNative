import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  FlatList,
} from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { CardSkills } from "../CardSkills";
import { DataContext } from "../../context/dataContext";
import { ApiNeki } from "../../services/apiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ModalSkills = ({
  isSelectedModalSkills,
  setIsSelectedModalSkills,
  update
}) => {
  const [data, setData] = useState();
  const [skillsData, setSkillsData] = useState();
  const { dataUser } = useContext(DataContext);

  const getSkills = async () => {
    ApiNeki.get(`/skill`, {
      headers: { Authorization: `Bearer ${dataUser?.token}` },
    })
      .then((res) => {
        setSkillsData(res.data);
        
      })
      .catch((error) => {});
  };


  React.useEffect(() => {
    getSkills();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSelectedModalSkills}
      onRequestClose={() => {
        setIsSelectedModalSkills(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => {setIsSelectedModalSkills(false), update}}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContentView}>
        <View style={{ width: "100%", marginBottom: 20, flexDirection: "row" }}>
          <AntDesign
            onPress={() => setIsSelectedModalSkills(false)}
            name="arrowleft"
            size={28}
            color="white"
          />
          <Text style={{ fontSize: 20, color: "white", marginLeft: 70 }}>
            Selecione sua Skill
          </Text>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={skillsData}
          keyExtractor={(item) => item.id}
          numColumns={3}
          renderItem={({ item }) => {
            return (
              <>
                <CardSkills
                  id={item.skillId}
                  name={item.skillName}
                  image={{ uri: item.skillImage }}
                />

                <View style={{ width: 30 }} />
              </>
            );
          }}
        />
      </View>
    </Modal>
  );
};
