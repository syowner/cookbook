// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    albums: "",
    title: "",
    tags: "",
    imtro: "",
    ingredients: "",
    burden: "",
    steps: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // console.log(that.result.data);
    //从参数中取出菜的id
    var mcookId = options.mcookId;
    console.log(mcookId);
    var url = "https://apis.juhe.cn/cook/query.php?menu=%E8%8F%9C&dtype=&pn=&rn=&albums=&=&key=8ad790706d89ef987bb2926272f79b64&mcookId" + mcookId;
    //根据电影的id去查询电影的具体信息。
    wx.request({
      url: url  ,
      header: {
        "Content-Type": "json"
      }, fail: function (err) {

        console.log(err);

      },
      success: function (res) {
        console.log(res);
        var i=0;
        for (i = 0; i < res.data.result.data.length;i++){
          var mycookies = res.data.result.data[i];
          if (mycookies.id == mcookId){
            that.setData({
           albums: mycookies.albums,
            title: mycookies.title,
             tags: mycookies.tags,
             imtro: mycookies.imtro,
             ingredients: mycookies.ingredients,
             burden: mycookies.burden,
             steps: mycookies.steps,
           })
          }else{
           continue;
          }
        }
        
        console.log(mycookies);
     }
    })
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})