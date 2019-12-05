<template>
    <div style="height:100%">
      <div id="app">
        <div class="top">
          <div class="title">
            <p>美家家-全周期美居生活管家</p>
            <div class="open" @click="funa()">打开APP</div>
          </div>
        </div>
          <!-- 标题 -->
          <div class="page-tab">
            <div v-for="(val, key) in tabList">
              <div :class="currentId == val.id? 'tab-item tab-item_active' : 'tab-item'">
                <a href="#/" @click="page(key, val.id)" :class="currentId==''?'router-link-exact-active router-link-active': ''" mode="out-in">{{val.name}}</a>
              </div>
            </div>
          </div>
          <!-- 标题结束 -->
          <!-- 图片 -->
          <div class="swiper-container swiper-images">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(val, key) in tabList">
                  <div class="residence" :c_id="val.id">
                      <div class="pic">
                          <div class="bottompic">
                              <img :src="val.imgUrl">
                              <div class="btns" @click="funa()"></div>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
          </div>
          <!-- 图片结束 -->
          <div style="width:100%">
            <div class="navlist">
                <ul>
                  <li
                    class="navli"
                    v-for="(item,index) in navList" 
                    :class="{'activeT':nowIndex==index}"
                    @click="tabClick(index)" :key="index" 
                  >
                    <i>{{item.name}}</i>
                  </li>
                </ul>
              </div>
              <div class="swiper-container swiper-content">
                <div class="swiper-wrapper">
                  <!-- 第一个swiper -->
                  <div class="swiper-slide" id="swiperOne" ref="viewBoxi">
                    <div v-for="(conVal, conKey) in tabList">
                      <div class="lefttext" v-if="conVal.id == currentId">
                        <div v-for="(hardPlanVal, hardPlanKey) in conVal.hardPlanList">
                          <div class="livingroom">
                              <div class="imgbox" v-if="hardPlanVal.kind == 3">
                                <img :src="hardPlanVal.description"/>
                              </div>
                              <div class="textbox" v-if="hardPlanVal.kind == 1 || hardPlanVal.kind == 2" >
                                <span v-if="hardPlanVal.kind == 1">{{hardPlanVal.description}}</span>
                                <p v-if="hardPlanVal.kind == 2">{{hardPlanVal.description}}</p>
                              </div>
                              <!-- <div class="textbox">
                                <span v-if="conVal.hardPlanList[hardPlanKey-1].kind ==2">{{conVal.hardPlanList[hardPlanKey-1].description}}</span>
                                <p v-if="conVal.hardPlanList[hardPlanKey-1].kind ==2">{{conVal.hardPlanList[hardPlanKey-1].description}}</p>
                              </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 第二个swiper -->
                  <div class="swiper-slide" id="swiperTwo">
                    <div v-for="(conVal, conKey) in tabList">
                      <div class="righttext" v-if="conVal.id == currentId">
                        <div v-for="(softPlanVal, softPlanKey) in conVal.softPlanList">
                          <div class="livingroom">
                              <div class="imgbox" v-if="softPlanVal.kind == 3">
                                <img :src="softPlanVal.description" />
                              </div>
                              <div class="textbox" v-if="softPlanVal.kind == 1 || softPlanVal.kind == 2">
                                <span v-if="softPlanVal.kind == 1">{{softPlanVal.description}}</span>
                                <p v-if="softPlanVal.kind == 2">{{softPlanVal.description}}</p>
                              </div>
                              <!-- <div class="textbox">
                                <span v-if="conVal.softPlanList[softPlanKey-1].kind ==2">{{conVal.softPlanList[softPlanKey-1].description}}</span>
                                <p v-if="conVal.softPlanList[softPlanKey-1].kind ==2">{{conVal.softPlanList[softPlanKey-1].description}}</p>
                              </div> -->
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swiper from "swiper";
  import TabPages from "./components/index";
  import Programme from "./components/programme";
  import In from './components/introduction';
  import Sim from './components/simplicity';
  import Amer from './components/american'
  
  var that = this;
  export default {
    name: "app",
    data() {
      return {
        tabList:[],
        datas: "",
        one:"",
        two:"",
        three:"",
        path: "",
        nowIndexImg: 0,
        nowIndex: 0,
        obj:"",
        obj1:"",
        currentId:"",
        navList: [{ name: "硬装方案" }, { name: "软装方案" }],
      };
    },
    components: {
      TabPages,
      Programme,
      In,
      Sim,
      Amer
    },
    mounted() {
      this.path = this.$route.path;
      var that = this;
      // 图片swiper
      that.imageSwiper = new Swiper(".swiper-images", {
          initialSlide: 0,
          autoplay: false,
          speed:500,
          keyboardControl: true,
          autoHeight: true,
          touchRatio:1,
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,
          pagination:'.swiper-images .swiper-pagination',
          onSlideChangeStart: function() {
            that.nowIndexImg = that.imageSwiper.activeIndex;
          },
          on: {
            slideChangeTransitionStart: function() {
              that.nowIndexImg = that.imageSwiper.activeIndex;
              $('.tab-item').removeClass('tab-item_active');
              $('.tab-item').eq(that.nowIndexImg).addClass('tab-item_active');
              that.currentId = document.querySelectorAll('.residence')[that.nowIndexImg].getAttribute('c_id');
            }
          }
      });
      // 内容swiper
      that.contentSwiper = new Swiper(".swiper-content", {
        initialSlide: 0,
        autoplay: false,
        keyboardControl: true,
        autoHeight: true,
        touchRatio:1,
        observer:true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,
        pagination: '.swiper-content .swiper-pagination',
        //引入的swiper为3之后的版本
        onSlideChangeStart: function() {
          that.nowIndex = that.contentSwiper.activeIndex;
        },
        //引入的版本为4之后的版本
        on: {
          slideChangeTransitionStart: function() {
            that.nowIndex = that.contentSwiper.activeIndex;
              if(that.nowIndex == 1){
                document.getElementById("swiperOne").style.height="0"
                document.getElementById("swiperTwo").style.height="100%"
              }else  if(that.nowIndex ==0){
                document.getElementById("swiperOne").style.height="100%"
                document.getElementById("swiperTwo").style.height="0"
              }
          }
        }
      });
    },
    watch: {
      $route(to, from) {
        this.path = to.path;
      }
    },
    methods: {
      funa(){
            // if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            //     var loadDateTime = new Date();
            //     window.setTimeout(function() {
            //         var timeOutDateTime = new Date();
            //         if(timeOutDateTime - loadDateTime < 5000) {
                        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.memohome.mjj&fromcase=40002";
            //         } else {
            //             window.close();
            //         }
            //     },25);
            //     window.location = " apps custom url schemes ";
            // } else if(navigator.userAgent.match(/android/i)) {
            //     var loadDateTime = new Date();
            //     var state = window.open("apps custom url schemes ", '_blank');
            //     window.setTimeout(function() {
            //         var timeOutDateTime = new Date();
            //         if(timeOutDateTime - loadDateTime < 5000) {
            //             window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.memohome.mjj&fromcase=40002";
            //         } else {
            //             window.close();
            //         }
            //     },25);
            // }
        },
      funb() {
        this.bool = true;
      },
      func() {
        this.bool = false;
      },
      swiperleft: function() {
        this.$router.back(-1);
      },
      swiperright: function() {
        this.$router.push({ path: "/introduction" });
      },
      tabClick(index) {
        this.nowIndex = index;
        this.contentSwiper.slideTo(index, 1000, false);
         if(index == 1){
            document.getElementById("swiperOne").style.height="0"
            document.getElementById("swiperTwo").style.height="100%"
          }else if(index ==0){
            document.getElementById("swiperOne").style.height="100%"
            document.getElementById("swiperTwo").style.height="0"
          }
      },
      page(index, c_id){
        this.currentId = c_id;
        this.nowIndexImg = index;
        this.imageSwiper.slideTo(index, 1000, false);
        $('.tab-item').removeClass('tab-item_active');
        $('.tab-item').eq(index).addClass('tab-item_active');
      }

    },
   

    created() {
      var that = this;

      function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1];
            }
        }
        return ""
      } 

       var roomId = getQueryVariable('id');
      // var roomId = '1201710518818295809';
      this.axios({
        method: "get",
        url:
          "https://www.memohome.net/app1_2/api/plan/plan_list?roomId=" + roomId,
        data: {}
      })
        .then(function(res) {
          console.log(res);
          $.each(res.data.data.planList, function(key, val){
              that.tabList.push({"id":val.id, "name":val.styleName, "imgUrl":val.imgUrl, "hardPlanList":val.hardPlanList, "softPlanList":val.softPlanList})
              if (key == 0) {
                that.currentId = val.id
              }
          })
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  };
  </script>
  
  <style>
  html,
  body {
    font-size: 26.67vw;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  pre,
  code,
  form,
  fieldset,
  legend,
  input,
  button,
  textarea,
  p,
  blockquote,
  th,
  td {
    margin: 0;
    padding: 0;
  }
  
  .top {
    border-bottom: 0.01rem solid #c8c8c8;
  }
  
  .title {
    width: 100%;
    height: 0.48rem;
    background: #b8ab9c;
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    position: relative;
  }
  
  .title p {
    font-size: 0.16rem;
    color: #6f6385;
    float: left;
    margin-top: .1rem;
    margin-left: .2rem; 
  }
  
  /* .title span {
    display: inline-block;
    width: 0.8rem;
    height: 0.24rem;
    background: #6f6385;
    font-size: 0.14rem;
    color: white;
    text-align: center;
    line-height: 0.24rem;
    border-radius: 0.12rem;
  } */
  
  .open{
    display: inline-block;
    width: 0.8rem;
    height: 0.24rem;
    background: #6f6385;
    font-size: 0.14rem;
    color: white;
    text-align: center;
    line-height: 0.24rem;
    border-radius: 0.12rem;
    position: absolute;
    left: 2.7rem;
    top: .1rem;
  }
  .cen {
    width: 1.19rem;
    height: 0.45rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  .logo {
    width: 0.337rem;
    height: 0.337rem;
    border-radius: 50%;
    background-image: url(./assets/images/img.png);
    background-size: 100% 100%;
  }
  
  .trademark {
    width: 0.721rem;
    height: 0.24rem;
    font-size: 0.2rem;
    color: #6f6385;
    font-weight: 600;
  }
  
  .con {
    width: 3.43rem;
    height: 10rem;
    background: pink;
    margin: 0 auto;
  }
  
  .all {
    width: 100%;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .all a {
    text-decoration: none;
    color: #4a4a4a;
    font-size: 0.14rem;
    height: 0.17rem;
    border-bottom: 0.03rem solid transparent;
  }
  
  .fill {
    height: 4.05rem;
  }
  
  .lefttext,
  .righttext {
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
    font-size: 0.15rem;
  }
  
  .livingroom {
    width: 100%;
    background: white;
    margin-bottom: 0.2rem;
  }
  
  .texetbox p {
    font-size: 0.16rem;
    font-weight: 600;
    color: #4a4a4a;
    margin-bottom: 0.15rem;
  }
  
  .livingroom img {
    width: 100%;
    height: 100%;
  }
  
  .imgbox {
    width: 100%;
    height: 2.4rem;
    margin-bottom: 0.16rem;
  }
  
  .textbox {
    width: 3.36rem;
    /* height: 1.31rem; */
    margin: 0 auto;
    padding-bottom: 0.2rem;
  }
  
  .textbox span {
    font-size: 0.16rem;
    color: #4a4a4a;
    font-weight: 600;
  }
  .textbox p {
    margin-top: 0.09rem;
    color: #4a4a4a;
    line-height: 0.25rem;
    font-family: NotoSansCJKsc-Regular;
  }
  
  
  
  .topbar {
    width: 100%;
    height: 0.4rem;
    display: flex;
    justify-content: space-between;
    font-size: 0.16rem;
    background: white;
    margin-top: 0.2rem;
    margin-bottom: 0.2rem;
  }
  
  .leftbar,
  .rightbar {
    flex: 1;
    text-align: center;
    line-height: 0.4rem;
    color: #c8c8c8;
    border-bottom: 0.02rem solid #c8c8c8;
  }
  
  .leftbar {
    border-bottom: 0.02rem solid #6f6385;
    color: #6f6385;
  }
  
  li {
    list-style: none;
  }
  .navlist {
    width: 100%;
    height: 0.4rem;
    border-bottom: 1px solid rgba(151, 151, 151, 0.1);
    position: relative;
    margin-top:.2rem;
    margin-bottom: .2rem;
  }
  
  .navlist ul {
    height: 100%;
  }
  .navli {
    padding: 0.1rem 0rem;
    text-align: center;
    float: left;
    width: 50%;
  }
  .navli i {
    font-style: normal;
    font-size: 0.16rem;
    float: left;
    margin-left: 0.7rem;
    color: #C8C8C8;
  }
  .activeT i{
      color: #6f6385;
  }
  .activeT {
    color: #6f6385;
    border-bottom: 0.02rem solid #6f6385;
  }
  .swiper_con {
    width: 100%;
    position: relative;
  }
  .choosegrand {
    position: absolute;
    top: -3;
    right: 0;
  }
  .show {
    display: block;
  }
  .none {
    display: none;
  }
  
  .swiper-wrapper {
    height: 100% !important;
  }
  
  .swiper-slide{
    overflow-y: hidden !important;
  
  }
  .swiper-container {
    height: auto;
  }

  .none scenes{
      margin-bottom: -999rem; 
  }
  
    .residence{
        width: 3.43rem;
        margin: 0 auto;
    }

    .pic{
        justify-content: center;
        flex-wrap: wrap;
    }

    .bottompic img{
        width:100%;
        height: 100%;
        border: none;
        position: relative;
    }

    .btns{
        width: .76rem;
        height: .24rem;
        /* float: right; */
        border-radius: .25rem;
        background-image: url(./assets/images/3.jpg);
        background-size: 100% 100%;
        margin-top: .2rem;
        position: absolute;
        top: 2.1rem;
        left: 2.8rem;
    }
    .bottompic{
        width: 100%;
        height: 2.4rem;
        background-size: 100% 100%;
        margin-top: .16rem;
    }

    * {
        margin: 0;
        padding: 0;
    }
    body {
        height: 100%;
        width: 100%;
        background-color: #fbf9fe;
    }
    a {
         font-size: .16rem;
        color: #333;
        text-decoration: none;
    }
    .page {
        display: flex;
        justify-content: center;
    }
    .page-tab {
        display: flex;
        height: .4rem;
        line-height: .4rem;
        justify-content: space-around;
        margin-top: .1rem;
    }
    .tab-item {
        height: .2rem;
        margin-top: -.15rem;
        line-height: .001rem;
    }

    .tab-item a{
        color: #4A4A4A;
    }
    .tab-item_active a {
        color: #72594B;
        font-weight: 600;
        background-image: url(./assets/images/bg.jpg);
        background-repeat:no-repeat;
        background-size: .3rem .03rem;
        background-position: bottom;
        padding-bottom: .04rem;
    }
    .slideforward-enter-active {
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideforward-leave-active {
         
        position: absolute;
        transition: all 0s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideforward-leave-to {
         opacity: 0;
        position: absolute;
        transform:  translate3d(200px, 0px, 0px);
    }
    .slideforward-enter {
        position: absolute;
        transform:  translate3d(200px, 0px, 0px);
    }
    .slideback-leave-active {
        
        position: absolute;
        transition: all 0s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideback-enter-active {
        
        position: absolute;
        transition: all .5s;
        transform: translate3d(0px, 0px, 0px);
    }
    .slideback-enter {
        position: absolute;
        transform:  translate3d(-200px, 0px, 0px);
    }
    .slideback-leave-to {
         opacity: 0;
        position: absolute;
        transform:  translate3d(-200px, 0px, 0px);
    }

    .open{

    }
</style>
  