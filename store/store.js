import { observable , action } from "mobx-miniprogram"
const API=require('../API/api')
export const store=observable({
  activeTabBarindex:0,
  //获取随机歌曲
  randomSongs:{},
  //热门歌单列表
  HotSonglist:{},
  //热门分类列表
  HotClass:{},
  //获取搜索联想数据，为json数据
  searchAssociateListStr:'',
  //搜索歌曲列表
  searchSong:{},
  //处理json数据
  get searchAssociateList(){
    let data=this.searchAssociateListStr.replace('<!--KG_TAG_RES_START-->','').replace('<!--KG_TAG_RES_END-->','')
    //需要对data判断是否为空串，不然json.parse报错
    if(!data==''){
      return JSON.parse(data).data
    }
  },
  //处理searchSong数据
  get searchSongList(){
    if(!Object.keys(this.searchSong).length==0){
      return this.searchSong.data.data.info||[]
    }
  },
  //得到搜索歌曲对应图片
  get searchSongImg(){
    if(this.searchSong.data.relative.singer){
      return this.searchSong.data.relative.singer[0]||{}
    }else{
      //解决当singer图片为空时报错
      return {imgurl:'../../../images/wind.png'}
    }
  },

  //action,用来修改store中的值
  updateactiveIndex:action(function(index){
    this.activeTabBarindex=index
  }),
  //获取随机歌曲
  getRandomSongs: action(async function(data){
  this.randomSongs=(await API.getRandomSongs(data))||{}
  }),
  //获取热门歌单
  getHotSonglist:action(async function(data){
    this.HotSonglist=(await API.getHotSonglist(data))||{}
  }),
  //请求热门分类数据
  getHotClass:action(async function(data){
    this.HotClass=(await API.getHotClass(data))||{}
  }),
  //请求搜索联想
  getsearchAssociate:action(async function(data){
    this.searchAssociateListStr=(await API.getsearchAssociate(data))||[];
  }),
  //歌曲搜索
  getsearchSong:action(async function(data){
    this.searchSong=(await API.getsearchSong(data))||{}
  })
  
})