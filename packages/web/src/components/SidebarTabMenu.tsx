import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHome, faUserFriends } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const TabMenu = styled.div`
  padding: 50px 40px;
  padding-bottom: 30px;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 5%;
  grid-gap: 10px;

  text-align: center;

  place-items: center;
`

interface SidebarTabMenuProps {
  index: number
  onChange: Function
}

export default class SidebarTabMenu extends React.Component<SidebarTabMenuProps> {
  render() {
    return (
      <TabMenu>
        <div onClick={() => this.props.onChange(0)} className={`tab ${this.props.index === 0 ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faHome} />
        </div>
        <div onClick={() => this.props.onChange(1)} className={`tab ${this.props.index === 1 ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div onClick={() => this.props.onChange(2)} className={`tab ${this.props.index === 2 ? 'active' : ''}`}>
          <FontAwesomeIcon icon={faUserFriends} />
        </div>
      </TabMenu>
    )
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  }
}
