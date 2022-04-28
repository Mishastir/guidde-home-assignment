import { CONFIG_KEY_DATABASE } from '../constants';
import databaseConfig from './mongo.config';

export default () => ({
  [CONFIG_KEY_DATABASE]: databaseConfig,
})
