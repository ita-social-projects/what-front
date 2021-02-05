const path = require('path');

const getSourcePath = (folderOrFile) => path.resolve(__dirname, '..', 'src', folderOrFile || '');

module.exports = {
  src: {
    _: getSourcePath(),
    html: getSourcePath('index.html'),
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
  public: path.resolve(__dirname, '..', 'public'),
};
