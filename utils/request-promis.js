import {
  base_url
} from './config.js';

function request({
  url,
  method = "GET",
  header = {},
  data = "",
  success = () => {},
  fail = () => {}
}) {
  const p = new Promise((resolve, reject) => {
    wx.request({
      url: base_url+ url,
      data: data,
      header: header,
      method: method,
      success: (res) =>{
        const data = res.data;
        if(data.status != undefined && data.status == "ok"){
          resolve(data.data);
        } else {
          reject();
          wx.showToast({
            title: '出错了',
            icon: 'none'
          })
        }
      },
      fail: (err)=>{
        reject();
        wx.showToast({
          title: '调用接口失败',
          icon: 'none'
        })
      }
    })
  })
  return p;
}
export {
  request
};