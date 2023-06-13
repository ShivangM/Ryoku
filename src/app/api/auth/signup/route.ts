import { account, ID } from '@/utils/appwrite';
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
import constructMessage from '@/lib/constructMessage';
import generateVerificationToken from '@/lib/generateVerificationToken';
import generateVerificationLink from '@/lib/generateVerificationLink';

export async function POST(request: Request) {
  if (!request)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  const { name, email, password, confirmPassword } = await request.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: 'Passwords do not match' },
      { status: 401 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters' },
      { status: 401 }
    );
  }

  try {
    const user = await account.create(ID.unique(), email, password, name);
    const verificationToken = generateVerificationToken(user.$id);
    const verificationLink = generateVerificationLink(verificationToken);
    const msg = constructMessage(name, email, verificationLink);
    await sgMail.send(msg as any);

    return NextResponse.json(
      {
        message:
          'Account created successfully, Please verify your account to continue. Check your email for verification link.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
