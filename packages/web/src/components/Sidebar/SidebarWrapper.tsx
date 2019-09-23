import React from 'react'
import Sidebar from './Sidebar'
import SidebarTabMenu from './SidebarTabMenu'
import UserList from '../Users/UserList'
import ChatList from '../Chat/ChatList'
import ChatThreadPage from '../Chat/ChatThreadPage'
import FeedDetail from '../Feed/FeedDetail'
import FeedList from '../Feed/FeedList'
import CreateChatForm from '../Chat/CreateChatForm'

import { Post, User, Chat } from '@phoenix/prisma/node_modules/@generated/photon'
import styled from 'styled-components'
import CreateFeedPostForm from '../Feed/CreateFeedPostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTimes } from '@fortawesome/free-solid-svg-icons'

import { RouteComponentProps, withRouter } from 'react-router-dom'
import idx from 'idx'
import SettingsPage from '../Settings/SettingsPage'

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
  line-height: 62px;

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
      isAddingFeedPost: !!idx(this.props, (_) => _.location.state.isAddingFeedPost),
      isAddingChat: !!idx(this.props, (_) => _.location.state.prefillUsername),
      transitioningToChat: false,
      toName: idx(this.props, (_) => _.location.state.prefillUsername) || '',
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
            <SidebarTabMenu onChange={() => {}} />
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
                newChat={<CreateChatForm to={this.state.toName} />}
                chat={this.state.visibleChat}
              />
            }
          >
            <SidebarTabMenu onChange={() => {}} />
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
                // newChat will be passed CreateChatForm. If !!to then it will prefill the CreateChatForm username field
                newChat={<CreateChatForm to={idx(this.props, (_) => _.location.state.prefillUsername) || ''} />}
                chat={this.state.visibleChat}
              />
            }
          >
            <SidebarTabMenu onChange={() => {}} />
            <UserList
              onChange={(u: User) => {
                this.props.history.push('/app/chat', {
                  prefillUsername: u.username,
                })
              }}
            />
          </Sidebar>
        )
      case 3:
        return (
          <Sidebar body={<SettingsPage />}>
            <SidebarTabMenu onChange={() => {}} />
          </Sidebar>
        )
    }
  }
}

export default withRouter(SidebarWrapper)
