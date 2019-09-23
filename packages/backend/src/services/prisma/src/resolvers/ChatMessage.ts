import { objectType } from 'nexus'

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

export default ChatMessage
