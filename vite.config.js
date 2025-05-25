import { defineConfig, loadEnv } from 'vite';
import fg from 'fast-glob';
import path from 'path';
import { fileURLToPath } from 'url';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() + "/config", "");
  console.log("Hello from " + (env.APP_NAME ?? 'CakePHP') + '! 🎉');


  const __dirname = path.dirname(fileURLToPath(import.meta.url));


  const jsFiles = fg.sync('resources/js/**/*.js', { cwd: __dirname });
  const cssFiles = fg.sync('resources/css/**/*.css', { cwd: __dirname });


  // console.log('JS Files:', jsFiles);
  // console.log('CSS Files:', cssFiles);


  const input = [...jsFiles, ...cssFiles].reduce((entries, file) => {
    const name = path.relative('resources', file).replace(/\.[^/.]+$/, '');
    entries[name] = path.resolve(__dirname, file);
    return entries;
  }, {});


  // console.log('Rollup Input:', input);


  return {
    root: '.',
    build: {
      outDir: './webroot',
      emptyOutDir: false,
      rollupOptions: {
        input,
        output: {
          entryFileNames: '[name].js',
          assetFileNames: '[name][extname]',
        }
      }
    },
    resolve: {
      alias: [
        {
          find: /^~(.*)$/,
          replacement: '$1',
        },
      ],
    },
  };
});
