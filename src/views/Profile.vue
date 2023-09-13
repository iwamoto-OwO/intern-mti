<template>

  <div class="ui main container">
    <!-- 基本的なコンテンツはここに記載する -->
    <div class="ui segment">
      <p>ユーザ情報</p>
      <form class="ui large form" @submit.prevent="submit">
        <div class="field">
          <div class="ui left icon input">
            <i class="user icon"></i>
            <input type="text" placeholder="ユーザID" v-model="user.userId">
          </div>
        </div>
        
        <div class="field">
          <select class="ui dropdown" v-model="user.pref">
            <option disabled value="">都道府県</option>
            <option value="1">北海道</option>
            <option value="2">青森</option>
          </select>
        </div>
        
        <div class="field" v-if="this.user.pref==1">
          <select class="ui dropdown" placeholder="市区町村" v-model="user.city" v-bind:disabled="!this.user.pref">
            <option disabled value="">市区町村</option>
            <option value="1">札幌市</option>
            <option value="2">函館市</option>
          </select>
        </div>
        
        <div class="field" v-if="this.user.pref==2">
          <select class="ui dropdown" placeholder="市区町村" v-model="user.city" v-bind:disabled="!this.user.pref">
            <option disabled value="">市区町村</option>
            <option value="1">青森市</option>
            <option value="2">弘前市</option>
          </select>
        </div>
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
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
        
        <div class="field">
          <div class="ui left icon input">
            <i class="medkit icon"></i>
            <input type="text" placeholder="薬(任意)" v-model="user.medicine">
          </div>
        </div>


        <button class="ui huge green fluid button" type="submit">
          更新
        </button>


      </form>
    </div>

    
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
    },

    methods: {
      
      async submit() {
        // headerを指定する
        const headers = { Authorization: "mtiToken" };
        // リクエストボディを指定する
        const reqBody = {
          userId: this.user.userId,
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
  
        try {
          /* global fetch */
          const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
            method: "POST",
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
          console.log(jsonData);
        } catch (e) {
          message(e);
          console.error(e);
          // エラー時の処理
        }
        return
      },
    },
    
    created: async function() {
      const headers = { Authorization: "mtiToken" };
      // リクエストボディを指定する
      const userId = this.user.userId;
      const reqBody = {
        userId,
      };

      try {
        /* global fetch */
        const res = await fetch(baseUrl + `/user?userId=${this.user.userId}`, {
          method: "GET",
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
        // alert("更新成功");
        this.user.pref = jsonData.pref;
        this.user.city = jsonData.city;
        this.user.allergen1 = jsonData.allergen1;
        this.user.level1 = jsonData.level1;
        this.user.allergen2 = jsonData.allergen2;
        this.user.level2 = jsonData.level2;
        this.user.allergen3 = jsonData.allergen3;
        this.user.level3 = jsonData.level3;
        this.user.allergen4 = jsonData.allergen4;
        this.user.level4 = jsonData.level4;
        this.user.allergen5 = jsonData.allergen5;
        this.user.level5 = jsonData.level5;
        this.user.allergen6 = jsonData.allergen6;
        this.user.level6 = jsonData.level6;
        this.user.allergen7 = jsonData.allergen7;
        this.user.level7 = jsonData.level7;
        this.user.medicine = jsonData.medicine;
        console.log(jsonData);
      } catch (e) {
        message(e);
        console.error(e);
        // エラー時の処理
      }
      return
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
