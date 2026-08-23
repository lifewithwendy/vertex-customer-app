import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { decrypt } from '@/lib/session'
import fs from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const payload = await decrypt(session)
    if (!payload?.userId) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const usersFilePath = path.join(process.cwd(), 'data', 'users.json')
    const usersData = await fs.readFile(usersFilePath, 'utf8')
    const users = JSON.parse(usersData)

    const user = users.find((u: any) => u.email === payload.userId)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ name: user.name ?? user.email, role: user.role ?? 'User' })
  } catch (error) {
    console.error('Me route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
