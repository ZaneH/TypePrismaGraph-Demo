import { objectType } from 'nexus'

const Chat = objectType({
  name: 'Chat',
  definition(t) {
    t.model.id()
    t.model.isArchived()
    t.model.createdAt()
    t.model.members()
    t.model.messages()
    t.model.name()
    t.model.owner()
    t.model.picture()
    t.model.updatedAt()
  },
})

export default Chat
