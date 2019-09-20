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
      content:
        'Mollit anim et mollit anim adipisicing dolore pariatur ullamco eu nostrud sint sunt est aliqua. Ad et ea ad enim aute aliqua enim adipisicing eu dolor exercitation reprehenderit exercitation. Elit aliqua enim ipsum eiusmod ex occaecat id excepteur ullamco aliqua. Occaecat sint aliqua culpa duis non eiusmod ipsum est ex nisi consequat nulla labore. Officia exercitation id elit exercitation nulla sint labore. Mollit id do est nulla elit irure.',
      title: 'Title of my test post!',
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
      content:
        'Velit exercitation ex officia cillum veniam officia eiusmod Lorem qui magna non tempor voluptate ipsum. Qui non aliquip commodo reprehenderit incididunt consequat est proident enim aliquip mollit. Labore nostrud do cillum cillum nulla et qui pariatur cillum laboris qui excepteur.',
      title: 'Hi',
    },
  })

  const post3 = await photon.posts.create({
    data: {
      id: '3',
      author: {
        connect: {
          email: 'bob@mail.com',
        },
      },
      content: 'Laboris labore ad culpa anim cillum dolore. Enim labore ipsum quis quis adipisicing ipsum anim culpa. Ut sunt est nostrud nostrud est.',
      title: 'Test 123'
    },
  })

  console.log({ user1, user2 })
}

main().finally(async () => {
  await photon.disconnect()
})
