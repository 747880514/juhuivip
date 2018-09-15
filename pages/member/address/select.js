var t = getApp(), a = t.requirejs("core");

Page({
    data: {
        loaded: !1,
        list: []
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function(a) {
        t.url(a);
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
        this.getList();
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
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getList: function() {
        var t = this;
        a.get("member/address/get_list", {}, function(a) {
            t.setData({
                loaded: !0,
                list: a.list,
                show: !0
            });
        });
    },
    select: function(e) {
        var i = a.pdata(e).index;
        t.setCache("orderAddress", this.data.list[i], 30), wx.navigateBack();
    }
});