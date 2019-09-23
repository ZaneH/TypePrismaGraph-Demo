import React, { MouseEventHandler, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_CHAT_MUTATION, CHAT_LIST_QUERY } from '@phoenix/common/constants'
import { Chat } from '@phoenix/prisma/node_modules/@generated/photon'

const FormContainer = styled.form`
  width: 100%;
`

const FormField = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;

  align-items: center;

  margin-bottom: 18px;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 6px;
  border: 1px gray solid;
  width: 100%;
  box-sizing: border-box;
`

const XButton = styled.span`
  align-self: center;
  text-align: right;
  cursor: pointer;
`

const SmallProfilePic = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 100px;
  align-center: center;
`

const MemberItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 8px;

  margin-bottom: 8px;
`

const CancelButton = styled.div`
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

const SubmitButton = styled.div`
  padding: 12px 18px;

  background-color: #2ecc71;
  border: none;
  color: white;
  margin: 20px 8px;
  display: inline-block;
  border-radius: 8px;

  font-size: 14px;

  cursor: pointer;
`

const ChatImage = styled.img`
  width: 38px;
  height: 38px;

  margin-bottom: 12px;

  border-radius: 1000px;
`

// TODO: Ask about this
// ChatMember exists because we don't need all the fields of `User`
interface ChatMember {
  id: string
  picture: string
  username: string
}

interface EditMembersFormProps {
  chat: Chat
  members: ChatMember[]

  onCancel?: MouseEventHandler
  onSave?: MouseEventHandler
}

const EditMembersForm = (props: EditMembersFormProps) => {
  const [newMembers, setNewMembers] = useState(props.members)
  const [name, setName] = useState(props.chat.name)
  const [commaSeperatedNewMembers, setCommaSeperatedNewMembers] = useState('')

  const [updateChat] = useMutation(UPDATE_CHAT_MUTATION, {
    refetchQueries: [{ query: CHAT_LIST_QUERY }],
    variables: {
      where: {
        id: props.chat.id,
      },
      data: {
        name,
        members: {
          set: [
            ...newMembers.map((m: ChatMember) => {
              return { id: m.id }
            }),
            // spread { username: 'username' } for every user added to the comma seperated list
            ...(!!commaSeperatedNewMembers
              ? commaSeperatedNewMembers.split(',').map((username: string) => {
                  return { username: username.trim() }
                })
              : []),
          ],
        },
      },
    },
  })

  const handleDeletePressed = (member: ChatMember) => {
    const confirmDelete = window.confirm(`Are you sure you want to remove ${member.username} from the chat?`)

    if (confirmDelete) {
      setNewMembers(
        newMembers.filter((m: ChatMember) => {
          if (m.id === member.id) {
            return false
          }

          return true
        }),
      )
    }
  }

  const handleSavePressed = async (e: any) => {
    props.onSave && props.onSave(e)
    await updateChat()

    props.onCancel && props.onCancel(e)
  }

  return (
    <FormContainer>
      <CancelButton onClick={props.onCancel}>Cancel</CancelButton>
      <SubmitButton onClick={handleSavePressed}>Save</SubmitButton>
      <h3>Info:</h3>
      <FormField>
        <label htmlFor="image">Picture:</label>
        <ChatImage src={props.chat.picture} />
        <input style={{ gridColumn: 2 }} type="file" name="image" id="image" />
      </FormField>
      <FormField>
        <label htmlFor="name">Name:</label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value)
          }}
          value={name}
          type="text"
          name="name"
          id="name"
        />
      </FormField>
      <h3>Members:</h3>
      {(newMembers || props.members).map((m: ChatMember) => {
        return (
          <MemberItem key={m.id}>
            <SmallProfilePic src={m.picture} />
            <p>{m.username}</p>
            <XButton
              onClick={() => {
                handleDeletePressed(m)
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} />
            </XButton>
          </MemberItem>
        )
      })}
      <FormField>
        <label htmlFor="new-members">Add:</label>
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setCommaSeperatedNewMembers(e.target.value)
          }}
          placeholder="bob_24, john_smith"
          type="text"
          name="new-members"
          id="new-members"
        />
      </FormField>
    </FormContainer>
  )
}

export default EditMembersForm
