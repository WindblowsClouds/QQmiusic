// search/pages/search/search.js
import {createStoreBindings} from "mobx-miniprogram-bindings";
import{store} from "../../../store/store"
import tool from '../../../utils/tool'
const API=require('../../../API/api')
Page({

  data: {
    start:'',
    //光标在put框的状态，0代表历时搜索，1代表有联想搜索，2代表歌曲搜索
    curblur:0,
    //搜索歌曲
    songsname:{keyword:'',showtype:14},
    //搜索历史
    searchHistory:[]
  },
  //取消按钮
  cancle(e){
    //点击取消按钮时，清空输入框
    this.setData({
      start:'',
      curblur:0,
      searchWord:''
    })
  },
    // 搜索歌曲
    getSongs(e) {
      if(e.detail.value){
        this.setData({
          curblur:2,
          'songsname.keyword':e.detail.value
        })
        this.getsearchSong(this.data.songsname)
        //将搜索历史本地存储化
        //判断是否开启搜索历史的本地存储
        if(wx.getStorageSync('searchHistroyList')){
          let searchHistroy= wx.getStorageSync('searchHistroyList')
          //判断本地存储是否有有相同历史
          let flag=searchHistroy.some((item)=>item.keyword==e.detail.value)
          if(!flag){
            searchHistroy.push({keyword:e.detail.value})
            wx.setStorageSync('searchHistroyList', searchHistroy)
        }
        }else{
          let searchHistroy=[]
          searchHistroy.push({keyword:e.detail.value})
          console.log(searchHistroy);
          wx.setStorageSync('searchHistroyList', searchHistroy)
          console.log('2');
        }
        //更新搜索历史
        this.updateSearchHistory()
      }

  },
  //搜索联想
  getAssociate:tool.debounce(function (e) {
    this.setData({  
      searchWord:e[0].detail.value,
    })
    let keyword=e[0].detail.value
    if(keyword){
      //避免搜索界面与联想界面冲突
      if(this.data.curblur!=2){
        this.setData({curblur:1})
      }
      this.getsearchAssociate(`student=0&cmd=302&keyword=${keyword}&with_res_tag=1`)
    }else{
      this.setData({
        curblur:0
      })
    }
  },1000),
  //更新搜索历史
  updateSearchHistory(){
    this.setData({
      searchHistory:wx.getStorageSync('searchHistroyList')||[]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //处理历时搜索界面
    this.setData({
      curblur:0
    })
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: {
        searchAssociateList:()=>store.searchAssociateList ||[],
        searchSongList:()=>store.searchSongList ||[],
        searchSong:()=>store.searchSong,
        randomSongs:()=>store.randomSongs
      }, 
      actions: {
        getsearchAssociate:'getsearchAssociate',
        getsearchSong:'getsearchSong',
        getRandomSongs:'getRandomSongs'}
    })
    //更新搜索历史
    this.updateSearchHistory()

    this.getRandomSongs({sort:'热歌榜',format:'json'})
  },
  //跳转播放界面
  goplay(){
    wx.navigateTo({
      url: '/play/pages/play/play',
      success: (res)=> {
        // 通过 eventChannel 向被打开页面传送数据
      res.eventChannel.emit('acceptDataFromSearchPage', {data:this.data.randomSongs})
      }
    })
  },
  //清空历史搜索
  clearHistorSearch(){
    wx.clearStorageSync('searchHistroyList')
    this.setData({
      searchHistory:[]
    })
    console.log('1');
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