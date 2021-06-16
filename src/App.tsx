import React from 'react';

import ToastContainer from './components/Toast';
import { AuthProvider } from './hooks/AuthContext'

import GlobalStyle from './styles/global'
import SignIn from './pages/SignIn'
//import SignUp from './pages/SignUp'

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider  >

    <ToastContainer />

    <GlobalStyle />
  </>
)

export default App;
