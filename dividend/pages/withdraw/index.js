var t = getApp(), e = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {},
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(a) {
        var i = this;
        t.getCache("isIpx") ? i.setData({
            isIpx: !0
        }) : i.setData({
            isIpx: !1
        }), e.get("dividendhuasuan/withdraw", "", function(t) {
            i.setData({
                msg: t
            });
        });
        wx.getSystemInfo({  //tushu
          success: function (res) {
            console.log(res.model)//手机机型
            console.log(res.model == "iPhone X")
            i.setData({
              statusBarHeight: res.statusBarHeight,
              fuzhukongbaiq: 105 + res.statusBarHeight * 2 + "rpx",
            })
            if (res.model == "iPhone X") {
              i.setData({
                isIPX: "ipx"
              });
            }
            else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
              i.setData({
                isIPX: "iPhone"
              });
            }
            else {
              i.setData({
                isIPX: "Android"
              });
            }
          }
        });
    },
    onShow: function(t) {
        var a = this;
        e.get("dividendhuasuan/withdraw", "", function(t) {
            a.setData({
                msg: t
            });
        });
    },
    submit: function(t) {
        t.currentTarget.dataset.price <= 0 || wx.navigateTo({
            url: "/dividendhuasuan/pages/apply/index"
        });
    }
});