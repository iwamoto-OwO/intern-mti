<template>
    <div>
        <div class="ui main container">

            <div class="ui yellow inverted segment">
                <!--<form class="ui form" @submit.prevent="getSearchedArticle">-->

                    <div>
                            
                            <div class="menu">
                                <div><p>都道府県</p></div>
                                <select class="wide-select">
                                    <option :value="userPref">{{ selectedPref }}</option>
                                    <option class="item" value="1">北海道</option>
                                    <option class="item" value="2">青森</option>
                                </select>
                                
                                <div><p>市区町村</p></div>
                                <select class="wide-select">
                                    <option :value="userCity">{{ selectedCity }}</option>
                                    <option class="item" value="1">札幌</option>
                                    <option class="item" value="2">青森</option>
                                </select>
                                
                                <div><p>アルルギー</p></div>
                                <select class="wide-select">
                                    <option :value="allergen">{{ selectedAllergen }}</option>
                                    <option value="1">スギ</option>
                                    <option value="2">ヒノキ</option>
                                    <option value="3">ブタクサ</option>
                                    <option value="4">イネ科</option>
                                    <option value="5">ヨモギ</option>
                                    <option value="6">カナムグラ</option>
                                    <option value="7">その他</option>
                                </select>
        
                            </div>
                      </div>
                        
                </div>
                    
                <div class="right-align">
                    <button class="ui grey fluid button" type="submit" v-bind:disabled="SearchButtonDisable">
                        絞り込み
                    </button>
                </div>

                <!--</form>-->
            <!--</div>-->
            

            <div>
                <h2 align="right">投稿件数{{articles.length}}件</h2>


            </div>
            <hr>

            <ul class="ui comments divided">

                <template v-for="(article, index) in articles">
                    <p>{{article.userId}}</p>
                    <span class="meta">{{article.timestamp}}</span>
                    <li>
                        <div class="white ui segment">
                            <span></span>

                            <div class="allergens">
                                <div class="condition"><p>{{article.condition}}</p></div>


                                <div class="blue ui huge button allergen">{{article.allergen.allergen1}}</div>
                                <div class="black ui huge button allergen">{{article.allergen.allergen2}}</div>
                                <div class="black ui huge button allergen">{{article.allergen.allergen3}}</div>
                            </div>
                            <h3>地域</h3>
                            <div>
                                <div class="black ui button">{{article.pref}}</div>
                                <div class="black ui button">{{article.city}}</div>

                            </div>
                            <h3>症状</h3>
                            <div>
                                <div class="green ui button">{{article.sympton.sympton1}}</div>
                                <div class="green ui button">{{article.sympton.sympton2}}</div>
                            </div>
                            <h3>薬</h3>
                            <div>
                                <div class="pink ui button">{{article.medicine}}</div>
                            </div>
                        </div>

                    </li>
                </template>
            </ul>
            
            <div>
                  <button class="circular ui icon button posting-button" @click="posting_screen_display()">
                    <i class="icon edit huge"></i>
                  </button>
            </div>
            
            
            
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
                
                <div class="condition-buttons">
                  <div class="condition-button">
                    <span class="margin">
                      <input type="radio" id="1" name="condition" value="1" v-model="post.condition"><label for="1" class="condition-text blue2">大丈夫</label>
                    </span>
                    <span class="margin"> 
                      <input type="radio" id="2" name="condition" value="2" v-model="post.condition"><label for="2" class="condition-text green2">微かに感じる</label>
                    </span>
                    <span class="margin"> 
                      <input type="radio" id="3" name="condition" value="3" v-model="post.condition"><label for="3" class="condition-text yellow2">ちょっと辛い</label>
                    </span>
                    <span class="margin"> 
                      <input type="radio" id="4" name="condition" value="4" v-model="post.condition"><label for="4" class="condition-text orange2">辛い</label>
                    </span>
                    <span class="margin"> 
                      <input type="radio" id="5" name="condition" value="5" v-model="post.condition"><label for="5" class="condition-text red2">著しく辛い</label>
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
                          <select class="ui dropdown dropdownBox" v-model="post.pref">
                              <option value="">都道府県</option>
                              <option value="1">北海道</option>
                              <option value="2">青森</option>
                          </select>
                         
                          <select class="ui dropdown dropdownBox" v-model="post.city">
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
                        <select class="ui  dropdownBox" v-model="post.allergen1">
                            <option value="">アレルゲン1</option>
                            <option value="1">スギ</option>
                            <option value="2">ヒノキ</option>
                            <option value="3">ブタクサ</option>
                            <option value="4">イネ科</option>
                        </select>
                          
          
                        <select class="ui dropdown dropdownBox" v-model="post.allergen2">
                              <option value="">アレルゲン2</option>
                              <option value="1">スギ</option>
                              <option value="2">ヒノキ</option>
                              <option value="3">ブタクサ</option>
                              <option value="4">イネ科</option>
                          </select>
      
                        <select class="ui dropdown dropdownBox" v-model="post.allergen3">
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
                        
                        <select class="ui dropdown dropdownBox" v-model="post.sympton1">
                            　<option value="">症状1</option>
                              <option value="鼻水">鼻水</option>
                              <option value="くしゃみ">くしゃみ</option>
                              <option value="目のかゆみ">目のかゆみ</option>
                        </select>
                          
                        <select class="ui dropdown dropdownBox" v-model="post.sympton2">
                            　<option value="">症状2</option>
                              <option value="鼻水">鼻水</option>
                              <option value="くしゃみ">くしゃみ</option>
                              <option value="目のかゆみ">目のかゆみ</option>
                        </select>
                        
                         <select class="ui dropdown dropdownBox" v-model="post.sympton3">
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
                        
                        <select class="ui dropdown dropdownBox" v-model="post.medicien">
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

    // const headers = {'Authorization' : 'mtiToken'};
    import { baseUrl } from "@/assets/config.js";

    const headers = { Authorization: "mtiToken" };
    import '@/assets/style.css';
    
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
                  sympton1:null,
                  sympton2:null,
                  sympton3:null,
                  medicine:null,
                  text:null,
                },
                articles: [],
                postingScreen: false, 
                viewMore: false, 
                
                
                iam: null,
                articles: [],
                userPref: null,
                selectedPref: null,
                userCiy: null,
                selectedCity: null,
                allergen: null,
                selectedAllergen: null,
                allergenQuery: null,
                // canDeleteList: [],
                myUserId: window.localStorage.getItem("userId"),
            };
        },
        computed: {
        },
        mounted: function() {
          /*global $*/
            //$('.ui.dropdown')
              //.dropdown();
        },

        created: async function() {
            const headers = { 'Authorization': 'mtiToken' };
            this.isCallingApi = true;
            const allergens = ["スギ", "ヒノキ", "ブタクサ", "イネ科", "ヨモギ", "カナムグラ", "その他"];
            
            
            try {
                /* global fetch */
                const res = await fetch(baseUrl + `/user?userId=${this.myUserId}`, {
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
                
                this.userPref = jsonData.items[0].pref;
                this.userCity = jsonData.items[0].city;
                if(this.userPref == "1"){
                    this.selectedPref = "北海道"; 
                    this.selectedCity = "札幌";
                }else{
                    this.selectedPref = "青森"; 
                    this.selectedCity = "青森";
                }
                
                this.allergen = JSON.parse(jsonData.items[0].allergen);
                this.selectedAllergen = allergens[this.allergen.allergenWad1.allergen1];
                this.allergenQuery = allergens[this.allergen.allergenWad1.allergen1]
                
                console.log("After setting:", this.allergenQuery);
                console.log(jsonData)
            }
            catch (e) {
                console.error(e);
                // エラー時の処理
            };
            
            
            
            try {
                const usl = baseUrl + `/articles?pref=${this.userPref}&city=${this.userCity}&allergen=${this.allergenQuery}`;
                console.log(usl);
                /* global fetch */
                const res = await fetch(baseUrl + `/articles?/pref=${this.userPref}&city=${this.userCity}&allergen=${this.allergenQuery}`, {
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
                console.log(jsonData);
                this.articles = jsonData.articles;
            }
            catch (e) {
                console.error(e);
                // エラー時の処理
            };
            
            



        },

        methods: {
            

            async getSearchedArticles() {
                const { userId, pref, city, allergen } = this.search;
                // const starttimestamp = start ? new Date(start).getTime() : "";
                // const endtimestamp = end ? new Date(end).getTime() : "";
                // const qs = "prefarence=" + prefarence + "City=" + city + "&allergen=" + (allergen ? allergen : "") + "&start=" + starttimestamp + "&end=" + endtimestamp;

                try {

                    const res = await fetch(baseUrl + "/article", {
                        method: "GET",
                        headers
                        
                    });

                    const text = await res.text();
                    const jsonData = text ? JSON.parse(text) : {};


                    if (!res.ok) {
                        const errorMessage = jsonData.message ?? "エラーメッセージがありません";
                        throw new Error(errorMessage);
                    }

                    this.articles = jsonData.articles;
                }
                catch (e) {
                    console.error(e);
                }
                return
            },
            
            
            
            
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
                element.classList.remove("view");
                element.classList.add("hide");
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
                //this.viewMore = !this.viewMore;
                //this.viewMore = this.viewMore;
                //console.log(this.viewMore);
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
                    //const headers = {'Authorization' : window.localStorage.getItem('token')};
                    const headers = { 'Authorization': 'mtiToken' };
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
                        sympton1:this.post.sympton1,
                        sympton2:this.post.sympton2,
                        sympton3:this.post.sympton3,
                        medicine:this.post.medicine,
                        text:this.post.text,
                    };
                    console.log(headers);
                    try {
                        /* global fetch */
                        const res = await fetch(baseUrl + '/article', {
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
                        this.post.sympton1=null;
                        this.post.sympton2=null;
                        this.post.sympton3=null;
                        this.post.medicine=null;
                        this.post.text="test";
                        this.posting_screen_hide();
                        console.log(jsonData);
                    } catch (e) {
                        console.error(e);
                        // エラー時の処理
                    }
                }, 
                
            },
    };
</script>

<style scoped>
    /* このコンポーネントだけに適用するCSSはここに記述する */
    
    /*モーダルウィンドウ関連のCSS*/
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

.blue2{
    background: #0000cd;
    color: #fff;
    opacity:0.6;
}
.green2{
    background: #008000;
    color: #fff;
    opacity:0.6;
}
.yellow2{
    background: #dfcf00;
    color: #fff;
    opacity:0.6;
}
.orange2{
    background: #ff8c00;
    color: #fff;
    opacity:0.6;
}
.red2{
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
