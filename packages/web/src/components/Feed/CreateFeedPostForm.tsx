import React, { FormEvent, useState, ChangeEvent } from 'react'
import styled from 'styled-components'

import { CREATE_POST_MUTATION, FEED_LIST_QUERY, UPDATE_POST_MUTATION } from '@phoenix/common/constants'
import { useMutation } from '@apollo/react-hooks'

const Container = styled.form`
  background-color: white;

  border-radius: 6px;

  width: 40%;

  text-align: left;
  margin: 0;
  padding: 32px;
`

const FormField = styled.div`
  display: grid;

  grid-template-columns: 1fr 3fr;
  grid-gap: 20px;
  margin-bottom: 12px;
`

const Submit = styled.button`
  background-color: blue;
  padding: 10px 15px;
  border: 0;
  border-radius: 1000px;
  color: white;
  float: right;

  margin-top: 10px;

  cursor: pointer;

  font-size: 13px;
`

const Input = styled.input`
  border: none;
  padding: 10px;
  border-radius: 6px;
  border: 1px gray solid;
  width: 100%;
  box-sizing: border-box;
`

const TextArea = styled.textarea`
  border: none;
  padding: 10px
  border-radius: 6px;
  border: 1px gray solid;
  box-sizing: border-box;
`

interface CreateFeedPostFormProps {
  id?: string
  title?: string
  content?: string
}

let prefilledTitle = ''
let prefilledContent = ''

const CreateFeedPostForm = (props: CreateFeedPostFormProps) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [isEditingPost, setEditingPost] = useState(false)

  const [createPost] = useMutation(CREATE_POST_MUTATION, {
    variables: {
      data: {
        title,
        content: body,
        published: true,
        author: {
          connect: {
            id: localStorage.getItem('user/id'),
          },
        },
      },
    },
    refetchQueries: [{ query: FEED_LIST_QUERY }],
  })

  const [updatePost] = useMutation(UPDATE_POST_MUTATION, {
    variables: {
      where: {
        id: props.id,
      },
      data: {
        title: title,
        content: body,
      },
    },
  })

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value || '')
  }

  const handleBodyChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value || '')
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (isEditingPost) {
      await updatePost()
    } else {
      await createPost()
    }

    setTitle('')
    setBody('')
  }

  // check if there's incoming date from pressing "Edit"
  if (!!props.title && prefilledTitle !== props.title) {
    setTitle(props.title)
    prefilledTitle = props.title
    setEditingPost(true)
  }

  if (!!props.content && prefilledContent !== props.content) {
    setBody(props.content)
    prefilledContent = props.content
    setEditingPost(true)
  }

  return (
    <Container onSubmit={(e) => handleSubmit(e)}>
      <h1>New Post</h1>
      <FormField>
        <label>Title</label>
        <Input value={title} type="text" name="title" onChange={handleTitleChange} />
      </FormField>
      <FormField>
        <label>Body</label>
        <TextArea value={body} rows={5} onChange={handleBodyChange} />
      </FormField>
      <Submit>Submit</Submit>
    </Container>
  )
}

export default CreateFeedPostForm
