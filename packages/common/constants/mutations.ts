import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
  mutation($data: PostCreateInput!) {
    createOnePost(data: $data) {
      id
      title
    }
  }
`

export const UPDATE_POST_MUTATION = gql`
  mutation($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updateOnePost(where: $where, data: $data) {
      id
      title
      content
    }
  }
`

export const SIGNUP_USER_MUTATION = gql`
  mutation($name: String!, $email: String!, $username: String!, $password: String!) {
    signup(name: $name, email: $email, username: $username, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export const SIGNIN_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
      token
    }
  }
`

export const CREATE_CHAT_MUTATION = gql`
  mutation($data: ChatCreateInput!) {
    createOneChat(data: $data) {
      id
      name
    }
  }
`

export const CREATE_CHATMESSAGE_MUTATION = gql`
  mutation($data: ChatMessageCreateInput!) {
    createOneChatMessage(data: $data) {
      id
      content
    }
  }
`

export const DELETE_POST_MUTATION = gql`
  mutation($where: PostWhereUniqueInput!, $data: PostUpdateInput!) {
    updateOnePost(where: $where, data: $data) {
      id
    }
  }
`

export const UPDATE_CHAT_MUTATION = gql`
  mutation($data: ChatUpdateInput!, $where: ChatWhereUniqueInput!) {
    updateOneChat(data: $data, where: $where) {
      id
      messages {
        id
        content
        createdAt
        sender {
          id
          username
        }
      }
      members {
        id
        name
        username
        picture
      }
    }
  }
`

export const UPDATE_SETTINGS_MUTATION = gql`
  mutation($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateOneUser(data: $data, where: $where) {
      id
      username
      email
      name
    }
  }
`

export const DELETE_CHAT_MUTATION = gql`
  mutation($data: ChatUpdateInput!, $where: ChatWhereUniqueInput!) {
    updateOneChat(data: $data, where: $where) {
      id
    }
  }
`
