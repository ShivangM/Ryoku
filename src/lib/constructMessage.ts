const constructMessage = (
  name: string,
  email: string,
  verificationLink: string
) => {
  const msg = {
    from: '20bit056@ietdavv.edu.in',
    template_id: process.env.VERIFICATION_TEMPLATE_ID,
    personalizations: [
      {
        to: { email: email },
        dynamic_template_data: {
          name: name,
          verificationLink: verificationLink,
        },
      },
    ],
  };

  return msg;
};

export default constructMessage;
