import React from 'react'
import styled from 'styled-components'

// TODO: Bring up how these should be named
const DetailSidebarStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  width: 20%;
  background-color: #f0f0f0;

  z-index: 1;

  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.13);
`

const ChatMemberBlock = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  margin-bottom: 8px;
  margin-top: 8px;

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

export enum DetailSidebarContentTypesEnum {
  CHAT_MEMBERS,
}

interface DetailSidebarProps {
  content_type: DetailSidebarContentTypesEnum
  data: any
}

const DetailSidebar = (props: DetailSidebarProps) => {
  if (props.content_type === DetailSidebarContentTypesEnum.CHAT_MEMBERS) {
    return (
      <DetailSidebarStyled>
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

export default DetailSidebar
