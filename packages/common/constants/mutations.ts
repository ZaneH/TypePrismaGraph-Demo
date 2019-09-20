import gql from 'graphql-tag'

export const CREATE_POST_MUTATION = gql`
mutation($data: PostCreateInput!) {
    createOnePost(data: $data) {
        id
        title
    }
}
`

export const CREATE_USER_MUTATION = gql`
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