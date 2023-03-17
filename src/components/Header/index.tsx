import React, { useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { ModalSkills } from "../ModalSkills";

export const Header = ({update}) => {
  const [isSelectedModal, setIsSelectedModal] = useState(false);
  return (
    <View style={styles.header}>
        <Text style={styles.title}>NekiSkills</Text>
      <AntDesign
        onPress={() => setIsSelectedModal(true)}
        style={styles.addskill}
        name="plus"
        size={28}
        color="white"
      />
      <ModalSkills
        isSelectedModalSkills={isSelectedModal}
        setIsSelectedModalSkills={setIsSelectedModal}
        update={update}
      />
    </View>
  );
};
