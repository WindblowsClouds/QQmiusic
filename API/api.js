import {promisifyAll} from "miniprogram-api-promise"
const wxp=wx.p={}
promisifyAll(wx,wxp)
//使用miniprogram-api-promise封装api
//网易随机接口api
const first_url="https://api.uomg.com"
 const wrequest= async (url,data)=>{
  let _url=first_url+url;
  let {data:res}= await wx.p.request({
    url:_url,
    method:'GET',
    data:data
  }) 
  return res.data
};
//酷狗api
const base_url="http://mobilecdnbj.kugou.com/api"
//封装
const krequest= async (url,data)=>{
  let _url=base_url+url;
  let {data:res}= await wx.p.request({
    url:_url,
    method:'POST',
    data:data,
    header: {
      //设置参数内容类型为x-www-form-urlencoded
      'content-type':'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
  }) 
  return res.data
};
//搜索联想
const ass_url="http://msearchcdn.kugou.com"
const arequest= async (url,data)=>{
  let _url=ass_url+url;
  let res= await wx.p.request({
    url:_url,
    method:'POST',
    data:data,
    header: {
      //设置参数内容类型为x-www-form-urlencoded
      'content-type':'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    },
  }) 
  return res.data
};

const srequest=async (url,data)=>{
  let _url=ass_url+url;
  let res=wx.p.request({
    url:_url,
    method:'GET',
    data:data
  })
  return res
}
module.exports={
  //随机推荐
   getRandomSongs:(data)=>{
    return wrequest('/api/rand.music',data)
  },
  //热门歌单
    getHotSonglist:function(data){
    return krequest('/v5/special/recommend',data)
  },
  //热门分类
  getHotClass:function(data){
    return krequest('/v3/tag/recommend',data)
  },
  //搜索联想
  getsearchAssociate:function(data) {
    return arequest('/new/app/i/search.php',data)
  },
  //搜索歌曲
  getsearchSong:function(data){
    //data必须为对象
    return srequest('/api/v3/search/song',data)
  },


}