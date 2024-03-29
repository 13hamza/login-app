import React, { useEffect, useState, useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/context/auth context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loginStatus = localStorage.getItem('isLoggedIn');
  
  useEffect(() => {
    if (loginStatus === '1') {
      setIsLoggedIn(true);
    }
  }, [loginStatus]);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/demo anyways
    localStorage.setItem('isLoggedIn', '1'); 
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>
      <React.Fragment>
        <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </React.Fragment>
    </AuthContext.Provider>
  );
}

export default App;
