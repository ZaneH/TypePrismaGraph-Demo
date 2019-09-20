import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION } from '@phoenix/common/constants'
import { useMutation } from '@apollo/react-hooks'
import { withRouter, RouteComponentProps } from 'react-router'
import idx from 'idx'

const Onboarding = styled.div`
  margin: auto;
  margin-top: 10%;
  width: 60%;
  height: 400px;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 3px 8px 2px rgba(0, 0, 0, 0.1);
`

const OnboardingTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 0;
  margin-top: 0;

  grid-column: 1;
`

const OnboardingSubtitle = styled.h5`
  margin-top: 4px;
  font-weight: normal;
  font-size: 18px;

  grid-column: 1;
`

const OnboardingError = styled.h6`
  color: red;
  font-weight: bold;

  grid-column: 1;
`

const Container = styled.div`
  margin: 16px;
  margin-bottom: 0;
  padding: 20px 10px;
  margin-top: 30px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 12px;
`

const OnboardingFormField = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;

  grid-column: 2;
  align-items: center;

  margin: 0;
  padding: 0;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 6px;
  border: 1px gray solid;
  width: 100%;
  box-sizing: border-box;
`

const Button = styled.button`
  border: none;
  padding: 15px 30px;
  border-radius: 1000px;
  background-color: blue;
  float: right;
  color: white;
  margin: auto;
  margin-right: 28px;
  margin-top: 10px;
  cursor: pointer;
`

const HollowButton = styled.button`
  border: none;
  padding: 15px 30px;
  border-radius: 1000px;
  background-color: white;
  float: right;
  border: 1px solid gray;
  color: gray;
  margin: auto;
  margin-right: 8px;
  margin-top: 10px;
  cursor: pointer;
`

export const OnboardingPage = (props: RouteComponentProps) => {
  const [isCreatingAnAccount, setIsCreatingAnAccount] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [signUp] = useMutation(CREATE_USER_MUTATION, {
    variables: {
      email,
      name,
      password,
      username,
    },
  })

  const [signIn] = useMutation(SIGNIN_USER_MUTATION, {
    variables: {
      email,
      password,
    },
  })

  const handleCreateAnAccountPressed = () => {
    if (isCreatingAnAccount) {
      setIsCreatingAnAccount(false)
    } else {
      setIsCreatingAnAccount(true)
    }
  }

  const handleSignUpPressed = async () => {
    if (!!name || !!password || !!email || !!username) {
      return
    }

    const res = await signUp()

    if (idx(res, (_) => _.data.login.token)) {
      localStorage.setItem('user/token', res.data.login.token)
      if (idx(res, (_) => _.data.login.user)) {
        localStorage.setItem('user/id', res.data.login.user.id)
      }

      props.history.push('/app/feed')
    } else {
      setError('Invalid information')
    }
  }

  const handleSignInPressed = async () => {
    const res = await signIn()

    if (idx(res, (_) => _.data.login.token)) {
      localStorage.setItem('user/token', res.data.login.token)
      if (idx(res, (_) => _.data.login.user)) {
        localStorage.setItem('user/id', res.data.login.user.id)
      }
      
      props.history.push('/app/feed')
    } else {
      setError('Invalid credentials')
    }
  }

  const renderSignIn = () => {
    return (
      <Onboarding>
        <Container>
          <OnboardingTitle>Have an account? Sign in!</OnboardingTitle>
          <OnboardingSubtitle>If not, create an account.</OnboardingSubtitle>
          {!!error && <OnboardingError>{error}</OnboardingError>}

          <OnboardingFormField style={{ gridRow: 1 }}>
            <label htmlFor="email">Email:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="text"
              name="email"
              id="email"
            />
          </OnboardingFormField>
          <OnboardingFormField style={{ gridRow: 2 }}>
            <label htmlFor="email">Password:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              name="password"
              id="password"
            />
          </OnboardingFormField>
        </Container>

        <Button onClick={handleSignInPressed}>
          <b>Sign In</b>
        </Button>
        <HollowButton onClick={handleCreateAnAccountPressed}>Create an Account</HollowButton>
      </Onboarding>
    )
  }

  const renderCreateAnAccount = () => {
    return (
      <Onboarding>
        <Container>
          <OnboardingTitle>Sign Up!</OnboardingTitle>
          <OnboardingSubtitle>We'll ask for your SSN later.</OnboardingSubtitle>
          {!!error && <OnboardingError>{error}</OnboardingError>}

          <OnboardingFormField style={{ gridRow: 1 }}>
            <label htmlFor="name">Name:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setName(e.target.value)
              }}
              type="text"
              name="name"
              id="name"
            />
          </OnboardingFormField>
          <OnboardingFormField style={{ gridRow: 2 }}>
            <label htmlFor="email">Email:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value)
              }}
              type="text"
              name="email"
              id="email"
            />
          </OnboardingFormField>
          <OnboardingFormField style={{ gridRow: 3 }}>
            <label htmlFor="username">Username:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setUsername(e.target.value)
              }}
              type="text"
              name="username"
              id="username"
            />
          </OnboardingFormField>
          <OnboardingFormField style={{ gridRow: 4 }}>
            <label htmlFor="password">Password:</label>
            <Input
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value)
              }}
              type="password"
              name="password"
              id="password"
            />
          </OnboardingFormField>
        </Container>

        <Button onClick={handleSignUpPressed}>
          <b>Sign Up</b>
        </Button>
        <HollowButton onClick={handleCreateAnAccountPressed}>Back to Sign In</HollowButton>
      </Onboarding>
    )
  }

  return isCreatingAnAccount ? renderCreateAnAccount() : renderSignIn()
}

export default withRouter(OnboardingPage)
