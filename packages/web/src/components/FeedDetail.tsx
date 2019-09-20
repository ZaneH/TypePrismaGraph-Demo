import React from 'react'
import styled from 'styled-components'

import { Post } from '@phoenix/prisma/node_modules/@generated/photon'

const Container = styled.div`
  margin: 0;
  padding: 32px;
`

interface FeedDetailProps {
  post: Post | null
  newPost: JSX.Element | null
  isMakingNewPost: boolean
}

export default class FeedDetail extends React.Component<FeedDetailProps> {
  render() {
    if (this.props.newPost && this.props.isMakingNewPost) {
      return this.props.newPost
    }

    if (this.props.post === null) {
      return (
        <Container>
          <h1>Feed</h1>
        </Container>
      )
    }

    return (
      <Container>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.content}</p>
      </Container>
    )
  }
}
