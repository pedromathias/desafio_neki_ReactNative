import { StyleSheet } from "react-native";
import styled from 'styled-components'

export const styles = StyleSheet.create({

container:{
backgroundColor: "#ffffff",
width:"100%",
height:"100%"

},

logoneki:{
    marginTop:80,
    width:400,
    height:120,
    marginBottom:100
},

emailbox:{
    alignSelf:"center",
    width:"80%",
    height:40,
    borderWidth:2,
    marginTop:30,
    borderRadius:30,
    backgroundColor:"#2d939c",
    paddingLeft:28
},

loginbutton:{
    marginTop:30,
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    backgroundColor:"#3d5b72",
    width:100,
    height:50,
    borderRadius:30
},
eyevisiblelogin:{
    position:'absolute',
    right:55,
    top:405
}

})