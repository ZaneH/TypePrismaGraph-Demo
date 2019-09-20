import { nexusPrismaPlugin } from '@generated/nexus-prisma'
import Photon from '@generated/photon'
import { makeSchema, objectType, stringArg } from 'nexus'
import { GraphQLServer } from 'graphql-yoga'
import { join } from 'path'
import { permissions } from './permissions'
// import * as allTypes from './resolvers'
import { Context } from './types'
import * as bcrypt from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { APP_SECRET } from './utils'
import idx from 'idx'

// TODO: Refactor
const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.chat()
    t.crud.chatmessage()
    t.crud.chatmessages()
    t.crud.chats()

    t.crud.post()
    t.crud.posts()

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
    }),
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

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.chats()
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

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.content()
    t.model.createdAt()
    t.model.published()
    t.model.title()
    t.model.updatedAt()
  },
})

const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.members()
    t.model.messages()
    t.model.name()
    t.model.owner()
    t.model.picture()
    t.model.updatedAt()
  },
})

const ChatMessage = objectType({
  name: 'ChatMessage',
  definition(t) {
    t.model.id()
    t.model.content()
    t.model.createdAt()
    t.model.sender()
    t.model.chat()
  },
})

const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
})

const schema = makeSchema({
  types: [AuthPayload, User, Chat, ChatMessage, Post, Query, Mutation, nexusPrisma],
  outputs: {
    typegen: join(__dirname, '../generated/nexus-typegen.ts'),
    schema: join(__dirname, '/schema.graphql'),
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@generated/photon',
        alias: 'photon',
      },
      {
        source: join(__dirname, 'types.ts'),
        alias: 'ctx',
      },
    ],
    contextType: 'ctx.Context',
  },
})

const getUser = (token: string) => {
  try {
    if (token) {
      return verify(token, APP_SECRET)
    }

    return null
  } catch (err) {
    return null
  }
}

const server = new GraphQLServer({
  schema,
  middlewares: [permissions],
  context: (request) => {
    const tokenWithBearer = request.request.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)

    return {
      ...request,
      user,
      photon,
    }
  },
})

server.start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#6-using-the-graphql-api`,
  ),
)
