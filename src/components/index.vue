<template>
    <div class="main">
        <div class="page-tab">
            <div :class="nowPath == item.path ? 'tab-item tab-item_active' : 'tab-item'" v-for='(item, index) in tabList' :key="index">
                <router-link mode="out-in" :to="item.path">{{item.name}}
                </router-link>
            </div>    
                
        </div>
        
        <transition :name="slideDirection">
            <slot>
            </slot>
        </transition>
        
    </div>
</template>

<script>

export default {
    props: {
        tabList: Array
    },
    mounted() {
        
        this.nowPath = this.$route.path;
        this.initTouchedEvent();
    },
    data() {
        return {
            tabSwiper: {},
            slideDirection: 'slideforward',
            nowPath: '',
            startX: '',
            startY:''
        };
    },
    methods: {
        touchedstartHandler(e) {
            this.startX = e.changedTouches[0].pageX;
            this.startY = e.changedTouches[0].pageY;
        },
        touchendHandler(e) {
            let direction = this.startX - e.changedTouches[0].pageX;
            let directionY = this.startY - e.changedTouches[0].pageY;
            
            let nowRouteIndex = 0;
            this.tabList.forEach((v, index) => {
                if (v.path == this.nowPath) {
                    nowRouteIndex = index;
                }
            });
            
            var disXY = Math.abs(direction)>Math.abs(directionY);
            
            if (disXY&&direction >= 0 && nowRouteIndex < this.tabList.length - 1) {
                //设置向前动画
                this.slideDirection = 'slideforward';
                this.$router.push({'path': this.tabList[nowRouteIndex + 1].path});
            } 
            if (disXY&&direction < 0 && nowRouteIndex > 0) {
                //设置向后动画
                this.slideDirection = 'slideback';
                this.$router.push({'path': this.tabList[nowRouteIndex - 1].path});
            }
        },
        initTouchedEvent() {
            this.$el.addEventListener('touchstart', this.touchedstartHandler.bind(this));
            this.$el.addEventListener('touchend', this.touchendHandler.bind(this));
        },
      
      
    },
    watch: {
        '$route' (to, from) {
            console.log(to.path);
            this.nowPath = to.path;
        }
    }
};
</script>

<style>
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
        /* align-items: center; */
    }
    .page-tab {
        display: flex;
        height: .4rem;
        line-height: .4rem;
        justify-content: space-around;
        /* align-items: center;  */
    }
    .tab-item {
        /* text-align: center;
        align-items: center; */
        height: .2rem;
        margin-top: -.15rem;
        /* flex: 1; */
        /* box-sizing: border-box; */
        line-height: .001rem;
        /* background-color: #fff; */
    }
    /* .tab-item_active {
        border-bottom: 3px solid #72594B;
    } */

    .tab-item a{
        color: #4A4A4A;
    }
    .tab-item_active a {
        /* border-bottom: .03rem solid #72594B; */
        /* border-radius: .025rem; */
        color: #72594B;
        font-weight: 600;
        background-image: url(../assets/images/bg.jpg);
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
</style>
