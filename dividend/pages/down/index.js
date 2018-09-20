var t = getApp(), e = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        loading: !1
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function() {
        var t = {
            page: 1
        };
        this.getlist(t);
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
    getlist: function(t) {
        var a = this;
        a.setData({
            loading: !0
        }), console.error(a.data.loading), e.get("dividend/down", t, function(e) {
            if (console.error(e), 0 == e.error) {
                if (e.list.length > 0) {
                    var i = a.data.list.concat(e.list);
                    t.page = t.page + 1;
                }
                a.setData({
                    member: e.member,
                    list: i,
                    loading: !1,
                    total: e.total,
                    page: t.page,
                    stop: !1
                });
            }
        });
    }
});