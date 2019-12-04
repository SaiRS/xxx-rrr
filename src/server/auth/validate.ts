import { Request as HapiRequest } from 'hapi';
import Bcrypt from 'bcrypt';

const users = {
  john: {
    username: 'john',
    password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm', // '密码: secret'
    name: 'John Doe',
    id: '2133d32a',
  },
};

export const validate = async (
  request: HapiRequest,
  username: string,
  password: string,
) => {
  // @ts-ignore
  const user = users[username];
  if (!user) {
    return { credentials: null, isValid: false };
  }

  const isValid = await Bcrypt.compare(password, user.password);
  const credentials = { id: user.id, name: user.name };

  return { isValid, credentials };
};
