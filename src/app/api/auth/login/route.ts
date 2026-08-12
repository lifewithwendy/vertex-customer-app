import { NextResponse } from 'next/server'
import { createSession } from '@/lib/session'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
    }

    const usersFilePath = path.join(process.cwd(), 'data', 'users.json')
    const usersData = await fs.readFile(usersFilePath, 'utf8')
    const users = JSON.parse(usersData)

    const user = users.find((u: any) => u.email === email && u.password === password)

    if (!user) { 
       return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    await createSession(email)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
