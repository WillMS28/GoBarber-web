import React from "react";

import { ToastMessages, useToast } from '../../../hooks/Toast'

import { FiAlertCircle, FiXCircle } from 'react-icons/fi'

import { Container } from './styles'

interface ToastProps {
  message: ToastMessages
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  const { removeToast } = useToast()

  return (
    <Container
      type={message.type}
      hasDescription={!!message.description}
    >
      <FiAlertCircle size={20} />

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button onClick={() => removeToast(message.id)} type='button'>
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast