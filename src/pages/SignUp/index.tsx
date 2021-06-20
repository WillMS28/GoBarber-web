import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiLock, FiUser, FiMail } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import { useToast } from '../../hooks/Toast'

import getValidationErros from '../../util/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async ( data: SignUpFormData ) => {
    try {
      formRef.current?.setErrors({})


      const schema = Yup.object().shape({
        name: Yup.string().required('nome obrigatório'),
        email: Yup.string().required('email obrigatório').email('email válido'),
        password: Yup.string().min(6, 'senha obrigatória')
      })

      await schema.validate(data, {
        abortEarly: false
      })
      // registrando o usuario no banco de dados
      await api.post('/users', data)
      // redirecionando a pagina principal
      history.push('/')

      addToast({
        title: 'Cadastro realizado!',
        description: 'Seu cadastro foi realizado com sucesso, você já pode fazer longon no GoBarber!',
        type: 'success'
      })

    } catch (err) {

      if (err instanceof Yup.ValidationError) {

        const errors = getValidationErros(err)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        title: 'Erro no cadastro',
        description: 'ocorreu um erro ao fazer o cadastro, tente novamente.',
        type: 'error'
      })

      //const errorToJSON = JSON.stringify(err)
      //const JSONToObj = JSON.parse(errorToJSON)

      //console.log(JSONToObj)
    }
  }, [addToast, history])

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit} >
            <h1>Faça seu cadastro</h1>

            <Input name='name' icon={FiUser} placeholder='Nome' />

            <Input name='email' icon={FiMail} placeholder='E-mail' />

            <Input name='password' icon={FiLock} type="password" placeholder='Senha' />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
              Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>

    </Container>
  )
}

export default SignUp
