import {createStoreBindings} from "mobx-miniprogram-bindings";
import{store} from "../../../store/store"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchInfoList:{}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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