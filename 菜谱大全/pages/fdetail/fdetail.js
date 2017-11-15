// pages/detail/detail.js
var url = "https://apis.juhe.cn/cook/query.php";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/  
var apiKey = "8ad790706d89ef987bb2926272f79b64";    //输入自己的key  
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
    var inputValue = options.inputValue;
    console.log(mcookId);
    console.log(inputValue);
    //根据菜谱的id去查询菜谱的具体信息。
  wx.request({
    url: url + '?mcookId=' + mcookId + '&key=' + apiKey + "&menu=" + that.data.inputValue,
    header: {
      "Content-Type": "json"
    }, fail: function (err) {

      console.log(err);

    },
    success: function (res) {
      console.log(res);
      var i = 0;
      var mresult = res.data.result.data;
      for (i = 0; i < mresult.length; i++) {
        var myncook = mresult[i];
        if (myncook.id == mcookId) {
          console.log(myncook.id);
          console.log(mcookId);
          that.setData({
            item: myncook,
            albums: myncook.albums,
            title: myncook.title,
            tags: myncook.tags,
            imtro: myncook.imtro,
            ingredients: myncook.ingredients,
            burden: myncook.burden,
            steps: myncook.steps,
          })
        } else {
          continue;
        }
      }

      //  console.log(mycookies);
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