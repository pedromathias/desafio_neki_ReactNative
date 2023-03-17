import React, { useState } from "react";
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
import { styles } from "./styles";
import { Entypo } from "@expo/vector-icons";
import LogoNeki from "../../assets/image/logoneki.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ApiNeki } from "../../services/apiUser";

export function Register({navigation}) {

    const [hidePass, setHidePass] = useState(true);
    const [hidePassConfirm, setHidePassConfirm] = useState(true);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onChangeLoginHandler = (login: string) => {
        setLogin(login);
      };
    
      const onChangePasswordHandler = (password: string) => {
        setPassword(password);
      };
    
      const onChangePasswordConfirmHandler = (passwordConfirm: string) => {
        setPasswordConfirm(passwordConfirm);
      };

      const onSubmitFormHandler = async () => {
        setIsLoading(true);
        try {
          const response = await ApiNeki.post("auth/registration",{
            userLogin: login,
            userPassword: password,
          });
          if (response.status === 200) {
            setIsLoading(false);
            setLogin("");
            setPassword("");
            setPasswordConfirm("");
            navigation.navigate("Login")
            // setAuth(true);
    
          }
          await AsyncStorage.setItem("id",JSON.stringify(response.data));
          alert('Conta Criada com Sucesso!')
        } catch (error) {
          alert("Houve algum erro na criação da conta");
          setIsLoading(false);
        }
      };

      const CriarConta = () => {
        if (
          password == passwordConfirm
            ? onSubmitFormHandler()
            : alert("As senhas não coincidem")
        ) {
        }
      };
    


  return (
    <View style={styles.container}>
      <Image style={styles.logoneki} source={LogoNeki} />
      <View>
        <TextInput
          placeholder="Insira um login"
          value={login}
          onChangeText={onChangeLoginHandler}
          selectionColor={"black"}
          placeholderTextColor={"white"}
          style={styles.emailbox}
        ></TextInput>
        <TextInput
          placeholder="Insira uma senha"
          value={password}
          onChangeText={onChangePasswordHandler}
          selectionColor={"black"}
          placeholderTextColor={"white"}
          secureTextEntry={hidePass}
          style={styles.emailbox}
        />
        <TouchableOpacity
          style={styles.eyevisible}
          onPress={() => setHidePass(!hidePass)}
        >
          {hidePass ? (
            <Entypo name="eye" size={28} color="black" />
          ) : (
            <Entypo name="eye-with-line" size={28} color="black" />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Confirme a senha"
          selectionColor={"black"}
          onChangeText={onChangePasswordConfirmHandler}
          value={passwordConfirm}
          placeholderTextColor={"white"}
          secureTextEntry={hidePassConfirm}
          style={styles.emailbox}
        />
        <TouchableOpacity
          style={styles.eyevisibledois}
          onPress={() => setHidePassConfirm(!hidePassConfirm)}
        >
          {hidePassConfirm ? (
            <Entypo name="eye" size={28} color="black" />
          ) : (
            <Entypo name="eye-with-line" size={28} color="black" />
          )}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => CriarConta()}
        disabled={isLoading}
        style={styles.loginbutton}
      >
        <Text style={{ color: "white" }}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
