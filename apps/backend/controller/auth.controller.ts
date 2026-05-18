import type { Request, Response } from 'express'
import secrets from '@repo/secrets'
import prisma from '@repo/db'

export const googleLogin = (_req: Request, res: Response) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${secrets.GOOGLE_CLIENT_ID}&redirect_uri=${secrets.GOOGLE_AUTH_REDIRECT_URL}&response_type=code&scope=openid%20email%20profile`
    res.redirect(url)
}

export const googleCallback = async (req: Request, res: Response) => {
    try {
        const { code } = req.query

        if (!code) {
            res.status(400).json({ error: 'Missing authorization code' })
            return
        }

        const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                code,
                client_id: secrets.GOOGLE_CLIENT_ID,
                client_secret: secrets.GOOGLE_CLIENT_SECRET,
                redirect_uri: secrets.GOOGLE_AUTH_REDIRECT_URL,
                grant_type: 'authorization_code'
            })
        })

        const tokenData = await tokenResponse.json() as { access_token: string }

        if (!tokenData.access_token) {
            res.status(400).json({ error: 'Failed to get access token' })
            return
        }

        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` }
        })

        const userData = await userResponse.json() as {
            id: string
            email: string
            name: string
            picture: string
        }

        const user = await prisma.user.upsert({
            where: { googleId: userData.id },
            update: {
                name: userData.name,
                email: userData.email,
                avatar: userData.picture
            },
            create: {
                googleId: userData.id,
                email: userData.email,
                name: userData.name,
                avatar: userData.picture
            }
        })

        res.status(200).json({ message: 'Login successful', user })

    } catch (error) {
        console.error('Google auth error:', error)
        res.status(500).json({ error: 'Authentication failed' })
    }
}
