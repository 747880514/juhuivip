Page({

  data: {

    imgUrls: [

      'https://www.juhuivip.com/attachment/images/2/2018/07/nSCcXNNosxTxbP8AKp2NAxfo4xOSTN.jpg',

      'https://www.juhuivip.com/attachment/images/2/2018/07/Mk1uzEo61rE6RT0xZIj0x7E6Eellou.jpg'

    ],
    logo: 'logo',
    merchname: 'merchname',
    tel: 'tel',
    realname: 'realname',
    mobile: '',
    lat: 'lat',
    lng: 'lng',
    address:'address',
    list:[],
    page: 1

  },

  //轮播图的切换事件

  swiperChange: function (e) {

    this.setData({

      swiperCurrent: e.detail.current

    })

  },

  //点击指示点切换

  chuangEvent: function (e) {

    this.setData({

      swiperCurrent: e.currentTarget.id

    })

  },

  //点击图片触发事件

  swipclick: function (e) {

    console.log(this.data.swiperCurrent);

    wx.switchTab({

      url: this.data.links[this.data.swiperCurrent]

    })

  },
  // 接口加载ajax
  onLoad: function (options){
    var that = this;

    wx.request({
      url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=shop.baili.lists',
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data.result.lists,

        })
      }
    })
  },

  // 打电话
  calling: function () {
    var thii = this;
    wx.makePhoneCall({
      phoneNumber: thii.data.mobile,
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  // 分页
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
      url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=shop.baili.lists&p=' + that.data.page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // // 回调函数
        var moment_list = that.data.list;

        for (var i = 0; i < res.data.result.lists.length; i++) {
          moment_list.push(res.data.result.lists[i]);
        }
        // 设置数据
        that.setData({
          list: moment_list
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  }




})