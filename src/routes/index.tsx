import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { AuthContext } from "../context/Auth";
import { DataContext } from "../context/dataContext";

import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";

export const Routes = () => {
  const { auth } = React.useContext(AuthContext);
  const { setAuth } = React.useContext(AuthContext);

  return auth ? <AppRoutes /> : <AuthRoutes />;
};
