import { objectType } from 'nexus'
import { photon } from '..'
import { Chat } from '@generated/photon'

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.chats()
    t.field('chats', {
      type: 'Chat',
      list: true,
      resolve: async (parent, _, ctx) => {
        const result = await photon.chats.findMany({
          where: {
            isArchived: false,
          },
        })

        return result
      },
    })
    t.model.chatsOwned()
    t.model.createdAt()
    t.model.email()
    t.model.name()
    t.model.picture()
    t.model.posts()
    t.model.updatedAt()
    t.model.username()
  },
})

export default User
