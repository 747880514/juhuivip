var t = getApp().requirejs("core");

Page({
    data: {
     
    },
    onLoad: function(t) {
      this.getPage();
    },
    // onShow: function() {
    //     this.getData();
    // },
    // getData: function() {
    //     var e = this;
    //     t.get("commission/index", {}, function(t) {
    //         7e4 != t.error ? (t.show = !0, e.setData(t), wx.setNavigationBarTitle({
    //             title: t.set.texts.center
    //         })) : wx.redirectTo({
    //             url: "/pages/commission/register/index"
    //         });
    //     });
    // }
    getPage: function () {
      t.get("commission/register", {}, function (t) {
        70003 != t.error ? wx.redirectTo({
          url:"/pages/custom/index?pageid=76"
        }) : wx.redirectTo({
          url:"/pages/diy/tushu/equities/equities"
        });
      });
    }
});