import React from 'react'
import styled from 'styled-components'

interface SidebarProps {
  body: object
}

const SidebarContainer = styled.div`
  width: auto;
  margin: 0 auto;
`

const SidebarColumn = styled.div`
  width: 25%;
  float: left;
  background-color: blue;

  z-index: 1;

  box-shadow: 0 0 12px 4px rgba(0, 0, 0, 0.13);

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;

  overflow-y: scroll;
`

const Body = styled.div`
  margin-left: 25%;
`

const Sidebar = (props: any) => {
  return (
    <SidebarContainer>
      <SidebarColumn>{props.children}</SidebarColumn>
      <Body>{props.body}</Body>
    </SidebarContainer>
  )
}

export default Sidebar
