import React from 'react'
import PropTypes from 'prop-types'
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

export default class Sidebar extends React.Component<SidebarProps> {
  render() {
    return (
      <SidebarContainer>
        <SidebarColumn>{this.props.children}</SidebarColumn>
        <Body>{this.props.body}</Body>
      </SidebarContainer>
    )
  }

  static propTypes = {
    body: PropTypes.object,
  }
}
