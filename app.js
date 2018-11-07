var e = require("utils/core.js");
var mta = require('utils/mta_analysis.js');

App({
    onShow: function() {
        this.onLaunch();
    },
    
  onLaunch: function (options) {
        var e = this;
        wx.getSystemInfo({
            success: function(t) {
                "0" == t.model.indexOf("iPhone X") ? e.setCache("isIpx", t.model) : e.setCache("isIpx", "");
            }
        }), this.getConfig();
        this.getUserInfo(function(e) {}, function(e, t) {
            var t = t ? 1 : 0, e = e || "";
            t && wx.redirectTo({
                url: "/pages/message/auth/index?close=" + t + "&text=" + e
            });
        });
        // 代码统计
        mta.App.init({
          "appID": "500630598",
          "eventID": "500643315",
          "statPullDownFresh": true,
          "statShareApp": true,
          "statReachBottom": true
        });
    },
    requirejs: function(e) {
        return require("utils/" + e + ".js");
    },
    getConfig: function() {
        if (null !== this.globalData.api) return {
            api: this.globalData.api,
            approot: this.globalData.approot,
            appid: this.globalData.appid
        };
        var e = wx.getExtConfigSync();
        return console.log(e), this.globalData.api = e.config.api, this.globalData.approot = e.config.approot, 
        this.globalData.appid = e.config.appid, e.config;
    },
    getCache: function(e, t) {
        var i = +new Date() / 1e3, n = "";
        i = parseInt(i);
        try {
            (n = wx.getStorageSync(e + this.globalData.appid)).expire > i || 0 == n.expire ? n = n.value : (n = "", 
            this.removeCache(e));
        } catch (e) {
            n = void 0 === t ? "" : t;
        }
        return n = n || "";
    },
    setCache: function(e, t, i) {
        var n = +new Date() / 1e3, o = !0, a = {
            expire: i ? n + parseInt(i) : 0,
            value: t
        };
        try {
            wx.setStorageSync(e + this.globalData.appid, a);
        } catch (e) {
            o = !1;
        }
        return o;
    },
    removeCache: function(e) {
        var t = !0;
        try {
            wx.removeStorageSync(e + this.globalData.appid);
        } catch (e) {
            t = !1;
        }
        return t;
    },
    getUserInfo: function(t, i, n) {
        var o = this, a = {}, a = o.getCache("userinfo");
        wx.login({
            success: function(n) {
                n.code ? e.post("wxapp/login", {
                    code: n.code
                }, function(n) {
                    //超级APP下载
                    o.setCache("superapp_userinfo", n, 7200);
                    
                    n.error ? e.alert("获取用户登录态失败:" + n.message) : n.isclose && i && "function" == typeof i ? i(n.closetext, !0) : wx.getUserInfo({
                        success: function(i) {
                            a = i.userInfo, e.get("wxapp/auth", {
                                data: i.encryptedData,
                                iv: i.iv,
                                sessionKey: n.session_key
                            }, function(e) {
                                i.userInfo.openid = e.openId, i.userInfo.id = e.id, i.userInfo.uniacid = e.uniacid, 
                                i.userInfo.unionId = e.unionId, 
                                i.needauth = 0, o.setCache("userinfo", i.userInfo, 7200), o.setCache("userinfo_openid", i.userInfo.openid), 
                                o.setCache("userinfo_id", e.id), o.getSet(), t && "function" == typeof t && t(a);
                              console.log(getCurrentPages());
                              if (e.bind_agentid == 1 && getCurrentPages()[0].route != 'pages/diy/baili/autobindapp')
                                {
                                  wx.switchTab({
                                    url: '../../../pages/member/index/index'
                                  });
                                  page.onLoad(); 
                                }
                            });
                        },
                        fail: function() {
                            e.get("wxapp/check", {
                                openid: n.openid
                            }, function(e) {
                                e.needauth = 1, o.setCache("userinfo", e, 7200), o.setCache("userinfo_openid", n.openid), 
                                o.setCache("userinfo_id", n.id), o.getSet(), t && "function" == typeof t && t(a);
                            });
                        }
                    });
                }) : e.alert("获取用户登录态失败:" + n.errMsg);
            },
            fail: function() {
                e.alert("获取用户信息失败!");
            }
        });
    },
    getSet: function() {
        var t = this, i = t.getCache("cacheset");
        "" == i && setTimeout(function() {
            e.get("cacheset", {
                version: i.version
            }, function(e) {
                console.log(e), e.update && t.setCache("cacheset", e.data);
            });
        }, 10);
    },
    url: function(e) {
        e = e || {};
        var t = {}, i = "", n = "", o = this.getCache("usermid");
        i = e.mid || "", n = e.merchid || "", "" != o ? ("" != o.mid && void 0 !== o.mid || (t.mid = i), 
        "" != o.merchid && void 0 !== o.merchid || (t.merchid = n)) : (t.mid = i, t.merchid = n), 
        this.setCache("usermid", t, 7200);
    },
    impower: function(e, t, i) {
        wx.getSetting({
            success: function(n) {
                console.log(n), n.authSetting["scope." + e] || wx.showModal({
                    title: "用户未授权",
                    content: "您点击了拒绝授权，暂时无法" + t + "，点击去设置可重新获取授权喔~",
                    confirmText: "去设置",
                    success: function(e) {
                        e.confirm ? wx.openSetting({
                            success: function(e) {}
                        }) : "route" == i ? wx.switchTab({
                            url: "/pages/index/index"
                        }) : "details" == i || wx.navigateTo({
                            url: "/pages/index/index"
                        });
                    }
                });
            }
        });
    },
    globalData: {
      // 你的小程序appid
      appid: "wx79384099bcaf8dfa",
      // 域名改成你的微擎地址，i后面的数字改成你的商城uid，在商城入口页面那边看（i=xxx的那个数字）
      api: "https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2",
      // 域名改成你的微擎地址
      approot: "https://www.juhuivip.com/addons/ewei_shopv2/",
      // www.jihuoxia.cn
      userInfo: null
    }
});