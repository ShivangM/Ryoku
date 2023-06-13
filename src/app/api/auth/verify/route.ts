import verifyToken from '@/lib/verifyToken';
import { NextResponse } from 'next/server';
import sdk from 'node-appwrite';

const sdkClient = new sdk.Client();

sdkClient
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
  .setKey(process.env.APPWRITE_API_KEY!);

export async function GET(request: Request) {
  const users = new sdk.Users(sdkClient);
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });

  try {
    const userId = verifyToken(token);
    if (!userId)
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    await users.updateEmailVerification(userId, true);

    return NextResponse.redirect('http://localhost:3000/login?verified=true'); // Email verified, redirect to login page with verification success message
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
