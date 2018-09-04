var app = getApp();
Page({
  data: {
    currentTab: 0, //预设当前项的值

  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
    this.checkCor();
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  checkCor: function () {
    if (this.data.currentTab > 3) {
      this.setData({
        scrollLeft: 300
      })
    } else {
      this.setData({
        scrollLeft: 0
      })
    }
  },
  onLoad: function () {
    var that = this;
    that.gaodu();
    that.banner();
  },
  gaodu: function () {
    var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 96;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
  },
  // banner切换
  banner: function () {
    var that = this;
    that.setData({
      imgUrls: [
        { img: "https://www.juhuivip.com/attachment/images/2/2018/08/AqbMMqCiXccG4v004qEBX45Q59iBE5.jpg" },
        { img: "https://www.juhuivip.com/attachment/images/2/2018/08/E5hDDy5Ayd99uZ9HhzDb959dL57H7R.png" },
        { img: "https://www.juhuivip.com/attachment/images/2/2018/08/Q5D6cqaTXDCGax363Ai6766dk6ZTC7.png" },
        { img: "https://www.juhuivip.com/attachment/images/2/2018/08/Un6kfFlEjZNJU66a04RdW1xmOFOoL6.jpg" },
        { img: "https://www.juhuivip.com/attachment/images/2/2018/08/vvnRRzqRPWBZWnr85z5nDNnSBwPB77.jpg" },
        { img: "https://www.juhuivip.com/attachment/images/2/2018/07/PUsEguv0Sg00DnUB3R6gkldViEgg6g.png" }
      ],
    });
  }
})

