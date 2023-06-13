const generateVerificationLink = (verificationToken: string) => {
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  const host =
    process.env.NODE_ENV === 'development'
      ? 'localhost:3000'
      : process.env.VERCEL_URL;
  const apiRoute = '/api/auth/verify';
  const verificationLink = `${protocol}://${host}${apiRoute}?token=${verificationToken}`;

  return verificationLink;
};

export default generateVerificationLink;
