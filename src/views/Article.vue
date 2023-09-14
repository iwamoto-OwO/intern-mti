<template>
    <div>
        <div class="ui main container">

            <div class="ui yellow inverted segment">
                <!--<form class="ui form" @submit.prevent="getSearchedArticle">-->

                    <div>
                            
                            <div class="menu">
                                <div><p>都道府県</p></div>
                                <select>
                                    <option :value="userPref">{{ selectedPref }}</option>
                                    <option class="item" value="1">北海道</option>
                                    <option class="item" value="2">青森</option>
                                </select>
                                
                                <div><p>市区町村</p></div>
                                <select>
                                    <option :value="userCity">{{ selectedCity }}</option>
                                    <option class="item" value="1">札幌</option>
                                    <option class="item" value="2">青森</option>
                                </select>
                                
                                <div><p>アルルギー</p></div>
                                <select>
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

                                <div v-for="allergen in article.allergen" :key="allergen" v-if="allergen">{{ allergen }}</div>
                            </div>
                            <h3>地域</h3>
                            <div>
                                <div class="black ui button">{{article.pref}}</div>
                                <div class="black ui button">{{article.city}}</div>

                            </div>
                            <h3>症状</h3>
                            <div>
                                <div v-for="sympton in article.sympton" :key="sympton" v-if="sympton">{{ allergen }}</div>
                                <!--<div class="green ui button">{{article.sympton.sympton1}}</div>-->
                                <!--<div class="green ui button">{{article.sympton.sympton2}}</div>-->
                            </div>
                            <h3>薬</h3>
                            <div>
                                <div class="pink ui button">{{article.medicine}}</div>
                            </div>
                        </div>

                    </li>
                </template>
            </ul>

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
        name: 'Article',

        components: {
            // 読み込んだコンポーネント名をここに記述する
        },

        data() {
            // Vue.jsで使う変数はここに記述する
            return {
                post: {
                    userId: null,
                    pref: null,
                    city: null,
                    allergen: null,
                    condition: null,
                    num: null,
                    articles: null,
                },
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
                console.log("json",jsonData);
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

        },
        // 記事を検索する

        mounted: function() {
            
        }
    };
</script>

<style scoped>
    /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
