import jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
  const decodedToken: any = jwt.verify(
    token as string,
    process.env.EMAIL_VERIFICATION_SECRET!,
    {
      algorithms: ['HS256'],
    }
  );

  return decodedToken.userId;
};

export default verifyToken;
