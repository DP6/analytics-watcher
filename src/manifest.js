module.exports = {
  name: 'Analytics Watcher',
  short_name: 'analyticswatcher',
  description: 'A validator for Universal Analytics implementations',
  version: '3.0.0',
  icons: {
    16: 'icons/min36.png',
    36: 'icons/rect4069.png',
    48: 'icons/rect4069.png',
    128: 'icons/rect4069.png'
  },
  permissions: [
    'tabs',
    'storage',
    //'webRequest',
    'activeTab',
    'http://*/',
    'https://*/'
  ],
  browser_action: {
    default_title: 'title'
  },
  background: {
    script: 'js/background.js'
  },
  devtools_page: 'pages/devtools.html',
  minimum_chrome_version: '49.0',
  manifest_version: 2,
  web_accessible_resources: ['*'],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'none'"
}
