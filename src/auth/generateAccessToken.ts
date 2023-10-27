import * as jwt from 'jsonwebtoken';

export function generateAccessToken(user: any) {
  // Data of the user to include in the token
  const payload = {
    userId: user.id,
  };

  // Generate token with secret key
  const token = jwt.sign(payload, 'uA9#ZdK@p4$g3Q7wL1*8VhO!yN', {
    expiresIn: '3h',
  });
  return token;
}
