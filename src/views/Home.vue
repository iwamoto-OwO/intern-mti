<<template>
  <div>
    <div class="ui main container">
      <!-- 基本的なコンテンツはここに記載する -->
        
        <div>
            <button class="circular ui icon button posting-button" @click="posting_screen_display()">
              <i class="icon edit huge"></i>
            </button>
      </div>
        
      <div class="ui segment modalWindow-background" v-if="postingScreen">
        
        
        <div class="modalWindow-content">
          <button class="circular ui icon button tiny right floated" @click="posting_screen_hide()">
            <i class="icon close icon"></i>
          </button>
          
          <span class="ui center floated">今日の花粉症状はどうですか？</span>
          <button class="circular ui icon button small" @click="posting_screen_hide()">
            <i class="icon question icon tiny"></i>
          </button>
          
          

            <div class="condition-button">
              <input type="radio" id="1" name="condition"><label for="1" class="blue">大丈夫</label>
              <input type="radio" id="2" name="condition"><label for="2" class="green">微かに感じる</label>
              <input type="radio" id="3" name="condition"><label for="3" class="yellow">ちょっと辛い</label>
              <input type="radio" id="4" name="condition"><label for="4" class="orange">辛い</label>
              <input type="radio" id="5" name="condition"><label for="5" class="red">著しく辛い</label>
          </div>
  
              
          <form class="ui form">
            
            <div class="ui right aligned">
              <span>{{view_more_button_text()}}</span>
              <button class="circular ui icon button tiny" @click="view_more_button()">
                <i class="icon plus" v-if="!viewMore"></i>
                <i class="icon minus" v-if="viewMore"></i>
              </button>
            </div>
            
            <div></div>
            
            <div class="more-field" v-if="viewMore">
              
              <div class="ui grid">
                <div class="three wide column">
                  <div class="ui label fs08" style="fontsize:0.8em">
                        地域
                  </div>
                </div>
                <div class="three wide column">
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                     <div class="default text">
                      県
                     </div> 
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
                </div>
                  
                <div class="three wide column">
               
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                     <div class="default text">
                      市区町村
                     </div> 
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
                </div>
              </div>
              
              
              <div class="ui grid">
                <div class="three wide column">
                  <div class="ui label fs08" style="fontsize:0.8em">
                        アレルゲン
                  </div>
                  
                </div>
                <div class="three wide column">
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
    
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
    
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
    
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
                  
                </div>
                <div class="three wide column">
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
                </div>
              </div>
              
              <div class="ui grid">
                <div class="three wide column">
                  <div class="ui label fs08" style="fontsize:0.8em">
                        症状
                  </div>
                </div>
                
                  <div class="ui selection dropdown"> 
                     <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
    
                     <div class="menu"> 
                      <div class="item" data-value="1">
                       北海道
                      </div> 
                      <div class="item" data-value="2">
                       青森
                      </div> 
                     </div> 
                  </div>
                  
                  <div class="ui grid">
                    <div class="three wide column">
                      <div class="ui selection dropdown"> 
                         <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                         <div class="menu"> 
                          <div class="item" data-value="1">
                           北海道
                          </div> 
                          <div class="item" data-value="2">
                           青森
                          </div> 
                         </div> 
                      </div>
                    </div>
                    <div class="three wide column">
                      <div class="ui selection dropdown"> 
                         <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                         <div class="menu"> 
                          <div class="item" data-value="1">
                           北海道
                          </div> 
                          <div class="item" data-value="2">
                           青森
                          </div> 
                         </div> 
                      </div>
                    </div>
                  </div>
              
                  <div class="ui grid">
                    <div class="three wide column">
                      <div class="ui label fs08" style="fontsize:0.8em">
                        薬
                      </div>
                      <div class="ui selection dropdown"> 
                         <input type="hidden" v-model="post.pref"> <i class="dropdown icon"></i> 
                         <div class="menu"> 
                          <div class="item" data-value="1">
                           北海道
                          </div> 
                          <div class="item" data-value="2">
                           青森
                          </div> 
                         </div> 
                      </div>
                    </div>
                    <div class="three wide column">
                      <input type="text" v-model="post.medicien"/>
                    </div>
                  </div>

                  <div class="ui label fs08" style="fontsize:0.8em">
                      メモ
                  </div>
                  <div class="field">
                    <div class="ui textarea">
                      <textarea rows="3" style="min-height:100px" class="massive" type="text" placeholder="あなたの投稿を発信しましょう" v-model="post.text"/>
                    </div>
                  </div>
              </div>

              
            </div>
            <div align="right">
              <button class="ui green button" type="button" @click="postArticle()">
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
        userId:"testUser",
        pref:null,
        city:null,
        allergen1:null,
        allergen2:null,
        allergen3:null,
        symptom1:null,
        symptom2:null,
        symptom3:null,
        medicine:null,
        text:"test",
      },

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
      this.postingScreen = true;
    },
    
    posting_screen_hide(){
      this.postingScreen = false;
    },
    
    view_more_button(){
      this.viewMore = !this.viewMore;
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
  z-index:2;

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

.modalWindow-content {
  z-index: 3;
  width: 50%;
  padding: 30px;
  background: #fff;
  border-radius: 2% 2% 2% 2% / 2% 2% 2% 2%;
}

.posting-button {
  z-index: 1;
  
  position:absolute;
  top:85vh;
  left:85vw;
  background: #fff;
}

.condition-button{
    display: flex;
}
.condition-button label{
    display: block;
    width: 80px;
    height:80px;
    padding: 10px;
    margin: 10px;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    border-radius: 40px;
    cursor: pointer;
}

.condition-button.red{
  background: #ffaaaa;
  color: #000;
}

.condition-button input:checked+label{
    background: #1a720d;
    color: #FFF;
}
.condition-button input{
    display: none;
}



</style>
