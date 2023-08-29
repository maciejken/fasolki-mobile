module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["module:react-native-dotenv"],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'src/app': './src/app',
            'src/features': './src/features',
            'src/lib': './src/lib',
            'src/types': './src/types',
          },
        },
      ],
    ]
  };
};
