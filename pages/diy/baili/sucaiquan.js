var t = getApp(), e = t.requirejs("core"), i = t.requirejs("foxui"), a = t.requirejs("jquery");

Page({
  data: {
    route: "cart",
    icons: t.requirejs("icons"),
    material_lists: !1,
    closeBtn: !1,
    gid : "",
    gtitle: "",
    page:1
  },
  // 返回上一页
  return_top_tushu: function () {
    console.log(123);
    wx.navigateBack({ changed: true });//返回上一页
  },
  return_index_tushu: function () {
    wx.switchTab({
      //返回首页
      url: '/pages/index/index',
    })
  },
  onLoad: function (e) {
    t.url(e);
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
  onShow: function () {
    this.get_material();
    var t = this;
    wx.getSetting({
      success: function (e) {
        var i = e.authSetting["scope.userInfo"];
        t.setData({
          limits: i
        }), i || t.setData({
          modelShow: !0
        });
      }
    });
  },
  get_material: function () {
    var t, i = this;
    var p = this.data.p;
    e.get("member/baili/material", {'p':p}, function (e) {
      t = {
        show: !0,
        ismerch: !1,
        empty: e.empty || !1
      }, void 0 === e.material_lists ? (t.list = e.list || [], i.setData(t)) : (t.material_lists = e.material_lists || [],
        t.ismerch = !0, i.setData(t));
    });
  },
  url: function (t) {
    var i = e.pdata(t);
    wx.navigateTo({
      url: i.url
    });
  },
  imgYu: function (event) {
    var src = event.currentTarget.dataset.src;//获取data-src
    var imgList = event.currentTarget.dataset.list;//获取data-list
    //图片预览
    wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: imgList // 需要预览的图片http链接列表
    })
  },
  closeBtn: function () {
    this.setData({
      closeBtn: !1
    });
  },
  showshade: function (e) {
    this.setData({
      closeBtn: !0,
      gid: e.currentTarget.dataset.id,
      gtitle: e.currentTarget.dataset.title
    });
  },
  sharePoster: function () {
    wx.navigateTo({
      url: "/pages/goods/poster/poster?id=" + this.data.gid
    });
  },
  onShareAppMessage: function () {
    return this.setData({
      closeBtn: !1
    }), i.onShareAppMessage("/pages/goods/detail/index?id=" + this.data.gid, this.data.gtitle);
  },
  saveimg : function(url){
    wx.downloadFile({
      url: url,     //仅为示例，并非真实的资源
      success: function (res) {
        wx.showLoading({
          title: "图片下载中..."
        })
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '保存图片成功！',
              })
            },
            fail(res) {
              wx.showToast({
                title: '保存图片失败！',
              })
            }
          })
        }
      }
    })
  },
  downimg : function(e){
    // 下载图片
    // var imgs = e.currentTarget.dataset.imgs;
    // for(var i = 1 ; i <= imgs.length ; i++)
    // {
    //   if (imgs[i] != 'undefined')
    //   {
    //     this.saveimg(imgs[i]);
    //   }
    // }

    //复制文本
    this.setData({
      copytxt: e.currentTarget.dataset.copy
    });
    this.copytxt();
  },
  copytxt: function (e) {
    var self = this;
    wx.setClipboardData({
      data: self.data.copytxt,
      success: function (res) {

      }
    });
  },
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    that.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=member.baili.material&p=' + that.data.page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 隐藏加载框
        wx.hideLoading();
        // 回调函数
        var moment_list = that.data.material_lists;

        for (var i = 0; i < res.data.material_lists.length; i++) {
          moment_list.push(res.data.material_lists[i]);
        }
        // 设置数据
        that.setData({
          material_lists: moment_list
        })
        
      }
    })

  }
});
