const path = require('path');

const getSourcePath = (folder) => path.resolve(__dirname, '..', 'src', folder || '');

module.exports = {
  src: {
    _: getSourcePath(),
    utils: getSourcePath('utils'),
    assets: getSourcePath('assets'),
    styles: getSourcePath('styles'),
    shared: getSourcePath('shared'),
    models: getSourcePath('models'),
    screens: getSourcePath('screens'),
    features: getSourcePath('features'),
    components: getSourcePath('components'),
  },
  dist: path.resolve(__dirname, '..', 'dist'),
};
