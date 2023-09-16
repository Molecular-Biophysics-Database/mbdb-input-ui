/* vim: set sw=4 ts=4 sts=4 expandtab : */

const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const DistDir = 'dist';

function sharedConfig(productionBuild) {
    return {
        devServer: {
            client: {
                overlay: {
                    errors: true,
                    warnings: true,
                    runtimeErrors: true,
                },
                logging: 'warn',
                progress: false,
            },
            static: {
                directory: path.join(__dirname, 'dist')
            },
            compress: false,
            port: 9779,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            },
        },

        mode: productionBuild ? 'production' : 'development',

        module: {
            rules: [
                {
                    test: /\.(html|ico)$/,
                    use: [{
                        loader: 'file-loader',
                        options: { name: '[name].[ext]' }
                    }]
                },
                {
                    test: /\.css$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            sourceMap: false,
                        },
                    }],
                },
                {
                    test: /\.woff2$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: 'themes/default/assets/fonts/[name].[ext]',
                            sourceMap: false,
                        },
                    }],
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'less-loader'
                    ],
                },
            ]},
            resolve: {
                alias: {
                    '../../theme.config$': path.join(__dirname, '/semantic-ui/theme.config'),
                    '../semantic-ui/site': path.join(__dirname, '/semantic-ui/site'),
                },
                modules: [
                    'node_modules',
                    path.resolve(__dirname, 'lib/'),
                ],
            },
            plugins: [
                new ExtraWatchWebpackPlugin({
                    files: [
                        './assets/*.css',
                        './assets/*.html',
                    ],
                }),
                new MiniCssExtractPlugin(),
            ],
        }
    }

    function createApp(name, productionBuild) {
        return {
            node: false,
            target: 'web',
            entry: {
                app: path.resolve(__dirname, `lib/${name}.js`),
            },
            output: {
                filename: `${name}.js`,
                path: path.resolve(__dirname, DistDir)
            },
            ...sharedConfig(productionBuild),
        };
    }

    module.exports = (env, argv) => {
        const productionBuild = argv.mode === 'production';
        console.log(`Build mode: ${productionBuild ? 'production' : 'development'}`);

        return createApp('index', productionBuild);
    };
