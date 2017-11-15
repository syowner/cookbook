var that;
var app = getApp() 
Page({

  /**
   * 页面的初始数据
   */
   
  data: {
    swiperImageUrls: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508951277314&di=4c81fa0335673467683bb5ef75f3dcc2&imgtype=0&src=http%3A%2F%2Fimg1.meichubang.com%2Fpic%2F201408%2F19%2Fe506e77cb96eb823d40c080e63b04151.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508951277479&di=e7a6495e82f03965259b1ed89113eb76&imgtype=0&src=http%3A%2F%2Fimg1.qunarzz.com%2Ftravel%2Fd4%2F1411%2F6a%2F6a104a66911fcef0213a9cdb.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508951277476&di=3599899df2872a47a79045a0742f0584&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F00%2F89%2F10%2F78bOOOPIC8c.jpg'
    ],
    duration: 1000,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    loading: false,
    plain: false,
  message: 'Hello!',
  item:[],
  cooklist:[],
  url: 'https://apis.juhe.cn/cook/query.php?menu=%E8%8F%9C&dtype=&pn=&rn=&albums=&=&key=8ad790706d89ef987bb2926272f79b64',
  page:0
  },
  showDetail: function(event) {

    var mcookId = event.currentTarget.id;
    //跳转到美食的详情页面,并将美食的id传递过去
    wx.navigateTo({
      url: '../detail/detail?mcookId=' + mcookId,
    })
  },
  getCooksFromNet: function(page) {

    //显示加载框
    wx.showLoading({
      title: '加载中',
    })
    console.log("获取的页数：" + page);
    wx.request({
      url: that.data.url,
      header: {
        'Content-Type': 'json'
      },
      data: {
        start: page * 20,
        count: 20,

      },
      fail: function (err) {
        console.log(err);
      },
      success: function (res) {
        //让页数加1
        that.setData({
          page: ++that.data.page
        });

        if (!res.data.result.data) {
          return;
        }

        //判断是否已经是最后一页
        if (res.data.result.data.length < 20 && res.data.result.data.length != 0) {
          //说明到最后一页了
          wx.showToast({
            title: "没有更多数据了"
          })

        } else if (res.data.result.data.length === 0) {

          wx.showToast({
            title: "没有更多数据了"
          })
          return;

        }

        //关闭加载框
        wx.hideLoading()
        console.log(res);
        that.setData({

          cooklist: that.data.cooklist.concat(res.data.result.data),

        })
      }
    })
  }
  ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that =this;
    wx.request({
      url:"https://apis.juhe.cn/cook/query.php?menu=%E8%8F%9C&dtype=&pn=&rn=&albums=&=&key=8ad790706d89ef987bb2926272f79b64",
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (data) {
        var i=0;
        that.setData({
          item: data.data.result.data[i],
          //res代表success函数的事件对，data是固定的，stories是是上面json数据中stories
        })
        console.log(data);
        that.getCooksFromNet(0);
      }
      
    })
    //使用微信网络请求API，向豆瓣服务器发起查询本地电影信息的请求
    //  that.getCooksFromNet(that.data.page);
    
  },
 
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //向服务器发起下一页数据的请求
    that.getCooksFromNet(that.data.page);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})