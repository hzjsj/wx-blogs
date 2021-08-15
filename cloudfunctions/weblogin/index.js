const cloud = require('wx-server-sdk')
cloud.init({ env: "ww" });
const tcb = require("@cloudbase/node-sdk")

const app = tcb.init({ env: "ww" });
const auth = app.auth();

const axios = require('axios')
const APPID = "wxe516039246822ce2"  //换成你的小程序appid
const APPSECRET= "2e45d7476e960e*************" //换成你的小程序key
exports.main = async (event, context) => {
  const { userInfo } = await auth.getEndUserInfo();
  console.log(userInfo);
  const {uid} = userInfo

    const tokenurl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${APPSECRET}`
    const res = await axios.get(tokenurl)
    const {access_token} = res.data

    const qrcodeurl=`https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`
    const wxacodeResult = await axios({
      method: 'post',
      url: qrcodeurl,
      responseType: 'arraybuffer',
      data: {
        scene:uid,
        page:"pages/login/login"
      }
    });

    const uploadResult = await cloud.uploadFile({
      cloudPath: `${uid}.jpeg`,
      fileContent: wxacodeResult.data
    })

    return {
      uid:uid,
      fileId:uploadResult.fileID
    }
}