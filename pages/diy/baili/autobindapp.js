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
    queren: ''
  },
  onLoad: function (options) { 
    this.setData({
      userInfo: e.getCache("userinfo"),
      tgid: options.tgid,
    });
  },
  onShow: function () {
    //自检用户是否存在
    this.toSuperapp();
  },
  getmobile: function(e) {
    this.setData({
      mobile: e.detail.value,
    });
  },
  //输入手机号后检用户是否存在
  toSuperapp:function() {
    var that = this;
    var mobile = this.data.mobile;
    var tgid = this.data.tgid;
    var unionId = this.data.userInfo.unionId;
    var avatarUrl = this.data.userInfo.avatarUrl;
    var nickName = this.data.userInfo.nickName;

    t.get("member/baili/wxappToSuperapp", { 'mobile': mobile, 'tgid': tgid, 'unionId': unionId, 'avatarUrl': avatarUrl, 'nickName': nickName}, function (t) {
      that.setData({
        ts: t.msg,
        queren: 'contact',
      })
    });
  },

});