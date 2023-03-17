import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage";
import React, { useContext, useState, useEffect } from "react";
import { styles } from "./styles";
import LogoNeki from "../../assets/image/logoneki.png";
import { Entypo } from "@expo/vector-icons";
import { ApiNeki } from "../../services/apiUser";

import { DataContext } from "../../context/dataContext";
import { retrieveLocalData, storeLocalData } from "../../services/LocalStorageService";
import { AuthContext } from "../../context/Auth";
import { Checkbox } from "react-native-paper";

export function Login({ navigation }) {
  const [login, setLogin] = useState();
  const [password, setPassword] = useState();
  const [hidePass, setHidePass] = useState(true);
  const {packageUserData} = useContext(DataContext)
  const {dataUser} = useContext(DataContext);
  const {auth} = React.useContext(AuthContext);
  const {setAuth} = React.useContext(AuthContext);
  const [persistLogged, setPersistLogged] = useState(false);

  const onChangeLoginHandler = (login) => {
    setLogin(login);
  };

  const onChangePasswordHandler = (password) => {
    setPassword(password);
  };

  const Cadastrar = () => {
    navigation.navigate("Register");
  };

  const Home = () => {
    navigation.navigate("Home");
  };

  const handleLogin = async () => {
    try {
      const { data } = await ApiNeki.post<{ "jwt-token": string }>(
        "auth/login",
        {
          userLogin: login,
          userPassword: password,
        }
      );
           
      await AsyncStorage.setItem("login_key", data["jwt-token"]);

      packageUserData(await AsyncStorage.getItem("login_key"));
      setAuth(true)
      // await AsyncStorage.setItem("id",JSON.stringify(dataUser.id))
      // const id = AsyncStorage.getItem("id")
      // console.log(id);
      Home();

      if(persistLogged == true){
        storeLocalData("login_key", data)
      }
      
    } catch (error) {
      console.error(error);
      alert("Usuário ou senha incorretas! Não foi possível realizar o login!");
    }
  };

  const verifyLogin = async () => {
    try {
      const response = JSON.parse(await retrieveLocalData("login_key"));
      if(response == null) {
        return;
      }

      packageUserData(response["jwt-token"]);
      setAuth(true);
      Home();
  
    } catch(error) {
      console.log(error);
    } 
  }

  useEffect(() => {
    verifyLogin();
  },[])

  return (
    <View>
      <Image style={styles.logoneki} source={LogoNeki} />
      <View>
        <TextInput
          onChangeText={onChangeLoginHandler}
          value={login}
          placeholder="Insira seu login"
          selectionColor={"black"}
          placeholderTextColor={"white"}
          style={styles.emailbox}
        ></TextInput>
        <TextInput
          onChangeText={onChangePasswordHandler}
          value={password}
          placeholder="Insira sua senha"
          selectionColor={"black"}
          placeholderTextColor={"white"}
          secureTextEntry={hidePass}
          style={styles.emailbox}
        ></TextInput>
      </View>
      <View style={{width:'80%', alignSelf:'center'}}>

      <Checkbox.Item 
            label="Manter usuário logado" 
            status={persistLogged ? 'checked' : 'unchecked'}
            onPress={() => {
              setPersistLogged(!persistLogged);
            }}
          />
          </View>
      <TouchableOpacity
        onPress={() => handleLogin()}
        style={styles.loginbutton}
      >
        <Text style={{ color: "white" }}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.eyevisiblelogin}
        onPress={() => setHidePass(!hidePass)}
      >
        {hidePass ? (
          <Entypo name="eye" size={28} color="black" />
        ) : (
          <Entypo name="eye-with-line" size={28} color="black" />
        )}
      </TouchableOpacity>
      <Text
        style={{
          textAlign: "center",
          marginTop: 30,
          textDecorationLine: "underline",
        }}
      >
        Já possui uma conta?
      </Text>
      <TouchableOpacity onPress={() => Cadastrar()} style={styles.loginbutton}>
        <Text style={{ color: "white" }}>Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}
