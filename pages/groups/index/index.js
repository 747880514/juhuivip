var n = getApp(), t = n.requirejs("core");

n.requirejs("jquery"), n.requirejs("foxui"), Page({
    onPullDownRefresh: function() {
        var n = this;
        console.log(1), t.get("groups", {}, function(t) {
            0 == t.error && (n.setData({
                res: t
            }), wx.stopPullDownRefresh());
        });
    },
    data: {},
    onLoad: function(e) {
        var o = this;
        n.getCache("isIpx") ? o.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : o.setData({
            isIpx: !1,
            iphonexnavbar: ""
        }), t.get("groups", {}, function(n) {
            o.setData({
                res: n
            });
        });
      wx.getSystemInfo({  //tushu
        success: function (res) {
          console.log(res.model)//手机机型
          console.log(res.model == "iPhone X")
          o.setData({
            statusBarHeight: res.statusBarHeight,
            fuzhukongbaiq: 105 + res.statusBarHeight + "rpx",

          })
          if (res.model == "iPhone X") {
            o.setData({
              isIPX: "ipx"
            });
          }
          else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
            o.setData({
              isIPX: "iPhone"
            });
          }
          else {
            o.setData({
              isIPX: "Android"
            });
          }
        }
      });
    },
    advheight: function(n) {
        var t = this, e = n.detail.width / n.detail.height;
        t.setData({
            advheight: 750 / e
        });
    },
    navigate: function(n) {
        var e = t.pdata(n).link;
        console.log(e), wx.navigateTo({
            url: e,
            fail: function() {
                wx.switchTab({
                    url: e
                });
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});