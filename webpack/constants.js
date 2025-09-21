const path = require('path');

const ABSOLUTE_BASE = path.normalize(path.join(__dirname, '..'));

const PATHS = {
  ABSOLUTE_BASE,
  NODE_MODULES_DIR: path.join(ABSOLUTE_BASE, 'node_modules'),
  BUILD_DIR: process.env.BUILD_DIR ? path.resolve(process.env.BUILD_DIR) : path.join(ABSOLUTE_BASE, 'build'),
  SRC_DIR: path.join(ABSOLUTE_BASE, 'src'),
  IMG_DIR: path.join(ABSOLUTE_BASE, 'img'),
  PROJECT_DIR: 'fe-candidate',
  SKELETON_DIR: 'skeleton'
}

module.exports = PATHS;
