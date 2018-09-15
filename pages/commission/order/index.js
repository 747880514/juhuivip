var t = getApp().requirejs("core");

Page({
    data: {
        status: "",
        page: 1,
        list: []
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ changed: true });//返回上一页
    },
    onLoad: function() {
        this.getList();
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
    onReachBottom: function() {
        this.data.loaded || this.data.list.length == this.data.total || this.getList();
    },
    onPullDownRefresh: function() {
        wx.stopPullDownRefresh();
    },
    toggleSend: function(t) {
        if (this.data.openorderdetail || this.data.openorderbuyer) {
            var a = t.currentTarget.dataset.index, e = this.data.list[a].code, s = this.data.list;
            s[a].code = 1 == e ? 0 : 1, this.setData({
                list: s
            });
        }
    },
    getList: function() {
        var a = this;
        t.get("commission/order/get_list", {
            page: a.data.page,
            status: a.data.status
        }, function(t) {
            delete t.error;
            var e = t;
            e.show = !0, t.list.length > 0 && (e.page = a.data.page + 1, e.list = a.data.list.concat(t.list), 
            t.list.length < t.pagesize && (e.loaded = !0)), a.setData(e), wx.setNavigationBarTitle({
                title: t.textorder
            });
        }, this.data.show);
    },
    myTab: function(a) {
        var e = this, s = t.pdata(a).status;
        e.setData({
            status: s,
            page: 1,
            list: []
        }), e.getList();
    }
});