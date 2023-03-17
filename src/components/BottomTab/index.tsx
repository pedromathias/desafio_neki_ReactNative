import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { clearStorage } from "../../services/LocalStorageService";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth";

export const BottomTab = ({logout}) => {
   

  return (
    <View style={{position:"absolute",bottom:0, width: "100%", height: 70, backgroundColor: "#272727" }}>
      <MaterialCommunityIcons
      style={{alignSelf:'flex-end', marginTop:12}}
        onPress={logout}
        name="logout"
        size={40}
        color="white"
      />
    </View>
  );
};
