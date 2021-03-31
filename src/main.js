import Vue from 'vue';
import App from './App.vue';
// 引入css入口文件
import 'css/base.less';

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');

