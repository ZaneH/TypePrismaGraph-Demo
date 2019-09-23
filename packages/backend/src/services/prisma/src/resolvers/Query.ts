import { objectType } from 'nexus'
import { photon } from '..'
import idx from 'idx'

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.chat()
    t.crud.chatmessage()
    t.crud.chatmessages()

    t.crud.post()
    // TODO: Ask how would you allow the post owner to see their unpublished posts
    t.field('posts', {
      list: true,
      type: 'Post',
      resolve: async (_, __, ___) => {
        return await photon.posts.findMany({
          where: {
            published: true,
          },
        })
      },
    })

    t.crud.user()
    t.crud.users()

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_, __, ctx) => {
        if (idx(ctx, (_) => _.user.userId)) {
          const meUser = ctx.photon.users.findOne({ where: { id: ctx.user.userId } })
          return meUser
        }

        return null
      },
    })
  },
})

export default Query