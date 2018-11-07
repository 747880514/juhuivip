var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");

Page({
  data: {
    route: "member",
    icons: e.requirejs("icons"),
    member: {},
    queren: '',


    
  },
  onLoad: function (options) {
    // this.getUserInfoFun();
    var userInfo = e.getCache("userinfo");
    var tgid = options.tgid;
    this.setData({
      userInfo: userInfo,
      tgid: tgid,
      options: options,
    });
    this.toSuperapp();

  },
  onShow: function (options) {
    //自检用户是否存在
    this.toSuperapp();
    // 获取用户信息
   
  },
  getmobile: function(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },
  //输入手机号后检用户是否存在
  toSuperapp:function() {
    var that = this;
    var mobile = that.data.mobile;
    var tgid = that.data.tgid;
    var unionId = that.data.userInfo.unionId;
    var avatarUrl = that.data.userInfo.avatarUrl;
    var nickName = that.data.userInfo.nickName;
    t.get("member/baili/wxappToSuperapp", { 'mobile': mobile, 'tgid': tgid, 'unionId': unionId, 'avatarUrl': avatarUrl, 'nickName': nickName}, function (t) {
      var topbb = t.display == 'none' ? 'margin-top: 20vw;' : '';
      that.setData({
        ts: t.msg,
        queren: t.contact,
        yin: t.display,
        topaa: topbb,
      });
      console.log(that.data.yin);
      console.log(456);
    });
    console.log(123);
  },


  getUserInfoFun: function () {
    var S = this;
    wx.getUserInfo({
      success: function (res) {
        console.log('用户已授权');
  
        S.toSuperapp();

      },
      fail: function () {
        console.log('用户未授权');
      },
    })
    S.toSuperapp();
    S.onLoad(S.data.options);
  }, 
  
  
  // 分享接口
  onShareAppMessage: function (res) {
    return {
      title: '好友送您20元可提现现金，快接受小伙伴的邀请下载领取',
      path: '/pages/diy/baili/autobindapp?tgid=' + this.data.tgid
    }
  },
});