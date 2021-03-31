/* eslint-disable */
/**
 * @file 基本配置文件
 * @author Talent FE
 */

const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    publicPath: '/highlight-textarea/dist',
    assetsDir: 'release',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: config => {
        // 异步组件禁用预加载, 解决组件懒加载失效的问题
        config.plugins.delete('prefetch');
        // 修复HMR
        config.resolve.symlinks(true);
        // alias
        config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('css', resolve('src/assets/styles'))
            .set('components', resolve('src/components'))
            .set('views', resolve('src/views'));
        config.output
            .filename('static/js/[name].[hash:8].min.js');
        config.output
            .chunkFilename('static/js/[name].[chunkhash:8].min.js');
    },
    css: {
        extract: process.env.NODE_ENV === 'production' ? {
            filename: 'static/css/[name].[hash:8].min.css',
            chunkFilename: 'static/css/[name].[hash:8].min.css'
        } : false
    }
};
