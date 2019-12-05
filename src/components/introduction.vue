<template>
  <div style="width:100%">
     <div class="navlist">
        <ul>
          <li
            class="navli"
            v-for="(item,index) in navList"
            :class="{'activeT':nowIndex===index}"
            @click="tabClick(index)" :key="index" 
          >
            <i>{{item.name}}</i>
          </li>
        </ul>
      </div>
      <div class="swiper-container1 swiper_con">
        <div class="swiper-wrapper">
          <!-- 第一个swiper -->
          <div class="swiper-slide" id="swiperOne" ref="viewBoxi">
            <div class="lefttext">
              <div class="livingroom" v-for="(val, i) in datas.hardPlanList" :key="i" v-if="val.width != undefined">
                <!-- <div > -->
                   <div class="imgbox">
                     <img
                      v-if="datas.hardPlanList[i].description"
                      :src="datas.hardPlanList[i].description" 
                    />
                  </div>
                  <div class="textbox">
                     <span v-if="val">{{datas.hardPlanList[i-1].description}}</span>
                     <p v-if="val">{{datas.hardPlanList[i-1].description}}</p>
                  </div>
              </div>
            </div>
          </div>
          <!-- 第二个swiper -->
          <div class="swiper-slide" id="swiperTwo">
            <div class="righttext">
              <div class="livingroom" v-for="(val, i) in datas.softPlanList" :key="i" v-if="val.width != undefined">
                   <div class="imgbox">
                     <img
                      v-if="datas.softPlanList[i].description"
                      :src="datas.softPlanList[i].description" 
                    />
                  </div>
                  <div class="textbox">
                     <span v-if="val">{{datas.softPlanList[i-1].description}}</span>
                     <p v-if="val">{{datas.softPlanList[i-1].description}}</p>
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
import "swiper/css/swiper.min.css";
  import "jquery/dist/jquery.min.js";
// import "swiper/js/swiper.min.js";
// import "swiper/js/idangerous.swiper.min.js";
export default {
    data() {
    return {
      tabList: [
        {
          name: "北欧",
          path: "/"
        },
        {
          name: "现代",
          path: "/page2"
        },
        {
          name: "简约",
          path: "/page3"
        },
        {
          name: "美式",
          path: "/page4"
        }
      ],
      datas: "",
      one:"",
      two:"",
      three:"",
      path: "",
      num: "0",
      navList: [{ name: "硬装方案" }, { name: "软装方案" }],
      nowIndex: 0
    };
  },
   mounted() {
    this.path = this.$route.path;
    var that = this;
    that.mySwiper = new Swiper(".swiper-container1", {
      initialSlide: 0,
      autoplay: false,
      keyboardControl: true,
      autoHeight: true,
      touchRatio:1,
      observer:true,//修改swiper自己或子元素时，自动初始化swiper
      observeParents:true,
      //引入的swiper为3之后的版本
      onSlideChangeStart: function() {
        that.nowIndex = that.mySwiper.activeIndex;
      },
      //引入的版本为4之后的版本
      on: {
        slideChangeTransitionStart: function() {
          that.nowIndex = that.mySwiper.activeIndex;
          // console.log(that.nowIndex)
          if(that.nowIndex ==0){
            document.getElementById("swiperTwo").style.height="0"
          }else  if(that.nowIndex ==1){
            document.getElementById("swiperTwo").style.height="100%"
          }
        }
      }
    });
    
    // this.getList();
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
      console.log(roomId);
      this.axios({
        method: "get",
        url:"https://www.memohome.net/app1_2/api/plan/plan_list?roomId=" + roomId,
        data:{}
      })
        .then(function(res) {
          // console.log(res.data.data.planList[0])
          // console.log(res.data.data.planList)
          // console.log(res.data.data.planList[0].styleName)
          that.datas = res.data.data.planList[0];
          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  methods: {
    funa() {
      location.href =
        "https://a.app.qq.com/o/simple.jsp?pkgname=com.memohome.mjj&fromcase=40002";
    },
    move(e){
      console.log(e)
    },
    // swiperleft: function() {
    //   console.info(111);
    //   this.$router.back(-1);
    // },
    // swiperright: function() {
    //   console.info(111);
    //   this.$router.push({ path: "/introduction" });
    // },
    tabClick(index) {
      this.nowIndex = index;
      this.mySwiper.slideTo(index, 1000, false);

      if(this.nowIndex ==0){
            document.getElementById("swiperTwo").style.height="0"
          }else  if(this.nowIndex ==1){
            document.getElementById("swiperTwo").style.height="100%"
          }

    //   console.log(index)
    }
  },
}
</script>

<style scoped>

#swiperTwo{
  height: 0;
}

html,
  body {
    font-size: 26.67vw;
    width: 100%;
    /* position: fixed; */
    height: 100%;
    /* overflow: hidden; */
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
    /* padding-bottom: .16rem; */
    border-bottom: 0.01rem solid #c8c8c8;
  }
  
  .title {
    width: 100%;
    height: 0.48rem;
    background: #b8ab9c;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  
  .title p {
    font-size: 0.16rem;
    color: #6f6385;
  }
  
  .title span {
    display: inline-block;
    width: 0.8rem;
    height: 0.24rem;
    background: #6f6385;
    font-size: 0.14rem;
    color: white;
    text-align: center;
    line-height: 0.24rem;
    border-radius: 0.12rem;
  }
  
  .cen {
    width: 1.19rem;
    height: 0.45rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* background: green; */
  }
  
  .logo {
    width: 0.337rem;
    height: 0.337rem;
    border-radius: 50%;
    background-image: url(../assets/images/img.png);
    background-size: 100% 100%;
  }
  
  .trademark {
    width: 0.721rem;
    height: 0.24rem;
    font-size: 0.2rem;
    color: #6f6385;
    font-weight: 600;
    /* background: yellow; */
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
  /* .all .router-link-active{
          border-bottom: .03rem solid #72594B;
      } */
  
  .lefttext,
  .righttext {
    width: 100%;
    /* height: 10rem; */
    /* background: pink; */
    margin: 0 auto;
    overflow: hidden;
    /* text-indent: .32rem; */
    font-size: 0.15rem;
  }
  
  .livingroom {
    width: 100%;
    /* height: 2rem; */
    background: white;
    margin-bottom: 0.2rem;
  }
  
  .texetbox p {
    font-size: 0.16rem;
    font-weight: 600;
    /* margin-left: .18rem; */
    color: #4a4a4a;
    /* padding-top: .16rem; */
    margin-bottom: 0.15rem;
  }
  
  /* .livingtext{
          height: 1.58rem;
          font-size: .14rem;
          letter-spacing: .01rem;
          
          margin-top: .16rem;
          margin: 0 auto;
          text-align: left;
          font-family: NotoSansCJKsc-Regular;
      }  */
  
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
    /* height: 1.57rem; */
    /* background: pink; */
    margin: 0 auto;
    padding-bottom: 0.2rem;
    overflow-x: hidden;
  }
  
  .textbox span {
    font-size: 0.16rem;
    color: #4a4a4a;
    font-weight: 600;
  }
  .textbox p {
    margin-top: 0.09rem;
    color: #4a4a4a;
    line-height: 0.16rem;
    font-family: NotoSansCJKsc-Regular;
  }
  
  .entire {
    width: 100%;
    /* height: 6rem; */
    /* background: pink; */
    margin-top: 0.1rem;
    float: left;
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
    background: white;
  }
  
  .navlist ul {
    /* display: flex; */
    /* flex: 1; */
    /* justify-content: space-around; */
    height: 100%;
  }
  .navli {
    padding: 0.1rem 0rem;
    text-align: center;
    float: left;
    /* margin:0 1.2rem; */
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
    /* padding-bottom: .3rem; */
    border-bottom: 0.02rem solid #6f6385;
  }
  .swiper_con {
    width: 100%;
    /* margin-bottom:.4rem; */
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

  
  /* *{touch-action: none;} */
</style>



