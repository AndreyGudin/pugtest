let mode='development';
const PugPlugin= require('pug-plugin');
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}

console.log(mode + 'mode')

module.exports={
  mode: mode,
  output:{
    filename:'[name].[contenthash].js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'/',
    assetModuleFilename:'assets/[hash][ext][query]',
    clean: true,
  },
  entry:{
    index:'./src/pug/index.pug',
    scripts:'./src/index.js'
  },
  devtool: 'source-map',
  plugins:[
    new PugPlugin({
      modules:[
        PugPlugin.extractCss({
          filename: 'assets/css/[name].[contenthash:8].css',
        }),
      ]
    }),
  ],
  module: {
    rules:[
      {
        test: /\.pug$/,
        loader: PugPlugin.loader,
        options:{
          method: 'render',
        }
      },
      {
        test: /\.scss$/,
        type:'asset/resource',
        use:[
          "css-loader","sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
        type:'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]'
        }
      }
    ]
  },
};