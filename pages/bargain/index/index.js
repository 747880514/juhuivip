var t = getApp(), a = t.requirejs("core");

t.requirejs("jquery"), t.requirejs("foxui");

Page({
    data: {
        list: {},
        emptyHint: !1,
        label: "https://static.btaeo.cn/static/images/label.png"
    },
    onLoad: function() {
        var e = this;
        a.get("bargain/get_list", {}, function(t) {
            console.log(t), e.setData({
                list: t.list
            });
        }), t.getCache("isIpx") ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar"
        }) : e.setData({
            isIpx: !1,
            iphonexnavbar: ""
        });
        wx.getSystemInfo({  //tushu
          success: function (res) {
            console.log(res.model)//手机机型
            console.log(res.model == "iPhone X")
            e.setData({
              statusBarHeight: res.statusBarHeight,
              fuzhukongbaiq: 105 + res.statusBarHeight + "rpx",

            })
            if (res.model == "iPhone X") {
              e.setData({
                isIPX: "ipx"
              });
            }
            else if (res.model == "iPhone 7 Plus" || res.model == "iPhone 7" || res.model == "iPhone 6 Plus" || res.model == "iPhone 6" || res.model == "iPhone 5" || res.model == "iPhone 7 Plus<iPhone9,2>") {
              e.setData({
                isIPX: "iPhone"
              });
            }
            else {
              e.setData({
                isIPX: "Android"
              });
            }
          }
        });
    },
    bindFocus: function() {
        this.setData({
            fromsearch: !0
        });
    },
    bindback: function() {
        this.setData({
            fromsearch: !1
        }), this.onLoad();
    },
    bindSearch: function(t) {
        console.log(t.detail);
        var e = this, i = t.detail.value;
        a.get("bargain/get_list", {
            keywords: i
        }, function(t) {
            console.log(t.list.length), t.list.length <= 0 ? e.setData({
                emptyHint: !0
            }) : e.setData({
                emptyHint: !1
            }), e.setData({
                list: t.list
            });
        });
    }
});