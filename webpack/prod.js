import Webpack from 'webpack';
import chalk from 'chalk';

// Конфигурационный файл для режима 'загрузки' (production)
import getProdConfig from './config/webpack.prod';

// Компилятор webpack
const compiler = Webpack(getProdConfig());

// Запуск сборки проекта
compiler.run((error, stats) => {
  // Обработка ошибоков конфигурации
  if (error) {
    console.error(error.stack || error);

    if (error.details) {
      console.error(error.details);
    }

    return null;
  }

  const info = stats.toString({
    hash: true,
    colors: true,
    version: true,
    children: false,
    env: true,
    modules: false,
    entrypoints: false,
  });

  // Обработка ошибоков во время компиляции (ошибка синтаксиса)
  if (stats.hasErrors()) {
    console.log(chalk.redBright('Error'));
    console.error(info);

    return null;
  }

  // Обработка предупреждений во время компиляции
  if (stats.hasWarnings()) {
    console.log(chalk.yellowBright('Warning'));
    console.warn(info);
  }

  console.log(chalk.greenBright('build completed'));
  console.log(info);
});
