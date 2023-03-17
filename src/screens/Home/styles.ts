import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

container:{
    flexDirection:'column',
    justifyContent:'space-evenly'

},

logo:{
resizeMode:'contain',
height:300,
width:400,
alignSelf:'center',
marginVertical:350,
opacity:0.6,
zIndex:-1,
position:"absolute"
}

})