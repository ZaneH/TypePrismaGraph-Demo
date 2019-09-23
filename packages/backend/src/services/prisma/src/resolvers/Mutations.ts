import { APP_SECRET } from '../utils'
import * as bcrypt from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { objectType, stringArg } from 'nexus'

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneChat()
    t.crud.createOneChatMessage()
    t.crud.createOnePost()
    t.crud.createOneUser()

    t.crud.deleteOneChat()
    t.crud.deleteOneChatMessage()
    t.crud.deleteOnePost()
    t.crud.deleteOneUser()

    t.crud.updateOneChat()
    t.crud.updateOneChatMessage()
    t.crud.updateOnePost()
    t.crud.updateOneUser()

    t.field('signup', {
      type: 'AuthPayload',
      args: {
        name: stringArg(),
        username: stringArg(),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { name, username, email, password }, ctx) => {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await ctx.photon.users.create({
          data: {
            name,
            username,
            email,
            password: hashedPassword,
            picture: 'https://s.ytimg.com/yts/img/avatar_720-vflYJnzBZ.png',
          },
        })

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.photon.users.findOne({ where: { email } })

        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        }
      },
    })
  },
})

export default Mutation
