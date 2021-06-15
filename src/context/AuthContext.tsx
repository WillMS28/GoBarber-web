import React, { createContext,useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SignInCredencials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credencials: SignInCredencials): Promise<void>
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC = ({ children }) => {
  // armazenando as informações de user e o token
  const [data, setData] = useState<AuthState>(() => {

    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    // verificando se o token e user ja existem
    if (token && user) {
      return { token, user: JSON.parse(user) }
    }
    // se não existem, começando com um objeto vazio
    return {} as AuthState
  })

  const signIn = useCallback( async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password
    })
    // obtendo token e usuario do Back-end
    const { token, user } = response.data
    // amazenando no local storage
    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    // Preenchendo o state Data com as informações do usuario *Importante para o primeiro acesso
    setData({ token, user })
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}

// pegando o contexto e abstraindo para enviar para fora do arquivo
function useAuth():AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AutgProvider')
  }

  return context
}

export { AuthProvider, AuthContext, useAuth }
