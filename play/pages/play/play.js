import {createStoreBindings} from "mobx-miniprogram-bindings";
import{store} from "../../../store/store"
const API=require('../../../API/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfoList:{},
    activity:1,
    progress:0


  },
  onclick(){
    const backgroundAudioManager = wx.getBackgroundAudioManager()
    this.setData({
      activity:this.data.activity==1?0:1
    })
    backgroundAudioManager.title='十年'
    backgroundAudioManager.src = 'http://fsmobile.hw.kugou.com/202210162024/c5c8d6a634a04e86e460b936f27e14fd/v2/34c7777fffdd4fdf04e02af1f6857ca4/G083/M08/00/04/84YBAFhks0aAYGsBADl8RUL2DXQ825.mp3'
    if(this.data.activity){
      backgroundAudioManager.pause()
    }else{
      backgroundAudioManager.play()
    }
   
    console.log(backgroundAudioManager.currentTime);
    backgroundAudioManager.onTimeUpdate(()=>{
      let cur=backgroundAudioManager.currentTime
      let now=parseInt(cur/235*100)
      this.setData({
        progress:now
      })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.storeBindings = createStoreBindings(this, {
      store, // 需要绑定的数据仓库
      fields: {
        searchSongImg:()=>store.searchSongImg ||{},
      }
    })
    //监听路由跳转的事件，获取数据
    const eventChannel = this.getOpenerEventChannel()
     if(eventChannel.on){
      eventChannel.on('acceptDataFromOpenerPage', (data)=>{
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