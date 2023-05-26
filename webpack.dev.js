const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const port = process.env.PORT || 3000

module.exports = merge(common, {
    // tells Webpack this configuration will be for either development or production
    mode: 'development',
    output: {
        filename: 'bundle.[hash].js', /** Tells Webpack how to write the compiled files to disk 
            This will be the filename of the bundled application. 
            The [hash] portion of the filename will be replaced by a hash 
            generated by Webpack every time your application changes and is 
            recompiled (helps with caching).
            */
        publicPath: '/' /** Hot reloading won’t work as expected for nested routes without this */
    },

    resolve: {
        alias: {
            "react-dom": "@hot-loader/react-dom", /** replaces react-dom with the custom react-dom from hot-loader */
        },
        extensions: ['.tsx', '.ts', '.js'],
    },

    devtool: 'inline-source-map', /** will create source maps to help you with debugging of your application. 
        There are several types of source maps and this particular map (inline-source-map) 
        is to be used only in development */

    module: { /** What types of modules your application will include, in our case we will support ESNext (Babel) and CSS Modules */
        rules: [ /** How we handle each different type of module */

            // First Rule
            /**
                We test for files with a .js extension excluding the node_modules 
                directory and use Babel, via babel-loader, to transpile down to vanilla 
                JavaScript (basically, looking for our React files).
 
                Remember our configuration in .babelrc? This is where Babel looks at that file.
             */
            {
                test: /\.(js)$/, // The test keyword tells webpack what kind of files should use this loader.
                exclude: /node_modules/,
                use: ['babel-loader']
            },

            // Second Rule
            /**
                We test for CSS files with a .css extension. Here we use two loaders, 
                style-loader and css-loader, to handle our CSS files. 
                Then we instruct css-loader to use CSS Modules, camel case and create source maps.
 
                CSS Modules and Camel Case
                This gives us the ability to use import Styles from ‘./styles.css’ 
                syntax (or destructuring like this import { style1, style2 } from ‘./styles.css’).
 
                Then we can use it like this in a React app:
                ...
                <div className={Style.style1}>Hello World</div>
                // or with the destructuring syntax
                <div className={style1}>Hello World</div>
             */
            {
                test: /\.css$/,
                sideEffects: true,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                        },
                    },
                ]
            },

            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },

    plugins: [ /**  This section is where we configure (as the name implies) plugins.
                        html-webpack-plugin accepts an object with different options. 
                        In our case we specify the HTML template we will be using and the favicon */
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        }),

        new webpack.HotModuleReplacementPlugin(),  /** Prints more readable module names in the browser terminal on HMR updates */
    ],

    devServer: { /**    Finally, we configure the development server.
                            We specify localhost as the host and assign the variable port as the port 
                            (if you remember, we assigned port 3000 to this variable). 
                            We set historyApiFallback to true and open to true. 
                            This will open the browser automatically and launch your application in
                            http://localhost:3000 */
        host: 'localhost',
        port: port,
        historyApiFallback: true,
        open: true,

        hot: true /** Enable HMR on the server */
    }
}
)