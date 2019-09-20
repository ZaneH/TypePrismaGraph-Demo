import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { CHAT_LIST_QUERY } from '@phoenix/common/constants'
import idx from 'idx'
import ChatListItem from './ChatListItem'

import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'

const ChatList = (props: any) => {
  const { data, loading } = useQuery(CHAT_LIST_QUERY, {
    variables: {
      id: localStorage.getItem('user/id'),
    },
  })

  if (loading) {
    return null
  }

  if (idx(data, (_) => _.user.chats)) {
    return data.user.chats.map((c: Chat) => <ChatListItem onClick={() => props.onChange(c)} key={c.id} chat={c} />)
  } else {
    return null
  }
}

export default ChatList
