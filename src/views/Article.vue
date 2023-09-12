<template>
    <div>
        <div class="ui main container">
            <div class="ui segment">
                <form class="ui form" @submit.prevent="postArticle">…</form>
            </div>
            <div class="ui segment">
                <form class="ui form" @submit.prevent="getSearchedArticle">…</form>
            </div>
            
            <h2>投稿一覧</h2>
            <hr>
            <div class="ui card fluid">
                <ul class="ui comments divided">
                    <template v-for="(article, index) in articles">
                        <li class="">
                                <span>{{article.userId}}</span>
                                <span class="meta">{{article.timestamp}}</span>
                                <button class="ui red button right floated tiny" @click="deleteArticle(index)" type="submit" v-if="article.canDelete">
                                削除
                                </button>
                                <div>{{article.text}}</div>
                                <span class="ui green label">{{article.category}}</span>
                        </li>
                        <hr>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    // 必要なものはここでインポートする
    // @は/srcと同じ意味です
    // import something from '@/components/something.vue';
    import { baseUrl } from '@/assets/config.js';

    // const headers = {'Authorization' : 'mtiToken'};

    export default {
        name: 'Article',

        components: {
            // 読み込んだコンポーネント名をここに記述する
        },

        data() {
            // Vue.jsで使う変数はここに記述する
            return {
                post: {
                    text: null,
                    category: null,
                },
                search: {
                    userId: null,
                    category: null,
                    start: null,
                    end: null,
                },
                articles: [],
                iam: null,
                canDeleteList: [],
                myUserId: window.localStorage.getItem("userId"),
            };
        },

  computed: {
    // 計算した結果を変数として利用したいときはここに記述する
  },

  methods: {
    // Vue.jsで使う関数はここで記述する
    
    async deleteArticle(index){
      const headers = {'Authorization': 'mtiToken'};
      
      //テスト用
      console.log(index);
      console.log(this.myUserId);
      console.log(this.articles[index].timestamp);
  
      try {
        /* global fetch */
        const res = await fetch(`${baseUrl}/user?userId=${this.myUserId}&iam=${this.articles[index].timestamp}`, {
          method: "DELETE",
          headers
        });
  
        const text = await res.text();
        const jsonData = text ? JSON.parse(text) : {};
  
        // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
        if (!res.ok) {
          const errorMessage = jsonData.message ?? "エラーメッセージがありません";
            throw new Error(errorMessage);
        }
      } catch (e) {
        console.error(e);
        // エラー時の処理
      }
      
    }
    
  },
  
  created : async function(){
    // リクエストボディを指定する
        const headers = {'Authorization': 'mtiToken'};
        this.isCallingApi = true;
    
        try {
          /* global fetch */
          const res = await fetch(baseUrl + '/Article', {
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
          this.articles = jsonData.articles ?? [];
          for(let i=0; i < this.articles.length; i++){
              if(this.myUserId == this.articles[i].userId){
                  this.articles[i].canDelete = true;
              }else{
                  this.articles[i].canDelete = false;
              }
              //console.log(this.articles[i].userId);
              //console.log(this.articles[i].canDelete);
          }
          //console.log(this.articles);
          
          console.log(jsonData);
        } catch (e) {
          console.error(e);
          // エラー時の処理
        }
  },
  
 
  
}
</script>

<style scoped>
</style>
