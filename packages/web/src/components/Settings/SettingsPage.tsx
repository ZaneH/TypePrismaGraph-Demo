import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'

import idx from 'idx'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { ME_DETAILS_QUERY, UPDATE_SETTINGS_MUTATION } from '@phoenix/common/constants'

const Container = styled.form`
  background-color: white;

  border-radius: 6px;

  width: 40%;

  text-align: left;
  margin: 0;
  padding: 32px;
`

const SettingsTitle = styled.h3`
  font-weight: 200;
  text-transform: uppercase;
`

const FormField = styled.div`
  display: grid;

  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  margin-bottom: 12px;

  align-items: center;
`

const Submit = styled.button`
  background-color: blue;
  padding: 10px 15px;
  border: 0;
  border-radius: 1000px;
  color: white;
  float: right;

  margin-top: 10px;

  cursor: pointer;

  font-size: 13px;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 6px;
  border: 1px gray solid;
  width: 100%;
  box-sizing: border-box;
`

interface SettingsFormProps {
  me?: {
    id: string
    email: string
    name: string
    username: string
  }
}

const SettingsForm = (props: SettingsFormProps) => {
  const [name, setName] = useState(props.me && props.me.name)
  const [email, setEmail] = useState(props.me && props.me.email)
  const [username, setUsername] = useState(props.me && props.me.username)
  const [password, setPassword] = useState('')

  const [updateSettings] = useMutation(UPDATE_SETTINGS_MUTATION, {
    variables: {
      where: {
        id: localStorage.getItem('user/id'),
      },
      data: {
        ...(!!name && props.me && name !== props.me.name && { name }),
        ...(!!username && props.me && username !== props.me.username && { username }),
        ...(!!email && props.me && email !== props.me.email && { email }),
      },
    },
  })

  const handleSettingsSavePressed = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updateSettings()
  }

  if (!idx(props, (_) => _.me)) {
    return (
      <Container>
        <SettingsTitle>Settings</SettingsTitle>
        <p>There was an error loading your settings.</p>
      </Container>
    )
  }

  return (
    <Container onSubmit={handleSettingsSavePressed}>
      <h1>Settings</h1>
      <FormField>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
        />
      </FormField>
      <FormField>
        <label htmlFor="email">Email:</label>
        <Input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value)
          }}
        />
      </FormField>
      <FormField>
        <label htmlFor="username">Username:</label>
        <Input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }}
        />
      </FormField>
      <FormField>
        <label htmlFor="password">Password:</label>
        <Input
          type="text"
          id="password"
          name="password"
          value={password}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }}
        />
      </FormField>

      <Submit>Save</Submit>
    </Container>
  )
}

const SettingsPage = () => {
  const { loading, data } = useQuery(ME_DETAILS_QUERY)

  if (loading || data === undefined) {
    return null
  }

  try {
    return <SettingsForm me={data.me} />
  } catch (e) {
    return (
      <Container>
        <h1>Settings</h1>
        <p>There was an error loading your settings.</p>
      </Container>
    )
  }
}

export default SettingsPage
