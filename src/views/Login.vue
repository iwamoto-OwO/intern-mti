<template>

  <div class="ui main container">
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="ui segment">
      <div class="ui red message" v-if="sameError">
        同じアレルゲンが重複入力されています
      </div>
      <form class="ui large form" @submit.prevent="submit">
        
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="ユーザID" v-model="user.userId">
          </div>
        </div>


        <div class="field">
          <div class="ui left icon input">
            <i class="lock icon"></i>
            <input type="password" placeholder="パスワード" v-model="user.password">
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <select class="ui dropdown" v-model="user.pref">
            <option disabled value="">都道府県</option>
            <option value="1">北海道</option>
            <option value="2">青森</option>
          </select>
        </div>
        
        <div class="field" v-if="this.user.pref==1&&!isLogin">
          <select class="ui dropdown" placeholder="市区町村" v-model="user.city" v-bind:disabled="!this.user.pref">
            <option disabled value="">市区町村</option>
            <option value="1">札幌市</option>
            <option value="2">函館市</option>
          </select>
        </div>
        
        <div class="field" v-if="this.user.pref==2&&!isLogin">
          <select class="ui dropdown" placeholder="市区町村" v-model="user.city" v-bind:disabled="!this.user.pref">
            <option disabled value="">市区町村</option>
            <option value="1">青森市</option>
            <option value="2">弘前市</option>
          </select>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen1">
                <option disabled value="">アレルゲン</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level1" v-bind:disabled="!this.user.allergen1">
                <option disabled value="">症状レベル</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen2" v-bind:disabled="!this.user.allergen1">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level2" v-bind:disabled="!this.user.allergen2">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen3" v-bind:disabled="!this.user.allergen2">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level3" v-bind:disabled="!this.user.allergen3">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen4" v-bind:disabled="!this.user.allergen3">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level4" v-bind:disabled="!this.user.allergen4">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen5" v-bind:disabled="!this.user.allergen4">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level5" v-bind:disabled="!this.user.allergen5">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen6" v-bind:disabled="!this.user.allergen5">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level6" v-bind:disabled="!this.user.allergen6">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui two column grid">
            <div class="column">
              <select class="ui dropdown" placeholder="アレルゲン" v-model="user.allergen7" v-bind:disabled="!this.user.allergen6">
                <option value="">アレルゲン(任意)</option>
                <option value="1">スギ</option>
                <option value="2">ヒノキ</option>
                <option value="3">ブタクサ</option>
                <option value="4">イネ科</option>
                <option value="5">ヨモギ</option>
                <option value="6">カナムグラ</option>
                <option value="7">その他</option>
              </select>
            </div>
            <div class="column">
              <select class="ui dropdown" placeholder="症状レベル" v-model="user.level7" v-bind:disabled="!this.user.allergen7">
                <option value="">症状レベル(任意)</option>
                <option value="1">軽症</option>
                <option value="2">中等症</option>
                <option value="3">重症</option>
                <option value="4">不明</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="field" v-if="!isLogin">
          <div class="ui left icon input">
            <i class="medkit icon"></i>
            <input type="text" placeholder="薬(任意)" v-model="user.medicine">
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
        sameError: false,
        user: {
          userId: null,
          password: null,
          pref: "",
          city: "",
          allergen1: "",
          level1: "",
          allergen2: "",
          level2: "",
          allergen3: "",
          level3: "",
          allergen4: "",
          level4: "",
          allergen5: "",
          level5: "",
          allergen6: "",
          level6: "",
          allergen7: "",
          level7: "",
          medicine: null,
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
        if(this.user.Allergen1!=""&&(this.user.Allergen1==this.user.Allergen2||this.user.Allergen1==this.user.Allergen3||this.user.Allergen1==this.user.Allergen4||this.user.Allergen1==this.user.Allergen5||this.user.Allergen1==this.user.Allergen6||this.user.Allergen1==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if(this.user.Allergen2!=""&&(this.user.Allergen2==this.user.Allergen3||this.user.Allergen2==this.user.Allergen4||this.user.Allergen2==this.user.Allergen5||this.user.Allergen2==this.user.Allergen6||this.user.Allergen2==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if(this.user.Allergen3!=""&&(this.user.Allergen3==this.user.Allergen4||this.user.Allergen3==this.user.Allergen5||this.user.Allergen3==this.user.Allergen6||this.user.Allergen3==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if(this.user.Allergen4!=""&&(this.user.Allergen4==this.user.Allergen5||this.user.Allergen4==this.user.Allergen6||this.user.Allergen4==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if(this.user.Allergen5!=""&&(this.user.Allergen5==this.user.Allergen6||this.user.Allergen5==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if(this.user.Allergen6!=""&&(this.user.Allergen6==this.user.Allergen7)){
          this.sameError=true;
          window.scroll({top: 0, behavior: 'smooth'});
          return
        }
        if (this.isLogin) {
      
          
          // リクエストボディを指定する
          const requestBody = {
            userId: this.user.userId,
            password: this.user.password,
          };

          try {
            /* global fetch */
            const res = await fetch(baseUrl + "/user/signin", {
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
            pref: this.user.pref,
            city: this.user.city,
            allergen1: this.user.allergen1,
            level1: this.user.level1,
            allergen2: this.user.allergen2,
            level2: this.user.level2,
            allergen3: this.user.allergen3,
            level3: this.user.level3,
            allergen4: this.user.allergen4,
            level4: this.user.level4,
            allergen5: this.user.allergen5,
            level5: this.user.level5,
            allergen6: this.user.allergen6,
            level6: this.user.level6,
            allergen7: this.user.allergen7,
            level7: this.user.level7,
            medicine: this.user.medicine,
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
