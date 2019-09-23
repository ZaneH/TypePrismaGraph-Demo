import React from 'react'

import { FEED_LIST_QUERY } from '@phoenix/common/constants'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'

import { Post } from '@phoenix/prisma/node_modules/@generated/photon'
import idx from 'idx'

const FeedItem = styled.div`
  color: black;
  font-family: 'Roboto';
  padding: 5px 20px;
  background-color: white;
  margin: 16px;
  border-radius: 6px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.15);

  max-width: 500px;

  cursor: pointer;

  transition: all 0.1s ease-out;

  &:hover {
    background-color: #f4f4f4;
    transition: all 0.12s ease-in-out;
  }
`

const FeedList = (props: any) => {
  const { data, loading } = useQuery(FEED_LIST_QUERY)

  if (loading) {
    return null
  }

  if (idx(data, (_) => data.posts)) {
    if (data.posts.length === 0) {
      return null
    }

    return data.posts.map((p: Post) => (
      <FeedItem key={p.id} onClick={() => props.onChange(p)}>
        <h4>
          {p.title}
        </h4>
      </FeedItem>
    ))
  }

  return null
}

export default FeedList
