import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'

import { User } from '@phoenix/prisma/node_modules/@generated/photon'
import { faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserListItemContainer = styled.div`
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

const UserListNameHeading = styled.h3`
  font-weight: 500;
  margin-bottom: 4px;

  grid-column: 2;
`

const UserListUsernameHeading = styled.h4`
  font-weight: normal;
  margin-top: 0;
  font-size: 14px;

  grid-column: 2;
`

const UserListPhoto = styled.img`
  grid-column: 1;
  grid-row: 1 / 3;
  border-radius: 1000px;
  width: 100%;
`

interface UserListItemProps {
  user: User
  onClick: MouseEventHandler
}

export default class UserListItem extends React.Component<UserListItemProps> {
  render() {
    return (
      <UserListItemContainer onClick={this.props.onClick}>
        <UserListPhoto src={this.props.user.picture} />
        <UserListNameHeading>{this.props.user.name || '(empty)'}</UserListNameHeading>
        <UserListUsernameHeading>@{this.props.user.username}</UserListUsernameHeading>
        <FontAwesomeIcon style={{position: "absolute", right: 46}} icon={faReply} />
      </UserListItemContainer>
    )
  }
}
