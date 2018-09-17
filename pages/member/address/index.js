var t = getApp(), e = t.requirejs("core");

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
    onLoad: function(e) {
        t.url(e);
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
    onShow: function() {
        this.getList();
        var e = this, a = t.getCache("isIpx");
        console.error(a), a ? e.setData({
            isIpx: !0,
            iphonexnavbar: "fui-iphonex-navbar",
            paddingb: "padding-b"
        }) : e.setData({
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
        e.get("member/address/get_list", {}, function(e) {
            t.setData({
                loaded: !0,
                list: e.list,
                show: !0
            });
        });
    },
    setDefault: function(t) {
        var a = this, i = e.pdata(t).id;
        a.setData({
            loaded: !1
        }), e.get("member/address/set_default", {
            id: i
        }, function(t) {
            e.toast("设置成功"), a.getList();
        });
    },
    deleteItem: function(t) {
        var a = this, i = e.pdata(t).id;
        e.confirm("删除后无法恢复, 确认要删除吗 ?", function() {
            a.setData({
                loaded: !1
            }), e.get("member/address/delete", {
                id: i
            }, function(t) {
                e.toast("删除成功"), a.getList();
            });
        });
    }
});