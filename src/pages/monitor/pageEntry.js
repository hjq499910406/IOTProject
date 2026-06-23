//import '../../assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './monitor.vue'
// import router from './router'
import { createI18n } from 'vue-i18n'

let teldLocale = TFF.common.storage.Cookie.read('teld_locale')
if(!teldLocale){
  teldLocale = TFF.common.storage.Cookie.read('wrp_locale')
}
if(!teldLocale && navigator.language){ 
  teldLocale = navigator.language;
}
if(!teldLocale){
  teldLocale = 'zh-CN'
}

const app = createApp(App)

const messages = {};
messages[teldLocale] = mergeI18nData(window.localeMessage)??{}


const i18n = createI18n({
  legacy:false,
  locale: teldLocale, 
  messages,
})
app.use(i18n)


// app.use(createPinia())
if(window['Vue']){

  let langObject = window.TComponentsLang.zhCN;
  for(var key in window.TComponentsLang){
    let langVal = window.TComponentsLang[key];
    if(langVal && langVal.isoName == teldLocale){
      langObject = langVal;
      break;
    }
  }
  
  if(window.TQuasarBase){
    app.use(window.TQuasarBase.default,{lang:langObject})
    window.TComponents ||= {};
    window.TComponents.notify =function (params) {
      return window.TQuasarBase.Notify.create({
        position: 'top-right',
        ...params,
      });
    };
    window.TComponents.toast = function (params) {
      if(params && !params.position) params.position = 'center'
      return window.TQuasarBase.Notify.create(params);
    };
    window.TComponents.dialog = window.TQuasarBase.Dialog.create;
    window.TComponents.confirm = function (params) {
      params = Object.assign({
        cancel: true,
        persistent: true
      },params)
     return window.TQuasarBase.Dialog.create(params);
    };
  }
  
  app.use(window.TField.default, {language: teldLocale})
  
  app.use(window.TButton.default, {language: teldLocale})
  
  app.use(window.TSelectHelper.default, {language: teldLocale})
  
  app.use(window.TSelect.default, {language: teldLocale})
  
  app.use(window.TTabs.default, {language: teldLocale})
  
  app.use(window.TTabPanel.default, {language: teldLocale})
  
  app.use(window.TLabel.default, {language: teldLocale})
  
  app.use(window.TIcon.default, {language: teldLocale})
  
  app.use(window.TBadge.default, {language: teldLocale})
  
  app.use(window.TButtonGroup.default, {language: teldLocale})
  
  app.use(window.TExpansion.default, {language: teldLocale})
  
  app.use(window.TExpansionItem.default, {language: teldLocale})
  
  app.use(window.TDialog.default, {language: teldLocale})
  
}
app.mount('#monitor',{
  language: teldLocale
})

window.fasAppInstance = app;
