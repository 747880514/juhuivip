var a = getApp(), e = a.requirejs("core");

a.requirejs("jquery"), a.requirejs("foxui");

Page({
    data: {
        goods: {},
        mid: ""
    },
    onLoad: function(i) {
        var o = this;
        e.get("bargain/purchase", i, function(a) {
            console.log(a), o.setData({
                goods: a.goods,
                mid: a.mid
            });
        }), a.getCache("isIpx") ? o.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : o.setData({
            isIpx: !1,
            iphonexnavbar: ""
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
    }
});