import styled, { keyframes }  from 'styled-components'
import { shade } from 'polished'

import signInbackgroundImg from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

  overflow-x: hidden;
`
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;

`

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX( -50px )
  }
  to {
    opacity: 1;
    transform: translateX( 0 )
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  place-content: center;

  width: 100%;
  max-width: 700px;

  animation: ${appearFromLeft} 1s;

  h1 {
      margin-bottom: 24px;
    }

    form {
      margin: 80px 0;
      width: 340px;
      text-align: center;
    }

    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }

    > a {
      color: #ff9000;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;

      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }

      &:hover {
        color: ${shade(0.2, '#ff9000')};
      }

    }
`

const appearFromLeftContainer = keyframes`
  from {
    opacity: 0;
    transform: translateX( 100% )
  }
  to {
    opacity: 1;
    transform: translateX( 0% )
  }
`

export const Background = styled.div`
  flex: 1;
  background: url(${signInbackgroundImg}) no-repeat center;
  background-size: cover;

  animation: ${appearFromLeftContainer} 1.5s;

`
