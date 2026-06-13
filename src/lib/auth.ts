import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import prisma from './prisma'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_EXPIRE = '30d'

export interface JWTPayload {
  userId: string
  phoneNumber: string
  role: string
  iat?: number
  exp?: number
}

export async function signToken(userId: string, phoneNumber: string, role: string): Promise<string> {
  const token = jwt.sign(
    {
      userId,
      phoneNumber,
      role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    }
  )
  return token
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

export async function getAuthFromCookie(): Promise<JWTPayload | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    
    if (!token) {
      return null
    }

    const decoded = await verifyToken(token)
    return decoded
  } catch (error) {
    return null
  }
}

export async function setAuthCookie(token: string): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    })
  } catch (error) {
    console.error('Error setting cookie:', error)
  }
}

export async function clearAuthCookie(): Promise<void> {
  try {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
  } catch (error) {
    console.error('Error clearing cookie:', error)
  }
}

export async function getCurrentUser(): Promise<any | null> {
  try {
    const auth = await getAuthFromCookie()
    if (!auth) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
    })

    return user
  } catch (error) {
    return null
  }
}

export async function generateOTP(): Promise<string> {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function saveOTP(phoneNumber: string, code: string, userId?: string): Promise<void> {
  const expiresAt = new Date()
  expiresAt.setMinutes(expiresAt.getMinutes() + parseInt(process.env.OTP_EXPIRES_MINUTES || '5'))

  // Delete old OTPs for this phone number
  await prisma.oTP.deleteMany({
    where: {
      phoneNumber,
    },
  })

  // Create new OTP
  await prisma.oTP.create({
    data: {
      phoneNumber,
      code,
      expiresAt,
      userId,
    },
  })
}

export async function verifyOTP(phoneNumber: string, code: string): Promise<boolean> {
  try {
    const otp = await prisma.oTP.findFirst({
      where: {
        phoneNumber,
        code,
        expiresAt: {
          gt: new Date(),
        },
      },
    })

    if (!otp) {
      return false
    }

    // Delete used OTP
    await prisma.oTP.delete({
      where: { id: otp.id },
    })

    return true
  } catch (error) {
    return false
  }
}

export async function isAdmin(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    })
    return user?.role === 'ADMIN'
  } catch (error) {
    return false
  }
}
