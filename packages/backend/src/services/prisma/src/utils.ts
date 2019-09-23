import { verify } from 'jsonwebtoken'
import { Context } from './types'

export const APP_SECRET = 'appsecret321'

interface Token {
  userId: string
}

// export function getUserId(context: Context) {
//   const Authorization = context.request.get('Authorization')
//   if (Authorization) {
//     const token = Authorization.replace('Bearer ', '')
//     const verifiedToken = verify(token, APP_SECRET) as Token
//     return verifiedToken && verifiedToken.userId
//   }
// }

export const getUser = (token: string) => {
  try {
    if (token) {
      return verify(token, APP_SECRET)
    }

    return null
  } catch (err) {
    return null
  }
}
