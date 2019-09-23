import styled from 'styled-components'
import React, { useState, ChangeEvent } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_CHATMESSAGE_MUTATION, CHAT_INFO_QUERY } from '@phoenix/common/constants'

const BoundingBox = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  margin-left: 25%;
  margin-right: 22%;

  z-index: 0;

  background-color: #f0f0f0;

  padding: 8px 16px;

  display: grid;
  grid-template-columns: 10fr 2fr;
  grid-template-rows: auto;
`

const TextArea = styled.textarea`
  min-width: 96%;

  border: 1px solid gray;
  border-radius: 4px;

  padding: 8px;

  grid-column: 1;
  grid-row: 1;
`

const SendButton = styled.button`
  margin: auto;
  width: 80%;
  height: 40px;
  border-radius: 8px;

  border: none;
  color: white;
  background-color: #2ecc71;
  text-transform: uppercase;

  grid-column: 2;
  grid-row: 1;

  cursor: pointer;
`

interface ChatBoxProps {
  chatId: string
}

const ChatBox = (props: ChatBoxProps) => {
  const [body, setBody] = useState('')
  const [sendMessage] = useMutation(CREATE_CHATMESSAGE_MUTATION, {
    refetchQueries: [{ query: CHAT_INFO_QUERY, variables: { id: props.chatId } }],
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
            id: props.chatId,
          },
        },
      },
    },
  })

  const handleMessageSend = async () => {
    await sendMessage()

    setBody('')
  }

  return (
    <BoundingBox>
      <TextArea placeholder='Type a message...' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setBody(e.target.value)} value={body} rows={2} />
      <SendButton onClick={handleMessageSend}>Send</SendButton>
    </BoundingBox>
  )
}

export default ChatBox
