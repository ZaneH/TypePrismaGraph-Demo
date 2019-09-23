import Photon from '@generated/photon'
import { lorem, internet, name, image } from 'faker'
const photon = new Photon()

async function main() {
  for (let i = 100; i < 110; i++) {
    await photon.users.create({
      data: {
        id: String(i),
        email: internet.email(),
        name: name.firstName(),
        password: '$2a$10$BRzhZPeoYx1rbd6FchIw/.Qoky7BZ/hCARpL07U8qAnKai91OIFLW' /* gang */,
        picture: image.avatar(),
        username: internet.userName(),
      },
    })
  }

  const alice = await photon.users.create({
    data: {
      id: '1337',
      email: internet.email(),
      name: 'Alice Bott',
      password: '$2a$10$BRzhZPeoYx1rbd6FchIw/.Qoky7BZ/hCARpL07U8qAnKai91OIFLW' /* gang */,
      picture: image.avatar(),
      username: 'alice_',
    },
  })

  const bob = await photon.users.create({
    data: {
      id: '1338',
      email: internet.email(),
      name: 'Bob Bott',
      password: '$2a$10$BRzhZPeoYx1rbd6FchIw/.Qoky7BZ/hCARpL07U8qAnKai91OIFLW' /* gang */,
      picture: image.avatar(),
      username: 'bob_'
    }
  })

  const dan = await photon.users.create({
    data: {
      id: '1339',
      email: internet.email(),
      name: 'Dan Bott',
      password: '$2a$10$BRzhZPeoYx1rbd6FchIw/.Qoky7BZ/hCARpL07U8qAnKai91OIFLW' /* gang */,
      picture: image.avatar(),
      username: 'dan_'
    }
  })

  const post1 = await photon.posts.create({
    data: {
      id: '1337',
      author: {
        connect: {
          id: '1337',
        },
      },
      content: lorem.paragraph(),
      title: lorem.sentence(),
      published: true,
    },
  })

  const post2 = await photon.posts.create({
    data: {
      id: '1338',
      author: {
        connect: {
          id: '1337',
        },
      },
      content: lorem.paragraphs(2),
      title: lorem.sentence(),
      published: true,
    },
  })

  const post3 = await photon.posts.create({
    data: {
      id: '1339',
      author: {
        connect: {
          id: '1338',
        },
      },
      content: lorem.paragraphs(4),
      title: lorem.sentence(),
      published: true,
    },
  })
}

main().finally(async () => {
  await photon.disconnect()
})
