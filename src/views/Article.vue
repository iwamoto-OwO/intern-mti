<template>
    <div>
        <div class="ui main container">

            <div class="ui yellow inverted segment">
                <form class="ui form" @submit.prevent="getSearchedArticle">

                    <div class="field">
                        <label for="pref.city">地域</label>
                        <div class="ui search selection dropdown">
                            <input type="hidden" name="prefarence" value="北海道" class="item" data-value="1">
                            <i class="dropdown icon"></i>
                            <div class="default text">都道府県</div>
                            <div class="menu">
                                <div class="item" data-value="1">北海道</div>
                                <div class="item" data-value="2">青森県</div>

                            </div>
                        </div>
                        <div class="ui fluid search selection dropdown">
                            <input type="hidden" name="prefarence" value="札幌市" class="item" data-value="1">
                            <i class="dropdown icon"></i>
                            <div class="default text">市町村</div>
                            <div class="menu">
                                <div class="item" data-value="1">札幌市</div>
                                <div class="item" data-value="2">函館市</div>


                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label for="allergen">種類</label>
                        <div class="ui fluid search selection dropdown">
                            <input type="hidden" name="prefarence" value="スギ" class="item" data-value="1">
                            <i class="dropdown icon"></i>
                            <div class="default text">アレルゲン</div>
                            <div class="menu">
                                <div class="item" data-value="1">スギ</div>
                                <div class="item" data-value="2">ヒノキ</div>
                                <div class="item" data-value="3">ブタクサ</div>
                                <div class="item" data-value="4">イネ科</div>
                                <div class="item" data-value="5">ヨモギ</div>
                                <div class="item" data-value="6">カナムグラ</div>
                                <div class="item" data-value="7">その他</div>

                            </div>
                        </div>
                    </div>



                    <div class="right-align">
                        <button class="ui grey fluid button" type="submit" v-bind:disabled="SearchButtonDisable">
                            絞り込み
                        </button>
                    </div>

                </form>
            </div>

            <div>
                <h2 align="right">投稿件数</h2>
                <h2 align="right">{{post.num}}</h2>
                <h2 align="right">件</h2>
            </div>
            <hr>
            <div class="ui card fluid">
                <ul class="ui comments divided">
                    <template v-for="(article, index) in airticles">
                        <li class="">
                            <span>{{article.userId}}</span>
                            <span class="meta">{{article.timestamp}}</span>
                            <button class="ui red button right floated tiny" @click="deleteArticle(index)" type="submit" v-if="article.canDelete">
                                削除
                            </button>
                            <div class="ui segment">
                                <div>{{level.allergen}}</div>
                            </div>
                            <div class="ui segment">
                                <div>{{allergen.num}}</div>
                            </div>
                            <button @click="toggleMode()" class="ui icon button" type="submit">
                                 <i class="plus icon"></i>
                                
                            </button>
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
    // import { baseUrl } from '@/assets/config.js';

    // const headers = {'Authorization' : 'mtiToken'};
    import { baseUrl } from "@/assets/config.js";

    const headers = { Authorization: "mtiToken" };

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
                    articles: [],
                },
                iam: null,
                // canDeleteList: [],
                myUserId: window.localStorage.getItem("userId"),
            };
        },
        computed: {




        },

        created: async function() {
            // Vue.jsの読み込みが完了したときに実行する処理はここに記述する
            // apiからarticleを取得する
            // this.$router.push({ name: 'Profile'});
            // this.$router.push({ name: 'Login'});
            // this.$router.push({ name: 'Article' });

            const headers = { 'Authorization': 'mtiToken' };
            this.isCallingApi = true;

            try {
                /* global fetch */
                const res = await fetch(baseUrl + '/articles', {
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
                for (let i = 0; i < this.articles.length; i++) {
                    if (this.myUserId == this.articles[i].userId) {
                        this.articles[i].canDelete = true;
                    }
                    else {
                        this.articles[i].canDelete = false;
                    }
                    //console.log(this.articles[i].userId);
                    //console.log(this.articles[i].canDelete);
                }
                //console.log(this.articles);

                console.log(jsonData);
            }
            catch (e) {
                console.error(e);
                // エラー時の処理
            }



        },

        methods: {

            // async deleteArticle(index) {
            //     const headers = { 'Authorization': 'mtiToken' };

            //     //テスト用
            //     console.log(index);
            //     console.log(this.myUserId);
            //     console.log(this.articles[index].timestamp);

            //     try {
            //         /* global fetch */
            //         const res = await fetch(`${baseUrl}/articles?userId=${this.myUserId}&iam=${this.articles[index].timestamp}`, {
            //             method: "DELETE",
            //             headers
            //         });

            //         const text = await res.text();
            //         const jsonData = text ? JSON.parse(text) : {};

            //         // fetchではネットワークエラー以外のエラーはthrowされないため、明示的にthrowする
            //         if (!res.ok) {
            //             const errorMessage = jsonData.message ?? "エラーメッセージがありません";
            //             throw new Error(errorMessage);
            //         }
            //     }
            //     catch (e) {
            //         console.error(e);
            //         // エラー時の処理
            //     }

            // },

            async getSearchedArticles() {
                const { userId, pref, city, allergen } = this.search;
                // const starttimestamp = start ? new Date(start).getTime() : "";
                // const endtimestamp = end ? new Date(end).getTime() : "";
                // const qs = "prefarence=" + prefarence + "City=" + city + "&allergen=" + (allergen ? allergen : "") + "&start=" + starttimestamp + "&end=" + endtimestamp;

                try {

                    const res = await fetch(baseUrl + "/articles?" + qs, {
                        method: "GET",
                        headers,
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

        // async deleteArticle(article) {}, // 記事を削除する
        // convertToLocaleString(timestamp) {} // timestampをLocaleDateStringに変換する
        mounted: function() {
            /*global $*/
            $('.ui.dropdown')
                .dropdown();
        }
    };
</script>

<style scoped>
    /* このコンポーネントだけに適用するCSSはここに記述する */
</style>
