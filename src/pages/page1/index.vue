<template>
    <div class="page page1">
        <Public :iframepic="onevr" :bottompicture="oneroom"></Public>
    </div>
</template>

<script>

import Public from '../../components/public'
// import Introduction from './components/introduction'

export default {
    name:"public",
    components:{  
    Public,
    // Introduction
  },
    data() {
        return {
            num:0,
            oneroom:"",
            onevr:""
        }
    },
    methods:{
          
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
          console.log(res.data.data.planList[0].imgUrl);
          that.oneroom = res.data.data.planList[0].imgUrl
          // that.onevr = res.data.data.planList[0].softLink
        })
        .catch(function(error) {
          console.log(error);
        });
    //       var frm = document.getElementById('iframe');  
    //   $(frm).on("load",function(){                            
    //       console.log(111)
    // });
    
      //  console.log(document.getElementById("ifra"))
    },
    mounted() {
      
    },
    
}
</script>

<style scoped>
    .page1 {
        position: static;
        /* position: fixed; */
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background: #f7f7f7;
        /* font-size: .14rem; */
        overflow-x:hidden;
    }

</style>

