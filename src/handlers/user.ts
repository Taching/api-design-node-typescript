import { createJWT, hashPassword, comparePasswords } from './../modules/auth';
import prisma from '../modules/db'

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    })

    const token = createJWT(user)
    res.json({token})
}

export const signin = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
        username: req.body.username
    }
  })
  const isvalid = await comparePasswords(req.body.password, user.password)

  if(!isvalid) {
    res.status(401)
    res.json({message: 'wrong password or username'})
  }

  const token = createJWT(user)
  res.json({ token })
}