import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CHAT_MUTATION, CHAT_LIST_QUERY } from '@phoenix/common/constants'
import { RouteComponentProps, withRouter } from 'react-router'

const Container = styled.form`
  background-color: white;

  border-radius: 6px;

  width: 40%;

  text-align: left;
  margin: 0;
  padding: 32px;
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

const TextArea = styled.textarea`
  border: none;
  padding: 10px
  border-radius: 6px;
  border: 1px gray solid;
  box-sizing: border-box;
`

interface CreateChatForm extends RouteComponentProps {
  to: string
}

const CreateChatForm = (props: CreateChatForm) => {
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState(props.to)
  const [body, setBody] = useState('')

  const [_startChat] = useMutation(CREATE_CHAT_MUTATION, {
    refetchQueries: [
      {
        query: CHAT_LIST_QUERY,
        variables: {
          id: localStorage.getItem('user/id'),
        },
      },
    ],
    variables: {
      data: {
        name: title,
        picture: 'https://i.imgur.com/sSjK3ts.png',
        owner: { connect: { id: localStorage.getItem('user/id') } },
        isArchived: false,
        members: { connect: [{ username: username }, { id: localStorage.getItem('user/id') }] },
        messages: {
          create: { content: body, type: 'TEXT', sender: { connect: { id: localStorage.getItem('user/id') } } },
        },
      },
    },
    onCompleted: () => {
      props.history.push('/')
      props.history.push('/app/chat', {
        isAddingChat: false,
        prefillUsername: ''
      })
    },
  })

  const sendMessage = async () => {
    await _startChat()
  }

  const handleSendPressed = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await sendMessage()

    setTitle('')
    setUsername('')
    setBody('')
  }

  return (
    <Container onSubmit={handleSendPressed}>
      <h1>New Chat</h1>
      <FormField>
        <label htmlFor="title">Title:</label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.target.value)
          }}
          value={title}
          type="text"
          id="title"
        />
      </FormField>
      <FormField>
        <label htmlFor="to">To:</label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }}
          value={username}
          type="text"
          id="to"
        />
      </FormField>
      <FormField>
        <label htmlFor="body">Message:</label>
        <TextArea
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            setBody(e.target.value)
          }}
          value={body}
          rows={6}
        />
      </FormField>
      <Submit>Send</Submit>
    </Container>
  )
}

export default withRouter(CreateChatForm)
