import React from 'react';
import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [dataUser, setDataUser] = useState();

  const packageUserData = (jwt) => {
    const tokenDecoded = jwt_decode(jwt);

    var user = tokenDecoded.usuario;

    user = JSON.parse(user);

    setDataUser({
      id: user?.userId,
      userLogin: user?.userLogin,
      token: jwt,
    });
  };

  return (
    <DataContext.Provider
      value={{
        dataUser,
        packageUserData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
