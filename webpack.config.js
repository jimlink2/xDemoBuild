const path = require('path');
module.exports = {
    entry: {
        home: './assets/js/home.js',
        sizing: './assets/js/sizing.js',
        about: './assets/js/aboutPage.js',
        videoPage: './assets/js/videoPage.js',
        legality: './assets/js/legality.js',
        demo: './assets/js/demo.js',
        validateEmail: './assets/js/validateEmail.js',
        login: './assets/js/login.js',
        forgotPass: './assets/js/forgotPass.js',
        passwordReset: './assets/js/passwordReset.js',
        emailSent: './assets/js/emailSent.js',
        signup: './assets/js/signup.js',
        main: './src/index.js',
        main2: './src/index2.js',
        queue: './src/queue.js'
    },
    output: { // 2
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: { // 3
        rules: [{ test: /\.js$/, use: 'babel-loader' }],
    },
    optimization: { minimizer: [] }, // 4
}