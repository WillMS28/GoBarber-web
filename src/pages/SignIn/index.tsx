import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import { useAuth } from '../../hooks/Auth'
import { useToast } from '../../hooks/Toast'

import getValidationErros from '../../util/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  // Importando do contexto
  const { signIn } = useAuth()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async ( data: SignInFormData ) => {
    try {
      formRef.current?.setErrors({})


      const schema = Yup.object().shape({
        email: Yup.string().required('Email obrigatório').email('Email inválido'),
        password: Yup.string().required('Senha obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await signIn({
        email: data.email,
        password: data.password
      })

      history.push('/dashboard')

    } catch (err) {

      if (err instanceof Yup.ValidationError) {

        const errors = getValidationErros(err)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        title: 'Erro na autenticação',
        description: 'ocorreu um erro ao fazer login, chegue suas credenciais',
        type: 'error'
      })

      //const errorToJSON = JSON.stringify(err)
      //const JSONToObj = JSON.parse(errorToJSON)
      //console.log(JSONToObj)
    }
  }, [signIn, addToast, history])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu logon</h1>

            <Input
              name='email'
              icon={FiMail}
              placeholder='E-mail'
            />

            <Input
              name='password'
              icon={FiLock}
              type="password"
              placeholder='Senha'
            />

            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn />
              Criar conta
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default SignIn
