import jwt from 'jsonwebtoken';

const generateVerificationToken = (userId: string) => {
  const verificationToken = jwt.sign(
    { userId: userId },
    process.env.EMAIL_VERIFICATION_SECRET!,
    {
      expiresIn: '1h',
      algorithm: 'HS256',
    }
  );

  return verificationToken;
};

export default generateVerificationToken;
