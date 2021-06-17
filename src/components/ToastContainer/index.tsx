import React from 'react'

import { Container } from './styles'

import Toast from './Toast'

import { ToastMessages, useToast } from '../../hooks/Toast'

interface ToastContainerProps {
  messages: ToastMessages[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {

  return (
    <Container>
      {messages.map( message => (
        <Toast key={message.id} message={message} />
      ) )}

    </Container>

  )
}

export default ToastContainer
