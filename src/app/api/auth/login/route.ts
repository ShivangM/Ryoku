import { account } from '@/utils/appwrite';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  if (!request)
    return NextResponse.json({ error: 'Invalid request' }, { status: 401 });
  const { email, password } = await request.json();

  try {
    const session = await account.createEmailSession(email, password);
    const token = jwt.sign(session, process.env.JWT_SECRET!, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });

    const res = NextResponse.json({ session: session }, { status: 200 });
    res.cookies.set({
      name: 'session',
      value: token,
      expires: new Date(Date.now() + 86400000),
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
