import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [appUrl, setAppUrl] = useState('http://localhost/'); //192.168.1.3
  const [imgUrl, setImgUrl] = useState('http://localhost/images/');
  const [userId,setUserId] = useState('');
  const [sessionId,setSessionId] = useState('');
  const [currentGame, setCurrentGame] = useState('');

  const contextValue = {
    appUrl,
    setAppUrl,
    userId,
    setUserId,
    sessionId,
    setSessionId,
    currentGame,
    setCurrentGame,
    imgUrl,
    setImgUrl,
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
