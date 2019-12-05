<template>
    <div>
        <div class="residence">
            <div class="pic">
                <div class="bottompic">
                    <img :src="bottompicture">
                </div>
                <div class="btns" @click="funa()"></div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },
    
    props:["bottompicture"],
    methods: {
        funa(){
            if(navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
                var loadDateTime = new Date();
                window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if(timeOutDateTime - loadDateTime < 5000) {
                        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.memohome.mjj&fromcase=40002";
                    } else {
                        // window.close();
                    }
                },25);
                window.location = " apps custom url schemes ";
            } else if(navigator.userAgent.match(/android/i)) {
                var loadDateTime = new Date();
                var state = window.open("apps custom url schemes ", '_blank');
                window.setTimeout(function() {
                    var timeOutDateTime = new Date();
                    if(timeOutDateTime - loadDateTime < 5000) {
                        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.memohome.mjj&fromcase=40002";
                    } else {
                        // window.close();
                    }
                },25);
            }
        }
        
    },
    mounted () {
        
    },
    created() {
      
    },
}
    
</script>

<style scoped>
    .residence{
        width: 3.43rem;

    }

    .pic{
        justify-content: center;
        flex-wrap: wrap;
    }

    .bottompic img{
        width:100%;
        height: 100%;
        border: none;
    }

    .btns{
        width: .76rem;
        height: .24rem;
        float: right;
        border-radius: .25rem;
        background-image: url(../assets/images/3.jpg);
        background-size: 100% 100%;
        margin-top: .2rem;
    }
    .bottompic{
        width: 100%;
        height: 1.92rem;
        background-size: 100% 100%;
        margin-top: .16rem;
    }

    
</style>