import React from 'react'

import { useQuery } from '@apollo/react-hooks'
import { USER_LIST_QUERY } from '@phoenix/common/constants'
import UserListItem from './UserListItem'

import { User } from '@phoenix/prisma/node_modules/@generated/photon'
import idx from 'idx'

const UserList = (props: any) => {
  const { loading, data } = useQuery(USER_LIST_QUERY)

  if (loading) {
    return null
  }

  if (idx(data, (_) => _.users)) {
    return data.users.map((u: User) => {
      return <UserListItem onClick={() => props.onChange(u)} key={u.id} user={u} />
    })
  } else {
    return null
  }
}

export default UserList
