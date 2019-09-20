import React from 'react'
import styled from 'styled-components'

import DetailSidebar, { DetailSidebarContentTypesEnum } from './DetailSidebar'
import ChatBox from './ChatBox'

import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'
import idx from 'idx'
import { useQuery } from '@apollo/react-hooks'
import { CHAT_INFO_QUERY } from '@phoenix/common/constants'
import ChatThread from './ChatThread'

const Container = styled.div`
  margin: 0;
  padding: 32px;
`

const ChatTitle = styled.h3`
  font-weight: 200;
  text-transform: uppercase;
`

interface ChatThreadProps {
  isAddingChat: boolean
  newChat: JSX.Element | null
  chat: Chat | null
}

const ChatThreadPage = (props: ChatThreadProps) => {
  const { loading, data } = useQuery(CHAT_INFO_QUERY, {
    variables: {
      id: props.chat ? props.chat.id : '',
    },
  })

  if (props.isAddingChat) {
    return props.newChat
  }

  if (loading) {
    return null
  }

  if (idx(data, (_) => _.chat)) {
    return (
      <Container>
        <h1>Chat</h1>
        <ChatTitle>{data.chat && data.chat.name}</ChatTitle>
        <ChatThread messages={data.chat && data.chat.messages} />
        <DetailSidebar content_type={DetailSidebarContentTypesEnum.CHAT_MEMBERS} data={data.chat.members} />
        <ChatBox chatId={data.chat.id} />
      </Container>
    )
  } else {
    return null
  }
}

export default ChatThreadPage
