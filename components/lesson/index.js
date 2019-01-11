// components/lesson/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    lesson:{
      type:Object,
      value: []
    }
  },
  // attached(){
  //   console.log(this.dataset)
  // },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e){
     // console.log(this.properties.lesson)
      const detail = this.properties.lesson;
      this.triggerEvent("myEvent",detail,{});
    }
  }
})
