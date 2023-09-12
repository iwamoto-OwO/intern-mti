<template>

  <div class="ui main container">
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="ui segment">
      <form class="ui large form" @submit.prevent="submit">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="ID" v-model="user.userId">
          </div>
        </div>


        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" placeholder="passwword" v-model="user.password">
          </div>
        </div>

        <div class="field" v-if="!isLogin">
          <div class="ui left icon input">
            <i class="tag icon"></i>
            <input type="text" placeholder="Nickname" v-model="user.nickname">
          </div>
        </div>

        <div class="field" v-if="!isLogin">
          <div class="ui left icon input">
            <i class="calendar icon"></i>
            <input type="text" placeholder="Age" v-model="user.age">
          </div>
        </div>

        <button class="ui huge green fluid button" type="submit">
          {{submitText}}
          
          <div id="loader">
            <div class="spinner">
              <div class="cube1"></div>
              <div class="cube2"></div>
            </div>
          </div>
          
        </button>


      </form>
    </div>

    <button @click="toggleMode()" class="ui huge grey fluid button" type="submit">
      {{toggleText}}
    </button>
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

  export default {
    name: 'Login',

    components: {
      // 読み込んだコンポーネント名をここに記述する
    },

    data() {
      // Vue.jsで使う変数はここに記述する
      return {
        isLogin: true,
        user: {
          userId: null,
          password: null,
          nickname: null,
          age: null,
        },
      };
    },

    computed: {
      // 計算した結果を変数として利用したいときはここに記述する
      submitText() {
        return this.isLogin ? 'ログイン' : '新規登録';
      },
      toggleText() {
        return this.isLogin ? '新規登録' : 'ログイン';
      }
    },

    methods: {
      // Vue.jsで使う関数はここで記述する
      toggleMode() {
        this.isLogin = !this.isLogin
      },
      async submit() {
        if (this.isLogin) {

          
          // リクエストボディを指定する
          const requestBody = {
            userId: this.user.userId,
            password: this.user.password,
          };

          try {
            /* global fetch */
            const res = await fetch(baseUrl + "/user/login", {
              method: "POST",
              body: JSON.stringify(requestBody),
              // headers,
            });

            const text = await res.text();
            const jsonData = text ? JSON.parse(text) : {};

            // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
            if (!res.ok) {
              const errorMessage =
                jsonData.message ?? "エラーメッセージがありません";
              throw new Error(errorMessage);
            }
            
            window.localStorage.setItem('token', jsonData.token);
            window.localStorage.setItem('userId', this.user.userId);
            
            this.$router.push({ name: 'Home'});

            // 成功時の処理
            console.log(jsonData);
          }
          catch (e) {
            message(e);
            console.error(e);

            console.log('login');
          }
          return
        }

          // const headers = { Authorization: "mtiToken" };  

          const reqBody = {
            userId: this.user.userId,
            password: this.user.password,
            nickname: this.user.nickname,
            age: this.user.age,
          };
          // const requestBody = {
          //   value1: "value1",
          //   value2: "value2",
          // };

          try {
            /* global fetch */
            const res = await fetch(baseUrl + "/user/signup", {
              method: 'POST',
              body: JSON.stringify(reqBody)
              // headers,
            });

            const text = await res.text();
            const jsonData = text ? JSON.parse(text) : {};

            // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
            if (!res.ok) {
              const errorMessage = jsonData.message ?? "エラーメッセージがありません";
              throw new Error(errorMessage);
            }

            // 成功時の処理
            window.localStorage.setItem('token', jsonData.token);
            window.localStorage.setItem('userId', this.user.userId);
            console.log(jsonData);
          } catch (e) {
            message(e);
            console.error(e);
          }
        }
      },
    }
  
</script>

<style scoped>
  /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
