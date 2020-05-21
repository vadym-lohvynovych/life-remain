module.exports = async ({ config, mode }) => {
  const isProd = mode === 'PRODUCTION';

  if (isProd) {
    const publicPath = config.output.path.includes('storybook')
      ? '/storybook/'
      : '/';

    config.output = {
      ...config.output,
      publicPath,
    };

    config.performance = {
      ...config.performance,
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    };
  }

  return config;
};
