import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

const secret = process.env.SECRET

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret })
    console.log(token)

    return NextResponse.json(token);
}