import {createStoreBindings} from "mobx-miniprogram-bindings";
import{store} from "../../../store/store"
const API=require('../../../API/api')
import tool from '../../../utils/tool'
const backgroundAudioManager = wx.getBackgroundAudioManager()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfoList:{},
    //'1'表示暂停，0，表示暂停
    activity:1,
    progress:0,
    //音乐当前播放秒数
    cur:'',
    //音乐总时长
    dur:''


  },
  //将音乐播放包装
  musicAudio(){
    backgroundAudioManager.title=this.data.searchInfoList.name
    backgroundAudioManager.src = this.data.searchInfoList.url
    if(this.data.activity){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
    //通过音乐进度更新计算进度条
    backgroundAudioManager.onTimeUpdate(()=>{
      //获取音乐当前播放时间与总时间，计算进度条进度
      let dur=backgroundAudioManager.duration
      let cur=backgroundAudioManager.currentTime
      if(cur&&dur){
        this.setData({
          cur:tool.formatSeconds(cur),
          dur:tool.formatSeconds(dur)
        })
        let progress=parseInt(cur/dur*100)
        this.setData({
          progress:progress
        })
      }
    })
    backgroundAudioManager.onEnded(()=>{
      this.setData({
        activity:1
      })
    })
    //监听播放错误时间
    backgroundAudioManager.onError(()=>{
      Notify('通知内容');
    })
  },
  //随机下一首
  randomnext(){
    this.getRandomSongs({sort:'热歌榜',format:'json'})
    this.setData({
      searchInfoList:this.data.randomSongs
    })
    backgroundAudioManager.stop()
    this.musicAudio()
  },
  onclick(){
    this.setData({
      activity:this.data.activity==1?0:1
    })
    this.musicAudio()
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: {
        randomSongs:()=>store.randomSongs
      },
      actions:['getRandomSongs']
    })
    //监听路由跳转的事件，获取数据
    const eventChannel = this.getOpenerEventChannel()
     if(eventChannel.on){
      eventChannel.on('acceptDataFromMusicPage', (data)=>{
        this.setData({
          searchInfoList:data.data
        })
      })
      //歌曲搜索界面路由跳转
      eventChannel.on('acceptDataFromSearchPage',(data)=>{
        this.setData({
          searchInfoList:data.data
        })
      })
     }
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