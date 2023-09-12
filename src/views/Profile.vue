<template>

  <div class="ui main container">
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="ui segment">
      <form class="ui large form" @submit.prevent="submit">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input v-model="user.userId" type="text" placeholder="ID" required disabled/>
          </div>
        </div>


        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input v-model="user.password" type="text" placeholder="Passwword" />
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="tag icon"></i>
            <input v-model="user.nickname" type="text" placeholder="Nickname"/>
          </div>
        </div>

        <div class="field">
          <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input v-model.number="user.age" type="number" min = "0" placeholder="Age"/>
          </div>
        </div>

        <button class="ui huge green fluid button" type="submit">
          更新
        </button>


      </form>
    </div>

    <button @click = "deleteUser" class="ui huge grey fluid button" type="submit">
      退会
    </button>
    <!--<div class="loading">-->
    <!--  <p>ロード中</p>-->
    <!--</div>-->
    <p id="text_msg" style="color: red;"></p>

  </div>

</template>

<script>
  // 必要なものはここでインポートする
  // @は/srcの同じ意味です
  // import something from '@/components/something.vue';

  import { baseUrl } from '@/assets/config.js';
  
  function message(text){
            document.getElementById("text_msg").innerHTML = text; 
            return false; 
          
        }
  
  // function loading(){
  //   const loading = document.querySelector('.loading');
  //   window.addEventListener('load', () => {
  //   setTimeout(function() {
  //     loading.classList.add('hide')
  //   }, 1000);
  //   });
  // }


  export default {
    name: 'Profile',

    components: {
      // 読み込んだコンポーネント名をここに記述する
    },

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        user: {
          userId: window.localStorage.getItem('userId'),
          password: null,
          nickname: null,
          age: null,
        },
      };
    },
    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
    },

    methods: {
      
    async submit() {
      // headerを指定する
      const headers = { Authorization: "mtiToken" };
      // リクエストボディを指定する
      const { userId, password, nickname, age } = this.user;
      const reqBody = {
        userId,
        password,
        nickname,
        age,
      };

      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
          method: "PUT",
          body: JSON.stringify(reqBody),
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // 成功時の処理
        // loading();
        message("更新成功");
        // alert("更新成功");
        this.user.nickname = jsonData.nickname;
        this.user.age = jsonData.age;
        console.log(jsonData);
      } catch (e) {
        message(e);
        console.error(e);
        // エラー時の処理
      }
      return
    },
    
    async deleteUser() {
      // headerを指定する
      const headers = { Authorization: "mtiToken" };
      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
          method: "DELETE",
          headers,
        });

        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};

        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage =
            jsonData.message ?? "エラーメッセージがありません";
          throw new Error(errorMessage);
        }

        // 成功時の処理
        
        this.$router.push({name: 'Login'});
        
        window.localStorage.setItem('token', jsonData.token);
        window.localStorage.setItem('userId', this.user.userId);
      } catch (e) {
        message(e);
        console.error(e);
        
        // エラー時の処理
      }
      return
    },
    
  },
  }
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
  
  .loading {
  color:gray;
  position: fixed;
  z-index: 1000;
  width: 100%;
  height: 100vh;
}

.loading.hide {
  opacity: 0;
  pointer-events: none;
  transition: opacity 500ms;
}
  
</style>
