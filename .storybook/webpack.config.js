module.exports = async ({ config, mode }) => {
  config.output = {
    ...config.output,
    publicPath: '/storybook/',
  };

  return config;
};
