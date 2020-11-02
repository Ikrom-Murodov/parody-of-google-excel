// Ядро
import DevServer from 'webpack-dev-server';
import Webpack from 'webpack';
import chalk from 'chalk';

// Конфигурационный файл для режима разработки
import getDevConfig from './config/webpack.dev';

// Константы
import { HOST, PORT, BUILD_DIRECTORY } from './constans';

// Компилятор webpack
const compiler = Webpack(getDevConfig());

// Сервер
const server = new DevServer(compiler, {
  contentBase: BUILD_DIRECTORY,
  host: HOST,
  port: PORT,
  overlay: true,
  clientLogLevel: 'none',
  noInfo: true,
  open: true,
  historyApiFallback: true,
});

// 'Прослушивание' сервера
server.listen(PORT, HOST, () => {
  console.log(
    `${chalk.greenBright('Server listen on')} ${chalk.blueBright(
      `http://${HOST}:${PORT}`
    )}`
  );
});
