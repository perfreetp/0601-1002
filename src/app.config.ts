export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/help/index',
    'pages/map/index',
    'pages/chat/index',
    'pages/mine/index',
    'pages/pet-profile/index',
    'pages/knowledge/index',
    'pages/publish-help/index',
    'pages/feed-detail/index',
    'pages/chat-detail/index',
    'pages/help-detail/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFFFFF',
    navigationBarTitleText: '宠友圈',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFF8F6'
  },
  tabBar: {
    color: '#86909C',
    selectedColor: '#FF7E67',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '首页'
      },
      {
        pagePath: 'pages/help/index',
        text: '互助'
      },
      {
        pagePath: 'pages/map/index',
        text: '地图'
      },
      {
        pagePath: 'pages/chat/index',
        text: '聊天'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
