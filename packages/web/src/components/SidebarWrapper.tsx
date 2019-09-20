import React from 'react'
import Sidebar from './Sidebar'
import SidebarTabMenu from './SidebarTabMenu'
import UserList from './UserList'
import ChatList from './ChatList'
import ChatThreadPage from './ChatThreadPage'
import FeedDetail from './FeedDetail'
import FeedList from './FeedList'
import CreateChatForm from './CreateChatForm'

import { Post, User, Chat } from '@phoenix/prisma/node_modules/@generated/photon'
import styled from 'styled-components'
import CreateFeedPostForm from './CreateFeedPostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { RouteComponentProps, withRouter } from 'react-router-dom'

const PlusButton = styled.div`
  width: 60px;
  height: 60px;
  background-color: #ff0040;
  color: white;
  border-radius: 1000px;
  text-align: center;
  vertical-align: middle;

  font-size: 28px;
  margin: auto;
  margin-bottom: 16px;
  line-height: 60px;

  cursor: pointer;

  position: absolute;
  right: 30px;
  bottom: 40px;

  box-shadow: 2px 2px 12px 4px rgba(255, 0, 64, 0.3);
`

interface SidebarWrapperState {
  index: number
  visibleFeedPost: Post | null
  visibleChat: Chat | null
  isAddingFeedPost: boolean
  isAddingChat: boolean
  transitioningToChat: boolean
  toName: string
}

class SidebarWrapper extends React.Component<RouteComponentProps, SidebarWrapperState> {
  constructor(props: any) {
    super(props)

    this.state = {
      index: !!props.sidebar ? props.sidebar : 0,
      visibleFeedPost: null,
      visibleChat: null,
      isAddingFeedPost: false,
      isAddingChat: false,
      transitioningToChat: false,
      toName: '',
    }
  }

  feedPlusButtonPressed() {
    // cancel if already adding
    if (this.state.isAddingFeedPost) {
      this.setState({
        isAddingFeedPost: false,
      })
    } else {
      this.setState({
        isAddingFeedPost: true,
      })
    }
  }

  chatPlusButtonPressed() {
    // cancel if already adding
    if (this.state.isAddingChat) {
      this.setState({
        isAddingChat: false,
      })
    } else {
      this.setState({
        isAddingChat: true,
      })
    }
  }

  static getDerivedStateFromProps(props: any, state: any) {
    if (!!state.toName) {
    }

    return null
  }

  render() {
    switch (this.state.index) {
      case 0:
        return (
          <Sidebar
            body={
              <FeedDetail
                isMakingNewPost={this.state.isAddingFeedPost}
                newPost={<CreateFeedPostForm />}
                post={this.state.visibleFeedPost}
              />
            }
          >
            <SidebarTabMenu
              onChange={(i: number) => this.setState({ index: i, isAddingFeedPost: false, isAddingChat: false })}
            />
            <PlusButton onClick={() => this.feedPlusButtonPressed()}>
              <FontAwesomeIcon icon={this.state.isAddingFeedPost ? faTimes : faPlus} />
            </PlusButton>
            <FeedList
              onChange={(p: Post) => {
                this.setState({ visibleFeedPost: p, isAddingFeedPost: false, isAddingChat: false })
              }}
            />
          </Sidebar>
        )
      case 1:
        return (
          <Sidebar
            body={
              <ChatThreadPage
                isAddingChat={this.state.isAddingChat}
                newChat={<CreateChatForm to={this.state.toName || ''} />}
                chat={this.state.visibleChat}
              />
            }
          >
            <SidebarTabMenu
              onChange={(i: number) => this.setState({ index: i, isAddingFeedPost: false, isAddingChat: false })}
            />
            <PlusButton onClick={() => this.chatPlusButtonPressed()}>
              <FontAwesomeIcon icon={this.state.isAddingChat ? faTimes : faPlus} />
            </PlusButton>
            <ChatList
              onChange={(c: Chat) => {
                this.setState({ visibleChat: c, isAddingChat: false, isAddingFeedPost: false })
              }}
            />
          </Sidebar>
        )
      case 2:
        return (
          <Sidebar
            body={
              <ChatThreadPage
                isAddingChat={this.state.isAddingChat}
                newChat={<CreateChatForm to={this.state.toName || ''} />}
                chat={this.state.visibleChat}
              />
            }
          >
            <SidebarTabMenu
              onChange={(i: number) => this.setState({ index: i, isAddingFeedPost: false, isAddingChat: false })}
            />
            <UserList
              onChange={(u: User) => {
                this.setState({
                  transitioningToChat: true,
                  isAddingFeedPost: false,
                  isAddingChat: true,
                  toName: u.username,
                })
              }}
            />
          </Sidebar>
        )
    }
  }
}

export default withRouter(SidebarWrapper)
