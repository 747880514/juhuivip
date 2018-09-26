var t = getApp(), a = t.requirejs("/core");

t.requirejs("jquery"), Page({
    data: {
        list: [],
        page: 1,
        status: "all",
        loading: !1
    },
    // 返回上一页
    return_top_tushu: function () {
      console.log(123);
      wx.navigateBack({ 
        
        changed: true 

      });//返回上一页
    },
    onLoad: function() {
        var t = {
            page: 1,
            status: ""
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
    tab: function(t) {
        var a = t.currentTarget.dataset.status, s = {
            page: 1,
            status: "all" == a ? "" : a
        };
        console.error(a), this.setData({
            status: a,
            list: []
        }), this.getlist(s);
    },
    onReachBottom: function() {
        var t = this, a = {
            page: t.data.page,
            status: t.data.status
        };
        t.getlist(a);
    },
    getlist: function(t) {
        var s = this;
        s.setData({
            loading: !0
        }), a.get("dividend/log/get_list", t, function(a) {
            if (console.error(a), 0 == a.error) {
                if (a.list.length > 0) {
                    var e = s.data.list.concat(a.list);
                    t.page = t.page + 1;
                }
                s.setData({
                    dividendcount: a.dividendcount,
                    list: e,
                    loading: !1,
                    total: a.total,
                    page: t.page,
                    stop: !1
                });
            }
        });
    }
});