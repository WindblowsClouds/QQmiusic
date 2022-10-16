// custom-tab-bar/index.js
import {storeBindingsBehavior} from "mobx-miniprogram-bindings";
import {store} from "../store/store"  
Component({
  behaviors: [storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store,
    fields: { activeTabBarindex:()=>store.activeTabBarindex },
    actions: {
      updateActive: "updateactiveIndex",
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
      "pagePath": "/pages/music/music",
      "text": "音乐",
      "iconPath": "../images/nmusic.png",
      "selectedIconPath": "../images/music.png"
    },
    {
      "pagePath": "/pages/mvideo/mvideo",
      "text": "视频",
      "iconPath": "../images/nvideo.png",
      "selectedIconPath": "../images/video.png"
    },
    {
      "pagePath": "/pages/user/user",
      "text": "我的",
      "iconPath": "../images/nuser.png",
      "selectedIconPath": "../images/user.png"
    }
  ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      this.updateActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath,
      })
    },

  }
})
