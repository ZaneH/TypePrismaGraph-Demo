import { objectType } from 'nexus'

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

export default Post
