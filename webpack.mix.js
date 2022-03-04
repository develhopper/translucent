const mix = require('laravel-mix');
const tailwindcss = require('tailwindcss');

mix.setPublicPath('dist/');

mix.js('src/popup/index.js','/js/popup.js').react();
mix.js('src/content_script/index.js','/js/content_script.js').react();

mix.js('src/background.js', '/js/background.js');

mix.copyDirectory('public','dist');

mix.sass('src/scss/app.scss', 'dist/assets/css').options({
    postCss:[tailwindcss('./tailwind.config.js')],
    processCssUrls:false
});