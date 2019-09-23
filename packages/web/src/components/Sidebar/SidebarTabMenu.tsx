import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHome, faUserFriends, faCog } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const TabMenu = styled.div`
  padding: 50px 40px;
  padding-bottom: 30px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 5%;
  grid-gap: 10px;

  text-align: center;

  place-items: center;
`

interface SidebarTabMenuProps {
  onChange: Function
}

export default class SidebarTabMenu extends React.Component<SidebarTabMenuProps> {
  render() {
    return (
      <TabMenu>
        <NavLink to="/app/feed" onClick={() => this.props.onChange(0)} className="tab" activeClassName="active">
          <FontAwesomeIcon icon={faHome} />
        </NavLink>
        <NavLink to="/app/chat" onClick={() => this.props.onChange(1)} className="tab" activeClassName="active">
          <FontAwesomeIcon icon={faComment} />
        </NavLink>
        <NavLink to="/app/people" onClick={() => this.props.onChange(2)} className="tab" activeClassName="active">
          <FontAwesomeIcon icon={faUserFriends} />
        </NavLink>
        <NavLink to="/app/settings" onClick={() => this.props.onChange(3)} className="tab" activeClassName="active">
          <FontAwesomeIcon icon={faCog} />
        </NavLink>
      </TabMenu>
    )
  }
}
