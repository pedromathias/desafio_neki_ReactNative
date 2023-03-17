import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { CardSkills } from "../CardSkills";
import { DataContext } from "../../context/dataContext";
import { ApiNeki } from "../../services/apiUser";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ModalSkillLevel = ({
  isSelectedModal,
  setIsSelectedModal,
  id,
  skillId,
}) => {
  const [counter, setCounter] = useState(0);
  const { dataUser } = useContext(DataContext);

  // Function is called everytime increment TouchableOpacity is clicked
  const handleClick1 = () => {
    if(counter < 1){
        setCounter(counter + 1)
    }
    setCounter(counter + 1);
  };

  // Function is called everytime decrement TouchableOpacity is clicked
  const handleClick2 = () => {
    if(counter > 10){
        setCounter(counter - 1)
    }
    setCounter(counter - 1);
  };

  const getCurrentDate = () => {
    const date = new Date().toJSON().slice(0, 10);
    return date;
  };

  const handleUpdateUserSkill = async () => {
    try {
      await ApiNeki.put(
        `/user_skill/${id}`,
        {
          user: {
            userId: dataUser.id,
          },
          skill: {
            skillId: skillId,
          },
          knowledgeLevel: counter,
          updatedAt: getCurrentDate(),
        },
        { headers: { Authorization: `Bearer ${dataUser?.token}` } }
        
      );
    } catch (error) {
      console.log("Erro ao salvar a skill para este usuário!", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isSelectedModal}
      onRequestClose={() => {
        setIsSelectedModal(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsSelectedModal(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContentView}>
        <View style={{ width: "100%", marginBottom: 20, flexDirection: "row" }}>
          <AntDesign
            onPress={() => setIsSelectedModal(false)}
            name="arrowleft"
            size={28}
            color="white"
            style={{ marginTop: 15 }}
          />
          <Text style={{ fontSize: 20, color: "white", marginLeft: 70 }}>
            Selecione seu nível de conhecimento nessa skill
          </Text>
        </View>
        <View style={styles.counterView}>
          <TouchableOpacity onPress={handleClick2}>
            <Text style={{ fontSize: 50, color: "white", fontWeight: "bold" }}>
              -
            </Text>
          </TouchableOpacity>
          <View>
            <Text style={{ fontSize: 50, color: "white", fontWeight: "bold" }}>
              {counter}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={handleClick1}>
              <Text
                style={{ fontSize: 50, color: "white", fontWeight: "bold" }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleUpdateUserSkill()}
          style={styles.savebutton}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
