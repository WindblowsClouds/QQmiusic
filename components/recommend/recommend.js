

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    HotSonglist:Array,
    recommendTtext:String
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    HotSongArr:[]

  },
  observers:{
    //监测数据改变，当数据返回时
    'HotSonglist[0]':function(n1){
      if(n1){
        this.setData({
          HotSongArr:this.data.HotSonglist.slice(8,14).reverse()
        })
      }
    }
  },



  /**
   * 组件的方法列表
   */
  methods: {


  }
})
