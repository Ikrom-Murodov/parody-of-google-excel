import { path as PROJECT_ROT } from 'app-root-path';
import { join } from 'path';

const BUILD_FOLDER_NAME = 'dist';
const SOURCE_FOLDER_NAME = 'src';
const SOURCE_DIRECTORY = join(PROJECT_ROT, SOURCE_FOLDER_NAME);
const BUILD_DIRECTORY = join(PROJECT_ROT, BUILD_FOLDER_NAME);
const HOST = 'localhost';
const PORT = 3000;

export {
  SOURCE_DIRECTORY,
  BUILD_DIRECTORY,
  HOST,
  PORT,
  PROJECT_ROT,
  SOURCE_FOLDER_NAME,
};
