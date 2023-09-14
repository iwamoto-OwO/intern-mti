<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
        
        <div>
            <button class="circular ui icon button posting-button" @click="posting_screen_display()">
              <i class="icon edit huge"></i>
            </button>
      </div>
      
        
      <!--<div class="ui segment modalWindow-background" v-if="postingScreen">-->
        <div class="ui segment modalWindow-background view">
        
            <div class="modalWindow-content">
              <button class="circular ui icon button tiny right floated" @click="posting_screen_hide()">
                <i class="icon close icon"></i>
              </button>
              
              <div class="condition-question">
                <span class="ui center floated day-question">今日の花粉症状はどうですか？</span>
                
                <!--
                <button class="circular ui icon button small help-button">
                          <i class="icon question icon small"></i>
                </button>
                
                <div class="tooltip">
                    <div class="tooltip-content">
                        大丈夫：花粉を感じない、症状が一切ない<br>
                        微かに感じる：感じるが日常生活に支障はない。薬を飲むほどではない<br>
                        ちょっと辛い：日常生活に多少支障がある。薬を飲めば何とかなる。<br>
                      　辛い：日常生活に支障がある。薬を飲んでも症状が出る。<br>
                        著しく辛い：日常生活に大いに支障がある。外に出ること自体危うくなる。
                    </div>
                  </div>
                  -->
                  
              </div>
          
          <!--conditionの値確認用
          <h2 class="ui gray header">{{post.condition}}</h2>-->
          
          <div class="condition-buttons">
            <div class="condition-button">
              <span class="margin">
                <input type="radio" id="1" name="condition" value="1" v-model="post.condition"><label for="1" class="condition-text blue">大丈夫</label>
              </span>
              <span class="margin"> 
                <input type="radio" id="2" name="condition" value="2" v-model="post.condition"><label for="2" class="condition-text green">微かに感じる</label>
              </span>
              <span class="margin"> 
                <input type="radio" id="3" name="condition" value="3" v-model="post.condition"><label for="3" class="condition-text yellow">ちょっと辛い</label>
              </span>
              <span class="margin"> 
                <input type="radio" id="4" name="condition" value="4" v-model="post.condition"><label for="4" class="condition-text orange">辛い</label>
              </span>
              <span class="margin"> 
                <input type="radio" id="5" name="condition" value="5" v-model="post.condition"><label for="5" class="condition-text red">著しく辛い</label>
              </span>
          </div>
        </div>
              
          <form class="ui form">
            
            <div class="ui right aligned">
              <span>{{view_more_button_text()}}</span>
              <button class="circular ui icon button tiny" @click="view_more_button()">
                <i class="icon plus" v-if="!viewMore"></i>
                <i class="icon minus" v-if="viewMore"></i>
              </button>
            </div>
            
            <div class="more-field hide">

                <div class="forms">
                  <div>
                    <div class="ui label fs08">
                        地域
                    </div>
                  </div>
                    <select class="ui dropdown" v-model="post.pref">
                        <option value="">都道府県</option>
                        <option value="1">北海道</option>
                        <option value="2">青森</option>
                    </select>
                   
                    <select class="ui dropdown" v-model="post.city">
                        <option value="">市区町村</option>
                        <option value="1">札幌市</option>
                        <option value="2">函館市</option>
                    </select>
                </div>
              
                <div class="forms">
                  <div>
                    <div class="ui label fs08">
                        アレルゲン
                    </div>
                  </div>
                  <select class="ui dropdown" v-model="post.allergen1">
                      <option value="">アレルゲン1</option>
                      <option value="1">スギ</option>
                      <option value="2">ヒノキ</option>
                      <option value="3">ブタクサ</option>
                      <option value="4">イネ科</option>
                  </select>
                    
    
                  <select class="ui dropdown" v-model="post.allergen2">
                        <option value="">アレルゲン2</option>
                        <option value="1">スギ</option>
                        <option value="2">ヒノキ</option>
                        <option value="3">ブタクサ</option>
                        <option value="4">イネ科</option>
                    </select>

                  <select class="ui dropdown" v-model="post.allergen3">
                        <option value="">アレルゲン3</option>
                        <option value="1">スギ</option>
                        <option value="2">ヒノキ</option>
                        <option value="3">ブタクサ</option>
                        <option value="4">イネ科</option>
                  </select>
                </div>
                
                
                <div class="forms">
                  <div>
                    <div class="ui label fs08">
                          症状
                    </div>
                  </div>
                  
                  <select class="ui dropdown" v-model="post.symptom1">
                      　<option value="">症状1</option>
                        <option value="鼻水">鼻水</option>
                        <option value="くしゃみ">くしゃみ</option>
                        <option value="目のかゆみ">目のかゆみ</option>
                  </select>
                    
                  <select class="ui dropdown" v-model="post.symptom2">
                      　<option value="">症状2</option>
                        <option value="鼻水">鼻水</option>
                        <option value="くしゃみ">くしゃみ</option>
                        <option value="目のかゆみ">目のかゆみ</option>
                  </select>
                  
                   <select class="ui dropdown" v-model="post.symptom3">
                        <option value="">症状3</option>
                        <option value="鼻水">鼻水</option>
                        <option value="くしゃみ">くしゃみ</option>
                        <option value="目のかゆみ">目のかゆみ</option>
                  </select>
                </div>
                
                
                <div class="forms">
                  <div>
                    <div class="ui label fs08">
                        薬
                    </div>
                  </div>
                  
                  <select class="ui dropdown" v-model="post.medicien">
                      <option value="">服用薬</option>
                      <option value="アレグラ">アレグラ</option>
                      <option value="アレジオン">アレジオン</option>
                      <option value="ビラノア">ビラノア</option>
                      <option value="ビラノア">その他</option>
                  </select>
                    
                  <input type="text" v-model="post.medicien"/>
                </div>
                  
                  
                <div class="forms">
                  <div>
                    <div class="ui label fs08">
                        メモ
                    </div>
                  </div>
                  <div class="field">
                    <div class="ui textarea">
                      <textarea rows="3" style="min-height:100px" class="massive" type="text" placeholder="あなたの投稿を発信しましょう" v-model="post.text"/>
                    </div>
                  </div>
                </div>

              
            </div>
            <div align="right">
              <button class="ui green2 button" type="button" @click="postArticle()">
                投稿
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 必要なものはここでインポートする
// @は/srcと同じ意味です
// import something from '@/components/something.vue';
// import { baseUrl } from '@/assets/config.js';
import { baseUrl } from '@/assets/config.js';
//import { Dropdown } from 'semantic-ui-react';

// const headers = {'Authorization' : 'mtiToken'};

export default {
  
  name: 'Home',

  components: {
   // 読み込んだコンポーネント名をここに記述する
  },

  data() {
    // Vue.jsで使う変数はここに記述する
    return {
      post: {
        condition:1,
        userId:window.localStorage.getItem("userId"),
        pref:null,
        city:null,
        allergen1:null,
        allergen2:null,
        allergen3:null,
        symptom1:null,
        symptom2:null,
        symptom3:null,
        medicine:null,
        text:null,
      },

      test:"test",
      articles: [],
      iam: null,
      
      //modalWindowを表示するかどうか
      postingScreen: false, 
      viewMore: false, 
      };
      
  },
  computed: {
  // 計算した結果を変数として利用したいときはここに記述する
  },
  
  mounted: function() {
    /*global $*/
      $('.ui.dropdown')
        .dropdown();
  },

  created: async function() {
    // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
    // apiからarticleを取得する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    // isMyArticle(id) {}, // 自分の記事かどうかを判定する
    // async getArticles() {}, // 記事一覧を取得する
    // async postArticle() {}, // 記事を作成する
    
    
    posting_screen_display(){
        let elements = document.getElementsByClassName("modalWindow-background");
        Array.prototype.forEach.call(elements, function (element) {
            element.classList.add("view");
            element.classList.remove("hide");
        });
    },
    
    posting_screen_hide(){
        let elements = document.getElementsByClassName("modalWindow-background");
        Array.prototype.forEach.call(elements, function (element) {
            element.classList.add("hide");
            element.classList.remove("view");
            
            let checkValue = '';


            //this.post.pref = document.getElementById('prefSelect');
              //console.log(this.post.userId);
              //console.log(this.post.pref);
        });
    },
    
    view_more_button(){
       let elements = document.getElementsByClassName("more-field");
        Array.prototype.forEach.call(elements, function (element) {
            element.classList.toggle("view");
            element.classList.toggle("hide");
            this.viewMore = !this.viewMore;
        });
    },
    
    view_more_button_text(){
      return this.viewMore ? 'しまう':'もっと書く';
    },
    
    condition1(){
      this.post.conditon = 1;
    },
     condition2(){
      this.post.conditon = 2;
    },
     condition3(){
      this.post.conditon = 3;
    },
     condition4(){
      this.post.conditon = 4;
    },
     condition5(){
      this.post.conditon = 5;
    },
    
     async postArticle() {// 記事を作成する
                const headers = {'Authorization' : window.localStorage.getItem('token')};
                // リクエストボディを指定する
                const userId = window.localStorage.getItem('userId');
                const reqBody = {
                    condition:this.post.condition,
                    userId,
                    text:this.post.text,
                    category:this.post.category,
                    pref:this.post.pref,
                    city:this.post.city,
                    allergen1:this.post.allergen1,
                    allergen2:this.post.allergen2,
                    allergen3:this.post.allergen3,
                    symptom1:this.post.symptom1,
                    symptom2:this.post.symptom2,
                    symptom3:this.post.symptom3,
                    medicine:this.post.medicine,
                    text:this.post.text,
                };
                
                try {
                    /* global fetch */
                    const res = await fetch(baseUrl + '/team1-Articles', {
                        method: "POST",
                        body: JSON.stringify(reqBody),
                        headers,
                    });
            
                    const text = await res.text();
                    const jsonData = text ? JSON.parse(text) : {};
            
                    // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
                    if (!res.ok) {
                        const errorMessage = jsonData.message ?? "エラーメッセージがありません";
                        throw new Error(errorMessage);
                    }
            
                    // 成功時の処理
                    this.post.pref=null;
                    this.post.city=null;
                    this.post.allergen1=null;
                    this.post.allergen2=null;
                    this.post.allergen3=null;
                    this.post.symptom1=null;
                    this.post.symptom2=null;
                    this.post.symptom3=null;
                    this.post.medicine=null;
                    this.post.text="test";
                    this.posting_screen_hide();
                    console.log(jsonData);
                } catch (e) {
                    console.error(e);
                    // エラー時の処理
                }
            }, 
    
    // async getSearchedArticles() {}, // 記事を検索する
    // async deleteArticle(article) {}, // 記事を削除する
    // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
  },
  created : async function(){
    // リクエストボディを指定する
        const headers = {'Authorization': 'mtiToken'};
        this.isCallingApi = true;
    
        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/team1-Users', {
            method: "GET",
            headers
          });
    
          const text = await res.text();
          const jsonData = text ? JSON.parse(text) : {};
    
          // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
          if (!res.ok) {
            const errorMessage = jsonData.message ?? "エラーメッセージがありません";
            throw new Error(errorMessage);
          }
    
          // 成功時の処理
          this.users = jsonData.users ?? [];
          console.log(jsonData);
        } catch (e) {
          console.error(e);
          // エラー時の処理
        }
  },
  
}
</script>

<style scoped>

.modalWindow-background{
  /*　画面を暗く　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;

}

.hide{
    z-index:-1;
    opacity:0;
    width: 0px;
    height: 0px;
}

.view{
    z-index:2;
    opacity:1;
    width: 100%;
    height: 100%;
}

.modalWindow-content {
  z-index: 3;
  width: 70%;
  padding: 30px;
  background: #fff;
  border-radius: 2% 2% 2% 2% / 2% 2% 2% 2%;
}

.condition-question{
  text-align: center;
  padding-left:20px;
}
.day-question{
  font-size:2vw;
  /*padding-right:10vw;*/
}

.help-button{
  text-align: center;
}

.tooltip{
    position: relative;

    text-align: left;
    background-color: #eeeeee;
    padding: 5px;
}

.posting-button {
  z-index: 1;
  
  position:absolute;
  top:85vh;
  left:85vw;
  background: #fff;
}

.condition-buttons{
  text-align: center;
  padding:20px;
}

.condition-button label{
    width: 100px;
    height:100px;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
    text-decoration: none;
    border-radius: 50px;
    cursor: pointer;
}
.condition-text {
  font-size:15px;
}

.blue{
    background: #0000cd;
    color: #fff;
    opacity:0.6;
}
.green{
    background: #008000;
    color: #fff;
    opacity:0.6;
}
.green2{
    background: #008000;
    color: #fff;
    opacity:1;
}
.yellow{
    background: #dfcf00;
    color: #fff;
    opacity:0.6;
}
.orange{
    background: #ff8c00;
    color: #fff;
    opacity:0.6;
}
.red{
    background: #dc143c;
    color: #fff;
    opacity:0.6;
}
.condition-button input:checked+label{
    color: #fff;
    opacity:1;
}
.condition-button input{
    display: none;
}
.forms{
  padding:10px;
}
.margin{
  margin:15px;
}


</style>
