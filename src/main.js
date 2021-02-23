import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import lang from 'element-ui/lib/locale/lang/ja';
import locale from 'element-ui/lib/locale';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// configure language
locale.use(lang);
Vue.use(ElementUI);
Vue.config.productionTip = true

new Vue({
  render: h => h(App),
}).$mount('#app')
