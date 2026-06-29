//@ts-nocheck

import * as vue from 'vue';
window.Vue = vue; 

// import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router';
import { createI18n }  from 'vue-i18n';
import * as VueI18n from 'vue-i18n';
import { getRuntimeLocale } from './pages/i18n';
window.VueI18n = VueI18n;
const resourceURL = window.TeldWebConfig.ResourceURL;
const teldLocale = getRuntimeLocale();

const app = vue.createApp(App);

const messages = {};
messages[ teldLocale ] = window.localeMessage??{};


const i18n = createI18n({
  legacy:false,
  locale: teldLocale, 
  messages
});

// app.use(createPinia())
app.use(router);
app.use(i18n);


import(`${ resourceURL }/tff/component/pc/umd/index.js`).then(()=>{
  import(`${ resourceURL }/tff/component/mobile/umd/index.js`).then(()=>{
    app.use(window.tm.default, { language: teldLocale??'zh-CN' });
    app.use(window.TComponents.default, { language: teldLocale??'zh-CN' });
    router.isReady().then(() => {
      //@ts-ignore
      app.mount('#app', {
        language: teldLocale??'zh-CN',
      });
    });
  });
  
});


window.fasAppInstance = app;
