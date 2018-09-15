var e = getApp().requirejs("core");

Page({
    data: {
        showimage: !1
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(e) {
      var that = this;
      wx.getSystemInfo({  //tushu
        success: function (res) {
          console.log(res.model)//手机机型
          console.log(res.model == "iPhone X")
          that.setData({
            statusBarHeight: res.statusBarHeight
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
    onShow: function() {
        this.getData();
    },
    getData: function() {
        var o = this;
        e.get("commission/qrcode", {}, function(e) {
            70001 != e.error ? (e.show = !0, o.setData(e), o.getImage()) : wx.redirectTo({
                url: "/pages/member/info/index"
            });
        });
    },
    getImage: function() {
        var o = this;
        e.post("commission/qrcode", {}, function(e) {
            70001 != e.error ? (e.showimage = !0, o.setData(e)) : wx.redirectTo({
                url: "/pages/member/info/index"
            });
        });
    }
});