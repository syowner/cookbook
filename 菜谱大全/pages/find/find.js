var url = "https://apis.juhe.cn/cook/query.php";
//为了您的密钥安全，建议使用服务端代码中转请求，事例代码可参考 https://code.juhe.cn/  
var apiKey = "8ad790706d89ef987bb2926272f79b64";    //输入自己的key  

Page({
  data: {
    inputValue: '',
    albums: '',
    title: '',
    tags: '',
    imtro: '',
    ingredients: '',
    burden: '',
    cooklist:[],
    page:0
  },
  //获取输入框的值  
  inputchange: function (e) {
    var that = this;
    that.setData({
      inputValue: e.detail.value
    });
  },
 showDetail: function (event) {
   var that = this;
  var mcookId = event.currentTarget.id;
    console.log(mcookId);
    //跳转到菜谱的详情页面,并将菜谱的id传递过去
   wx.navigateTo({
     url: '../detail/detail?id=' + mcookId,
    }),
     wx.request({
        url: url + '?mcookId=' + mcookId + '&key=' + apiKey+"&menu=" + that.data.inputValue,
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
  //点击搜索按钮调用的函数  
  search: function (e) {
  //数据加载完成之前，显示加载中提示框
    var that = this;  
    wx.showToast({
      title: '加载中。。。',
      icon: 'loading',
      duration: 10000
    });
    //输入框没有输入的判断  
    if (that.data.inputValue == '') {
      wx.hideToast();
      return;
    }
    //发起请求，注意 wx.request发起的是 HTTPS 请求  
    wx.request({
      url: url + "?menu=" + that.data.inputValue + "&key=" + apiKey,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.data.resultcode=="202"){
          console.log("没有数据");
          wx.showToast({
            title: '亲，没有的菜谱',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }else{
          // console.log(res);
          var mres = res.data;
          // console.log(mres);

          //将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值  
          that.setData({
            item: mres.result.data,
          });
          //数据加载成功后隐藏加载中弹框  
          wx.hideToast();

        }
        
      }
    })

  },

})  