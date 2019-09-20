import React from 'react'
import styled from 'styled-components'

const ChatBlock = styled.div`
  margin: 12px;
`

const Timestamp = styled.span`
  float: right;

  color: light-gray;
  font-size: 11px;
`

interface ChatMessageFromGraphReq {
    id: string
    content: string
    createdAt: Date
    sender: {
        id: string
        username: string
    }
}

// NOTE: For some reason this can't be used as the type for `props` below. Leaving it for clarity.
interface ChatThreadProps {
  messages: ChatMessageFromGraphReq[]
}

const ChatThread = (props: any) => {
  return props.messages.map((msg: ChatMessageFromGraphReq) => {
    return (
      <ChatBlock key={msg.id}>
        <p>{msg.sender.username}: {msg.content}<Timestamp className="msg-timestamp">{msg.createdAt}</Timestamp></p>
      </ChatBlock>
    )
  })
}

export default ChatThread
