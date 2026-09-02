const path = require('path');
module.exports = {
    entry: {
        home: './assets/js/home.js',
        answer: './assets/js/answer.js',
        sizing: './assets/js/sizing.js',
        about: './assets/js/aboutPage.js',
        guys: './assets/js/guysPage.js',
        players: './assets/js/playerPage.js',
        gals: './assets/js/galsPage.js',
        homeVideo: './assets/js/homeVideoPage.js',
        advertisers: './assets/js/advertisersPage.js',
        legality: './assets/js/legality.js',
        videoAds: './assets/js/videoAds.js',
        Kiosks: './assets/js/Kiosks.js',
        screens: './assets/js/screens.js',
        demo: './assets/js/demo.js',
        validateEmail: './assets/js/validateEmail.js',
        login: './assets/js/login.js',
        ppt: './assets/js/ppt.js',
        forgotPass: './assets/js/forgotPass.js',
        passwordReset: './assets/js/passwordReset.js',
        emailSent: './assets/js/emailSent.js',
        signup: './assets/js/signup.js',
        main: './src/index.js',
        main2: './src/index2.js',
        queue: './src/queue.js',
        loginSubmit: './assets/js/loginSubmit.js',
        terms: './assets/js/terms.js',
        privacy: './assets/js/privacy.js',
        videoPage: './assets/js/videoPage.js',
        showAd: './assets/js/showAd.js',
        screen4: './assets/js/screen4.js',
        screenOrder: './assets/js/screenOrder.js',
        screen5: './assets/js/screen5.js',
        ads: './assets/js/ads.js'
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
