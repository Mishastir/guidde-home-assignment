import { registerAs } from '@nestjs/config';
import { CONFIG_KEY_DATABASE } from '../constants';

export default registerAs(CONFIG_KEY_DATABASE, () => ({
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
}));
