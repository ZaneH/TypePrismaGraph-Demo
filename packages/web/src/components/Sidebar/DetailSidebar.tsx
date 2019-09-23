import React, { useState } from 'react'
import styled from 'styled-components'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_CHAT_MUTATION, CHAT_LIST_QUERY } from '@phoenix/common/constants'
import EditChatForm from '../Chat/EditChatForm'
import { RouteComponentProps, withRouter } from 'react-router'
import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'

// TODO: How should these be named
const DetailSidebarStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 20%;
  background-color: #f0f0f0;

  padding: 26px 18px;
  overflow-y: scroll;

  z-index: 1;

  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.13);
`

const ChatMemberBlock = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  margin-bottom: 12px;
  margin-top: 12px;

  border-radius: 8px;

  overflow-y: scroll;

  padding: 28px 0;
`

const MemberContainer = styled.div`
  width: 100%;

  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 60% auto auto;

  justify-content: center;
  text-align: center;
`

const MemberPhoto = styled.img`
  border-radius: 1000px;
  width: 80px;
  height: 80px;

  grid-column: 2;
  grid-row: 1;
`

const MemberName = styled.h3`
  margin: 0;
  margin-top: 12px;

  grid-column: 2;
  grid-row: 2;
`

const MemberUsername = styled.h4`
  margin: 0;

  grid-column: 2;
  grid-row: 3;

  font-weight: normal;
  font-size: 14px;
`

const ActionButton = styled.button`
  padding: 12px 18px;

  background-color: gray;
  border: none;
  color: white;
  margin: 20px 8px;
  display: inline-block;
  border-radius: 8px;

  font-size: 14px;

  cursor: pointer;
`

const DestructiveButton = styled.button`
  padding: 12px 18px;

  background-color: #c0392b;
  border: none;
  color: white;
  margin: 20px 8px;
  display: inline-block;
  border-radius: 8px;

  font-size: 14px;

  cursor: pointer;
`

export enum DetailSidebarContentTypesEnum {
  CHAT_MEMBERS,
}

interface DetailSidebarProps extends RouteComponentProps {
  chat: Chat
  content_type: DetailSidebarContentTypesEnum
  data: any
}

const DetailSidebar = (props: DetailSidebarProps) => {
  const [isEditing, setEditing] = useState(false)

  const [deleteChat] = useMutation(DELETE_CHAT_MUTATION, {
    onCompleted: () => {
      let state = { ...props.location.state }
      delete state.prefillUsername
      props.history.push('/')
      props.history.push('/app/chat', state)
    },
    refetchQueries: [
      { query: CHAT_LIST_QUERY }
    ],
    variables: {
      where: {
        id: props.chat.id,
      },
      data: {
        isArchived: true,
      },
    },
  })

  const handleEditPressed = () => {
    setEditing(true)
  }

  const handleDeleteChatPressed = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this conversation? You cannot undo this.')

    if (confirmDelete) {
      deleteChat()
    }
  }

  if (isEditing) {
    return (
      <DetailSidebarStyled>
        <EditChatForm
          chat={props.chat}
          onCancel={() => {
            setEditing(false)
          }}
          // TODO: Should I just pass the whole object?
          members={props.data.map((member: any) => {
            return {
              id: member.id,
              picture: member.picture,
              username: member.username,
            }
          })}
        />
      </DetailSidebarStyled>
    )
  }

  if (props.content_type === DetailSidebarContentTypesEnum.CHAT_MEMBERS) {
    return (
      <DetailSidebarStyled>
        <ActionButton onClick={handleEditPressed}>Edit</ActionButton>
        <DestructiveButton onClick={handleDeleteChatPressed}>Delete Chat</DestructiveButton>
        {props.data.map((member: any) => {
          /**
           * type member {
           *   id
           *   username
           *   picture
           * }
           */

          return (
            <ChatMemberBlock key={member.id}>
              <MemberContainer>
                <MemberPhoto src={member.picture} />
                <MemberName>{member.name}</MemberName>
                <MemberUsername>@{member.username}</MemberUsername>
              </MemberContainer>
            </ChatMemberBlock>
          )
        })}
      </DetailSidebarStyled>
    )
  } else {
    return null
  }
}

export default withRouter(DetailSidebar)
