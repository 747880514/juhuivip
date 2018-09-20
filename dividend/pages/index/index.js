var e = getApp(), t = e.requirejs("/core"), i = e.requirejs("/foxui");

e.requirejs("jquery"), Page({
    data: {
        loading: !1
    },
    // 屠苏返回键
    return_return_top_tushu: function () {

      // wx.reLanch({
      //   url: '/pages/diy/tushu/equities/equities'
      // })
      // wx.switchTab({
      //   url: '/pages/diy/tushu/equities/equities'
      // })
      wx.navigateTo({
        url: '/pages/diy/tushu/equities/equities'
      })
      // wx.redirectTo({
      //   url: '/pages/diy/tushu/equities/equities'
      // })
    
    },
    onLoad: function(e) {
      this.getlist();
      var that = this;
      wx.getSystemInfo({  //tushu
        success: function (res) {
          console.log(res.model)//手机机型
          console.log(res.model == "iPhone X")
          that.setData({
            statusBarHeight: res.statusBarHeight,
            fuzhukongbaiq: 105 + res.statusBarHeight * 2 + "rpx",

          })
          if (res.model == "iPhone X") {
            that.setData({
              isIPX: "ipx"
            });
          }
          else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
            that.setData({
              isIPX: "iPhone"
            });
          }
          else {
            that.setData({
              isIPX: "Android"
            });
          }
        }
      });
    },
    getlist: function() {
        var e = this;
        t.get("dividendhuasuan", "", function(t) {
            1 == t.error && (console.error(t.message), i.toast(e, t.message), setTimeout(function() {
                wx.reLaunch({
                    url: "/pages/index/index"
                });
            }, 1e3)), e.setData({
                message: t
            }), t.member || wx.redirectTo({
                url: "/dividend/pages/register/index"
            });
        });
    },
    found: function() {
        var e = this;
        e.setData({
            loading: !0
        }), t.post("dividend/createTeam", "", function(t) {
            0 == t.error && (e.setData({
                loading: !1
            }), i.toast(e, "创建完成"), e.getlist());
        });
    }
});