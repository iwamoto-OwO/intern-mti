const { DynamoDBClient, PutItemCommand, QueryCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
const { unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-Articles";

exports.handler = async (event, context) => {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ message: "" }),
    };

    if (event.headers.authorization !== "mtiToken") {
        response.statusCode = 401;
        response.body = JSON.stringify({
            message: "認証されていません。",
        });
        return response;
    }

    const hasQueryParams = event.queryStringParameters?.pref || event.queryStringParameters?.city || event.queryStringParameters?.allergen;

    try {
        let articles = [];
        const scanParam = { TableName, Limit: 100 };
        const data = await client.send(new ScanCommand(scanParam));
        if (data && data.Items) {
            articles = data.Items.map(item => unmarshall(item));
            if(hasQueryParams){
                articles = articles.filter(article => {
                let isValid = true;
                
                if (event.queryStringParameters?.pref && article.pref  !== parseInt(event.queryStringParameters.pref)) isValid = false;
                if (event.queryStringParameters?.city && article.city !== parseInt(event.queryStringParameters.city)) isValid = false;
                
                if(isValid == true){
                    console.log("Article",article);
                }
                
                if(article.allergen && event.queryStringParameters?.allergen){
                    const result = checkValueMatch(JSON.parse(article.allergen), event.queryStringParameters.allergen);

                    if (!result) isValid = false;
                }
    
                return isValid;
                });
            };
            
        };
            articles.forEach((article) => { 
                if (article.allergen) {
                    article.allergen = JSON.parse(article.allergen);
                }
                if (article.sympton) {
                    article.sympton = JSON.parse(article.sympton);
                }
            });
        
        response.body = JSON.stringify({ articles });
    }
    catch (e) {
        console.error(e);
        response.statusCode = 500;
        response.body = JSON.stringify({
            message: "予期せぬエラーが発生しました。",
            errorDetail: e.toString(),
        });
    }
    return response;
};

const checkValueMatch = (obj, target) => {
    for (let key in obj) {

        if (obj[key] === target) {
            return true;
        }
    }
    return false;
};