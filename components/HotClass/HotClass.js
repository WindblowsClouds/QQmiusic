

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    HotClass:Array,
    recommendTtext:String
   
  },

  /**
   * 组件的初始数据
   */
  data: {
    HotClassArr:[]

  },
  observers:{
    //监测数据改变，当数据返回时
    'HotClass[0]':function(n1){
      if(n1){
        this.setData({
          HotClassArr:this.data.HotClass
        })
        console.log(this
          .data.HotClassArr);
      }
    }
  },



  /**
   * 组件的方法列表
   */
  methods: {


  }
})
