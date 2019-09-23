import React from 'react'
import styled from 'styled-components'

import { User } from '@phoenix/prisma/node_modules/@generated/photon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useMutation } from '@apollo/react-hooks'

import { DELETE_POST_MUTATION, FEED_LIST_QUERY, UPDATE_POST_MUTATION } from '@phoenix/common/constants'
import idx from 'idx'

const Container = styled.div`
  margin: 0;
  padding: 32px;
`

const EditChip = styled.div`
  padding: 12px 18px;
  background-color: blue;

  color: white;

  display: inline-block;
  border-radius: 1000px;

  cursor: pointer;

  margin-right: 12px;
`

const DeleteChip = styled.div`
  padding: 12px 18px;
  background-color: red;

  color: white;

  display: inline-block;
  border-radius: 1000px;

  cursor: pointer;

  margin-right: 12px;
`

const PublishChip = styled.div`
  padding: 12px 18px;
  background-color: green;

  color: white;

  display: inline-block;
  border-radius: 1000px;

  cursor: pointer;

  margin-right: 12px;
`

const ProfilePic = styled.img`
  border-radius: 1000px;
  width: 44px;
  height: 44px;
`

const AuthorBlock = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-gap: 14px;
  width: 10%;

  align-items: center;
`

// TODO: Ask about this
interface FullPostInterface {
  id: string
  author?: User
  title: string
  content: string
}

interface FeedDetailProps {
  post: FullPostInterface | null
  newPost: JSX.Element | null
  isMakingNewPost: boolean
}

const FeedDetail = (props: FeedDetailProps) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    refetchQueries: [{ query: FEED_LIST_QUERY }],
    variables: {
      where: {
        id: (props.post && props.post.id) || '',
      },
      data: {
        published: false,
      },
    },
  })

  const [publishPost] = useMutation(UPDATE_POST_MUTATION, {
    refetchQueries: [{ query: FEED_LIST_QUERY }],
    variables: {
      where: {
        id: (props.post && props.post.id) || '',
      },
      data: {
        published: false,
      }
    }
  })

  const deletePostPressed = async (id: string) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this post?')
    if (shouldDelete) {
      await deletePost()
      window.location.reload()
    }
  }

  const togglePublishPostPressed = (id: string) => {
    publishPost()
  }

  if (props.newPost && props.isMakingNewPost) {
    return props.newPost
  }

  if (props.post === null) {
    return (
      <Container>
        <h1>Feed</h1>
      </Container>
    )
  }

  const isPostOwner = () => {
    if (idx(props, (_) => _.post.author.id) === localStorage.getItem('user/id')) {
      return true
    }

    return false
  }

  return (
    <Container>
      {isPostOwner() ? (
        <EditChip onClick={() => console.log('// TODO: Impl. edit post')}>
          <FontAwesomeIcon icon={faPencilAlt} title="Edit Post" />
          <span style={{ paddingLeft: 12, paddingRight: 4 }}>Edit</span>
        </EditChip>
      ) : null}
      {isPostOwner() ? (
        <DeleteChip onClick={() => deletePostPressed((props.post && props.post.id) || '')}>
          <FontAwesomeIcon icon={faTimes} title="Delete Post" />
          <span style={{ paddingLeft: 12, paddingRight: 4 }}>Delete</span>
        </DeleteChip>
      ) : null}
      {isPostOwner() ? (
        <PublishChip onClick={() => togglePublishPostPressed((props.post && props.post.id) || '')}>
          <FontAwesomeIcon icon={faEyeSlash} title="Toggle Publish Post" />
          <span style={{ paddingLeft: 12, paddingRight: 4 }}>Unpublish</span>
        </PublishChip>
      ) : null}
      <h1>{props.post.title}</h1>
      <AuthorBlock>
        <ProfilePic src={props.post.author && props.post.author.picture} />
        <h3>{props.post.author && props.post.author.username}</h3>
      </AuthorBlock>
      <p>{props.post.content}</p>
    </Container>
  )
}

export default FeedDetail
