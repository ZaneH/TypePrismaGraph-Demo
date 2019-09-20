import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'

const ChatListItemContainer = styled.div`
  color: black;
  font-family: 'Roboto';
  padding: 5px 20px;
  background-color: white;
  margin: 16px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);

  max-width: 500px;

  cursor: pointer;

  display: grid;
  grid-template-columns: 50px auto;
  grid-column-gap: 18px;

  align-items: center;

  transition: all 0.1s ease-out;

  &:hover {
    background-color: #f4f4f4;
    transition: all 0.12s ease-in-out;
  }
`

const ChatListNameHeading = styled.h3`
  font-weight: 500;
  margin-bottom: 4px;

  grid-column: 2;
`

const ChatListUsernameHeading = styled.h4`
  font-weight: normal;
  margin-top: 0;
  font-size: 11px;

  grid-column: 2;
`

const ChatListPhoto = styled.img`
  grid-column: 1;
  grid-row: 1 / 3;
  border-radius: 1000px;
  width: 100%;
`

interface ChatListItemProps {
  chat: Chat
  onClick: MouseEventHandler
}

export default class ChatListItem extends React.Component<ChatListItemProps> {
  render() {
    return (
      <ChatListItemContainer onClick={this.props.onClick}>
        <ChatListPhoto src={this.props.chat.picture} />
        <ChatListNameHeading>{this.props.chat.name || '(empty)'}</ChatListNameHeading>
        <ChatListUsernameHeading>{this.props.chat.createdAt}</ChatListUsernameHeading>
      </ChatListItemContainer>
    )
  }
}
