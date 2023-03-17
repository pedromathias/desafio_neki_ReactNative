import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Image, Text } from "react-native";
import { styles } from "./styles";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModalSkillLevel } from "../ModalSkillLevel";

export const CardUserSkill = ({
  name,
  version,
  description,
  image,
  knowledgeLevel,
  deleteUserSkill,
  id,
  skillId,
}) => {
  const [isSelectedModal, setIsSelectedModal] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.logoview}>
        <Image style={{ height: 80, width: 80 }} source={{ uri: image }} />
      </View>
      <View
        style={{ justifyContent: "center", alignContent: "center", width: 150 }}
      >
        <Text style={{ color: "white", marginBottom: 8 }}>{name}</Text>
        <Text style={{ color: "white", marginBottom: 8 }}>
          Version: {version}
        </Text>
        <Text style={{ color: "white", marginBottom: 8 }}>
          Knowledge Level: {knowledgeLevel}
        </Text>
        <Text style={{ color: "white" }}>Description: {description}</Text>
      </View>
      <View>
        <Feather
          style={{ alignSelf: "flex-end", marginTop: 15 }}
          name="trash"
          size={24}
          color="white"
          onPress={() => deleteUserSkill(id)}
        />
        <MaterialIcons
          onPress={() => setIsSelectedModal(true)}
          style={{ alignSelf: "flex-end", marginTop: 115 }}
          name="update"
          size={28}
          color="white"
        />
      </View>
      <ModalSkillLevel
      skillId={skillId}
      id={id}
        isSelectedModal={isSelectedModal}
        setIsSelectedModal={setIsSelectedModal}
      />
    </View>
  );
};
