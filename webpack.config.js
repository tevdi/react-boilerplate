var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const { BaseHrefWebpackPlugin } = require('base-href-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = ( env, argv ) => {
    
/* In case of required dynamic basename for development in local: 

    npm run local -- --directory='/dynamic/directory/'
    
*/

let basename;
const api_rest_folder = 'http://localhost:8000'                                                   // No need to use API Rest folder if there isn't.
let api_rest_basename = api_rest_folder
if (argv.domain){
    if (argv.directory){
        basename = argv.directory
    } else {
        // basename = __dirname.substring(__dirname.lastIndexOf("/")+1);
        // basename = '/'+basename+'/dist/';
        basename = __dirname.replace('/var/www', '')+'/dist/'                                     // The root of Apache must be /var/www
    }
} else {
    basename = '/'
    api_rest_basename = ''
}    
console.log('The Api REST basename is : '+basename)

return({
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[hash].js',
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            }
        },
        {
            test: /\.html$/,
            use: [
            {
                loader: "html-loader"
            }
            ]
        },
        {
            test: /\.css$/,
            use: [
            'style-loader',
            'css-loader'
            ]
        },
        {
            test: /\.s(a|c)ss$/,
            exclude: /\.module.(s(a|c)ss)$/,
            loader: [MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
            },
            {
                loader: 'sass-loader',
            }
            ]
        },
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },       
        ]
    },
    plugins: [
        ...(argv.mode == 'production' ? [new CleanWebpackPlugin()] : []),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new BaseHrefWebpackPlugin({ baseHref: basename }),
        new webpack.DefinePlugin({
        process: {
            env: {
                ROUTER_BASENAME: JSON.stringify(basename),
                API_REST_BASENAME: JSON.stringify(api_rest_basename)
            }
        }
        }),
        new CopyPlugin([
        {
            from: 'src/*.json',
            flatten: true,
        },
        {
            from: 'src/*.ico',
            flatten: true,              
        },
        {
            from: 'img/',
            to: 'img/',
            flatten: true,              
        },
        {
            from: 'src/htaccess',                                                                 // It requires AllowOverride All for that directory in Apache config (apache2.conf)
            to: '.htaccess',
            toType: 'template',
        },
        ]),
        new MiniCssExtractPlugin({
            filename: '[hash].css',
            chunkFilename: '[hash].css'
        }),
    ],
    devServer: {
        host: 'localhost',
        port: 8080,
        historyApiFallback: true,
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
})
}
