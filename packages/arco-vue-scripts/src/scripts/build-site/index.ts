import { build } from 'vite';
import { copyFileSync } from 'fs';
import { resolve } from 'path';
import config from '../../configs/vite.site.prod';

async function run() {
  await build(config);

  const outDir = resolve(process.cwd(), 'dist');
  copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
}

export default run;
