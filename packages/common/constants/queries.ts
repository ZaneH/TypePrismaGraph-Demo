import gql from 'graphql-tag'

export const USER_LIST_QUERY = gql`
{
    users {
        id
        name
        username
        picture
    }
}
`

export const FEED_LIST_QUERY = gql`
{
    posts {
        id
        title
        content
    }
}
`

export const CHAT_LIST_QUERY = gql`
query($id: ID!) {
    user(where: { id: $id }) {
        chats {
            id
            picture
            name
            createdAt
            members {
                id
                name
            }
            owner {
                id
                username
            }
        }
    }
}
`

export const CHAT_INFO_QUERY = gql`
query($id: ID!) {
    chat(where: { id: $id }) {
        id
        members {
            id
            name
            username
            picture
        }
        name
        picture
        messages {
            id
            content
            createdAt
            sender {
                id
                username
            }
        }
    }
}
`