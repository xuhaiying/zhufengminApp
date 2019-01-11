import {
  base_url
} from "./config.js";

function request({ url, method = "GET", header={},data="",success=()=>{},fail=()=>{}}) {
  wx.request({
      url: base_url + url,
      method:method,
      data: data,
      header: header,
      success: (res) => {
        const data = res.data;
        if (data.status != undefined && data.status == 'ok'){
          success(data.data);
        } else {
          wx.showToast({
            title: '出错了',
            icon: 'none'
          })
        }
        },
        fail: (err) => {
          wx.showToast({
            title: '调用接口失败',
            icon: 'none'
          })
        }
      })
  }
  export {
    request
  }