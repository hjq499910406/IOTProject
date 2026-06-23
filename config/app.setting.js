!(function (self) {
  window.__domain = (function (domain) {
    var ares = domain.split(':')[ 0 ].split('.');
    ares.shift();
    ares.unshift('');
    return ares.join('.');
  })(window.location.hostname);
  const domainConfig = {
    '.teld.cc': '//sgi.teld.cc:7777/api/invoke?SID=',
    '.teld.org': 'https://sgi.teld.org:7088/api/invoke?SID=',
    '.teld.cn': 'https://sgi.teld.cn/api/invoke?SID=',
    '.b2.teld.com.cn': 'https://sgi.b2.teld.com.cn/api/invoke?SID=',
  };

  const __SGURL__ = domainConfig[ window.__domain ] || `//sgi${ window.__domain }/api/invoke?SID=`;



  const __ResourceURL__ = `//resource${ window.__domain }`;
  const __UserCenterURL__ = `http://cloud${ window.__domain }/web/login`;
  const __SSEURL__ = `//fasr${ window.__domain }/sseEvents`;

  window.FrameSGHost = __SGURL__;
  window.newTokenRefreshUrl = __SGURL__ + 'UserAPI-WEBUI-SRefreshToken';
  window.ATokenRefreshUrl = __SGURL__ + 'UserAPI-WEBUI-ASRefreshToken';
  window.aLoginUrl = __SGURL__ + 'UserAPI-WEBUI-ASLogin';
  window.UserCenterUrl = __UserCenterURL__;

  // 环境
  //Standard,International,Teld

  if (!self[ 'TeldWebConfig' ]) self[ 'TeldWebConfig' ] = {};
  self.TeldWebConfig.SGURL = __SGURL__;
  self.TeldWebConfig.ResourceURL = __ResourceURL__;
  self.TeldWebConfig.UserCenterURL = __UserCenterURL__;
  self.TeldWebConfig.SSEURL = __SSEURL__;
})(window);
