module.exports = {
    preset: 'react-native',
    moduleFileExtensions: [
      'ts',
      'tsx',
      'js',
      'jsx',
      'json',
      'node',
    ],
  //   moduleNameMapper: {
  //     'axios': 'axios/dist/node/axios.cjs'
  // },
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },

   
  };