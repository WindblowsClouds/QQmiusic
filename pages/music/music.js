// pages/music/music.js
const API=require('../../API/api')
import {createStoreBindings} from "mobx-miniprogram-bindings";
import{store} from "../../store/store"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    enList:[
      {name:'新歌',type:"newsong",img:'../../images/newsong.png'},
      {name:'歌手',type:"singer",img:'../../images/singer.png'},
      {name:'排行版',type:"ranking",img:'../../images/ranking.png'},
      {name:'歌单',type:"songlist",img:'../../images/songlist.png'}
    ],
    HotSongliststr:'recommend_expire=0&sign=52186982747e1404d426fa3f2a1e8ee4&plat=0&uid=0&version=9108&page=1&area_code=1&appid=1005&mid=286974383886022203545511837994020015101&_t=1545746286',
    recommendTtext:['热门歌单','热门推荐','直播推荐']
  },
  //entrance页面跳转
  goentrance(e){
    wx.navigateTo({
      url: `/entrance/pages/${e.target.dataset.topage}/${e.target.dataset.topage}`,
    })
  },
  //刷新今日推荐
  refreshSongs(){
    console.log('1');
    this.getRandomSongs({sort:'热歌榜',format:'json'})
  },
 async onLoad(options) {
  this.storeBindings = createStoreBindings(this, {
    store, // 需要绑定的数据仓库
    fields: {
      randomSongs:()=>store.randomSongs,
      HotSonglist:()=>store.HotSonglist,
      HotClass:()=>store.HotClass
    }, // 将 this.data.list 绑定为仓库中的 list ，即天气数据
    actions: ['getRandomSongs','getHotSonglist','getHotClass'], // 将 this.setList 绑定为仓库中的 setList action
  })
  //调用store中的getRandomSongs
  this.getRandomSongs({sort:'热歌榜',format:'json'}),
  this.getHotSonglist(this.data.HotSongliststr)
  this.getHotClass('showtype=3&apiver=2&plat=0')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

 

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // this.storeBindings.destroyStoreBindings();

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})