var e = getApp(),
  t = e.requirejs("core"),
  a = e.requirejs("wxParse/wxParse"),
  i = e.requirejs("biz/diypage"),
  o = e.requirejs("jquery");
var bmap = require('../../../../libs/bmap-wx.min.js');
var wxMarkerData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo: 'logo',
    merchname: 'merchname',
    merch_url: 'merch_url',
    lat: 'lat',
    lng: 'lng',
    list: [],
    page: 1,
    url:'url',
    markers: [],
    latitude: '',
    longitude: '',
    rgcData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listenerBtnGetLocation();
    // this.dingWei();
    this.getDGA();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)//手机机型
        console.log(res.model == "iPhone X")
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
    })
  },
  
  /**
   * 页面上拉触底事件的处理函数
   */
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
      url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=merch.baili.ajaxmerchuser&page=' + that.data.page + '&lat=' + that.data.latitude + '&lng=' + that.data.longitude,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },

      
      success: function (res) {
        // 隐藏加载框
        wx.hideLoading();
        if (res.data.list)
        {
          // 回调函数
          var lista = that.data.list;

          for (var i = 0; i < res.data.list.length; i++) {
            lista.push(res.data.list[i]);
          }
          // 设置数据
          that.setData({
            list: lista,
          })
        }
        else{
          wx.showLoading({
            title: '加载完毕',
          })
          setTimeout(function () {
            wx.hideLoading();
          }, 500) 

        }

       
      }
      
    })
  },
  // 定位

  /**
   * 监听定位到当前位置
   */
  listenerBtnGetLocation: function () {
    var that = this;
    wx.getLocation({
      //定位类型 wgs84, gcj02
      type: 'gcj02',
      success: function (res) {
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
        that.Appshangajax();
      },
      fail: function (err) {
        console.log(err)
      }
    })
    
    
  },
  // dingWei: function(){
  //   var that = this;
  //   // 新建百度地图对象 
  //   var BMap = new bmap.BMapWX({
  //     ak: 'M46DfGUF7dsYX9YGTlcrvoexd3ZodRH6'
  //   });
  //   var fail = function (data) {
  //     console.log(data)
  //   };
  //   var success = function (data) {
  //     wxMarkerData = data.wxMarkerData;
  //     that.setData({
  //       markers: wxMarkerData
  //     });
  //     that.setData({
  //       latitude: wxMarkerData[0].latitude
  //     });
  //     that.setData({
  //       longitude: wxMarkerData[0].longitude
  //     });
  //     console.log(that.data.longitude)
  //     console.log(that.data.latitude)

  //     that.Appshangajax();
  //   }
    // 发起regeocoding检索请求 
  //   BMap.regeocoding({
  //     fail: fail,
  //     success: success,
  //     iconPath: '../../img/marker_red.png',
  //     iconTapPath: '../../img/marker_red.png'
  //   });
  // },
  // ajax调用
  Appshangajax: function () {
    var that = this;

    wx.request({
      url: 'https://www.juhuivip.com/app/ewei_shopv2_api.php?i=2&r=merch.baili.ajaxmerchuser&page=1&lat=' + that.data.latitude + '&lng=' + that.data.longitude,
      method: "GET",
      header: {
        'Content-Type': 'application/json'
      },

      success: function (res) {
        console.log(res.data);
        that.setData({
          list: res.data.list,
        })
      }
    })
  },
  getDGA:function(){
    var that = this;
    t.get("shop/baili/get_city",function (t) {
      that.setData({

      });
    });
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
  }

})