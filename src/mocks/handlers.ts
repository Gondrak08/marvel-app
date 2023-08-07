// src/mocks/handlers.js
import { rest } from 'msw'

interface MockedUser {
  email: string,
  password: string,
}
const mockedUser: MockedUser = {
  email: 'teste@exemplo.com',
  password: "password"
}

export const handlers = [

  // rest.post('http://localhost:3000/api/auth/callback/credentials', (req, res, ctx) => {
  //   console.log('hello from callback-->', req )
  //   if (!req.body) return res(ctx.status(404, 'no body'));
  //   const formData: any = req?.body;
  //   const params = new URLSearchParams(formData);

  //   const email = params.get('email');
  //   const password = params.get('password');

  //   if (email === mockedUser.email && password !== mockedUser.password) {
  //     console.log('hello from callback-->', 'wrong password' )
      
  //     return res(

  //       ctx.status(404, 'wrong password, try it again!'),
  //     )
  //   } else if (email === mockedUser.email && password === mockedUser.password) {
  //     console.log('hello from callback-->', 'right email' )

  //     return res(
  //       ctx.status(200),
  //       ctx.json({
  //         email: mockedUser.email,
  //       }

  //       )
  //     )
  //   } else {
  //     console.log('hello from callback-->', 'invalid user' )

  //     return res(
  //       ctx.status(404, 'invalid user'),
  //       ctx.json({ error: req })
  //     )
  //   }
  // }),


  rest.post('recoverPassword', (req, res, ctx) => {
    const { email}: any = req?.body
    if (email === mockedUser.email) {
      return res(
        ctx.status(200),
        ctx.json({email})
        ,
      )
    }  {  
      return res(
        ctx.status(404, 'invalid user'),
        ctx.json({ message:'Invalid user' })
      )
    } 
    
  }),

  rest.get('api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      }),
    )
  }),
]