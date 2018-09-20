var t = getApp().requirejs("core");

Page({
    data: {
        level: 1,
        page: 1,
        list: []
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function() {
        this.getSet(), this.getList();
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
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    getSet: function() {
        var e = this;
        t.get("commission/down/get_set", {}, function(t) {
            wx.setNavigationBarTitle({
                title: t.textdown + "(" + t.total + ")"
            }), delete t.error, t.show = !0, e.setData(t);
        });
    },
    getList: function() {
        var e = this;
        t.get("commission/down/get_list", {
            page: e.data.page,
            level: e.data.level
        }, function(t) {
            var a = {
                total: t.total,
                pagesize: t.pagesize
            };
            t.list.length > 0 && (a.page = e.data.page + 1, a.list = e.data.list.concat(t.list), 
            t.list.length < t.pagesize && (a.loaded = !0)), e.setData(a);
        }, this.data.show);
    },
    myTab: function(e) {
        var a = this, i = t.pdata(e).level;
        a.setData({
            level: i,
            page: 1,
            list: []
        }), a.getList();
    }
});