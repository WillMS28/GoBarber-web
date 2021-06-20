import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiLock, FiUser, FiMail } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'


import getValidationErros from '../../util/getValidationErros'

import logoImg from '../../assets/logo.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(async ( data: object ) => {
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

    } catch (err) {

      const errors = getValidationErros(err)

      formRef.current?.setErrors(errors)



      const errorToJSON = JSON.stringify(err)
      const JSONToObj = JSON.parse(errorToJSON)

      console.log(JSONToObj)
    }
  }, [])

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
