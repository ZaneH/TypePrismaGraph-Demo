import Photon from '@generated/photon'
const photon = new Photon()

async function main() {
  const user1 = await photon.users.create({
    data: {
      id: '1',
      email: 'bob@mail.com',
      name: 'bob',
      password: '$2b$10$ZjONRZAxqX2pLoPax2xdcuzABTUEsFanQI6yBYCRtzpRiU4/X1uIu',
      picture: 'http://placekitten.com/300/300',
      username: 'bobs_belly',
    },
  })

  const user2 = await photon.users.create({
    data: {
      id: '2',
      email: 'alice@mail.com',
      name: 'alice',
      password: '$2b$10$o6KioO.taArzboM44Ig85O3ZFZYZpR3XD7mI8T29eP4znU/.xyJbW',
      picture: 'http://placekitten.com/300/300',
      username: 'alice5',
    },
  })

  const post1 = await photon.posts.create({
    data: {
      id: '1',
      author: {
        connect: {
          email: 'alice@mail.com',
        },
      },
      content: 'gang content content content',
      title: 'Gang Title!'
    },
  })

  const post2 = await photon.posts.create({
    data: {
      id: '2',
      author: {
        connect: {
          email: 'bob@mail.com',
        },
      },
      content: 'this is bob\'s content. nothing better!',
      title: 'Bob\'s Content'
    },
  })

  console.log({ user1, user2 })
}

main().finally(async () => {
  await photon.disconnect()
})
