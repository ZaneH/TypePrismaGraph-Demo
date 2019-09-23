import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CHAT_LIST_QUERY } from '@phoenix/common/constants'
import idx from 'idx'
import ChatListItem from './ChatListItem'

import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'

const ChatList = (props: any) => {
  const { data, loading } = useQuery(CHAT_LIST_QUERY)

  if (loading) {
    return null
  }


  if (idx(data, (_) => _.me.chats)) {
    return data.me.chats.map((c: Chat) => <ChatListItem onClick={() => props.onChange(c)} key={c.id} chat={c} />)
  } else {
    return null
  }
}

export default ChatList
