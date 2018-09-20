var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        code: 0
    },
    onShow: function() {
        this.getData();
        var a = this;
        t.getCache("isIpx") ? a.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : a.setData({
            isIpx: !1,
            iphonexnavbar: "",
            paddingb: ""
        });
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
  onLoad: function (e) {
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
    getData: function() {
        var t = this;
        a.get("commission/withdraw", {}, function(a) {
            a.show = !0, t.setData(a), wx.setNavigationBarTitle({
                title: a.set.texts.commission1
            });
        });
    },
    toggleSend: function(t) {
        0 == t.currentTarget.dataset.id ? this.setData({
            code: 1
        }) : this.setData({
            code: 0
        });
    },
    withdraw: function(t) {
        this.data.cansettle && wx.navigateTo({
            url: "/pages/commission/apply/index"
        });
    }
});