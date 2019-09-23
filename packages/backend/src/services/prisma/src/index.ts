import { nexusPrismaPlugin } from '@generated/nexus-prisma'
import Photon from '@generated/photon'
import { makeSchema } from 'nexus'
import { GraphQLServer } from 'graphql-yoga'
import { join } from 'path'
import { permissions } from './permissions'
// import * as allTypes from './resolvers'
import { Context } from './types'
import { getUser } from './utils'
import * as cors from 'cors'

import { AuthPayload, User, Chat, ChatMessage, Post, Query, Mutations } from './resolvers'

export const photon = new Photon()

const nexusPrisma = nexusPrismaPlugin({
  photon: (ctx: Context) => ctx.photon,
})

const schema = makeSchema({
  types: [AuthPayload, User, Chat, ChatMessage, Post, Query, Mutations, nexusPrisma],
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

server.use(
  cors({
    credentials: true,
  }),
)

server.start(() =>
  console.log(
    `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/ts/graphql-auth#6-using-the-graphql-api`,
  ),
)
