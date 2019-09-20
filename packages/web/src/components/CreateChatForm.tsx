import React, { useState, ChangeEvent, FormEvent } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CHAT_MUTATION, CHAT_LIST_QUERY, CREATE_CHATMESSAGE_MUTATION } from '@phoenix/common/constants'
import idx from 'idx'

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

/**
 * Keeps track of the last username that was prefilled into the Chat Form.
 *  I'm sure there's a better way to do this logic, but i dunno
 */
let prefilled: string = ''

const CreateChatForm = (props: any) => {
  const [title, setTitle] = useState('')
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')

  // preload state if it was provided through props
  if (!!props.to && prefilled !== props.to) {
    setUsername(props.to)
    prefilled = props.to
  }

  let createdChatId: string = ''

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
        picture: 'https://i.imgur.com/0OXxLN7.png',
        owner: { connect: { id: localStorage.getItem('user/id') } },
        members: { connect: [{ username: username }, { id: localStorage.getItem('user/id') }] },
      },
    },
  })

  const [_sendMessage] = useMutation(CREATE_CHATMESSAGE_MUTATION, {
    variables: {
      data: {
        content: body,
        type: 'TEXT',
        sender: {
          connect: {
            id: localStorage.getItem('user/id'),
          },
        },
        chat: {
          connect: {
            id: createdChatId,
          },
        },
      },
    },
  })

  const sendMessage = async () => {
    // I've 'sent a message' by
    // 1. Creating the conversation with _startChat
    // 2. Sending the message with _sendMessage
    // This ensures a new conversation every time the form is used
    const res = await _startChat()
    if (idx(res, (_) => res.data.chat.id)) {
      createdChatId = res.data.chat.id
      await _sendMessage()
    }
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

export default CreateChatForm
