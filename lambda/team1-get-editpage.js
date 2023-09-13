const { DynamoDBClient, PutItemCommand, QueryCommand, GetItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall, unmarshall } = require("@aws-sdk/util-dynamodb");
const client = new DynamoDBClient({ region: "ap-northeast-1" });
const TableName = "team1-Users";

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

    const userId = event.queryStringParameters.userId;

    const param = {
        TableName,
        KeyConditionExpression:"userId = :uid",
        ExpressionAttributeValues:marshall({
            ":uid":userId,
        }),
    };

    const command = new QueryCommand(param);

    try {
        // client.send()の実行でuserIdとpasswordが一致するデータの検索
        const res = await client.send(command);


        const foundCount = (await client.send(command)).Count;
        //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：resの中には個数のプロパティが入っています。)
        if (foundCount == 0) {
            throw new Error("userIdまたはpasswordが一致しません");
        }

        const convertedItems = converDynamoDBFormat(res.Items);
        response.body = JSON.stringify({items:convertedItems});

    }
    catch (e) {
        if (e.message == "userIdまたはpasswordが一致しません") {
            //TODO: 認証が成功した場合のレスポンスボディを設定する。
            response.statusCode = 401;
            response.body = JSON.stringify({ message: e.message });
        }
        else {
            response.statusCode = 500;
            response.body = JSON.stringify({
                message: "予期せぬエラーが発生しました。",
                errorDetail: e.toString(),
            });
        }

    }
    return response;
};

function converDynamoDBFormat(data){
    return data.map(item => {
        const result = {};
        for (const [key, value] of Object.entries(item)){
            if(value.S !== undefined){
                result[key] = value.S;
            }else if(value.N !== undefined){
                result[key] = Number(value.N);
            }else if(value.M){
                result[key] = converDynamoDBFormat([value.M])[0];
            }
        }
        return result;
    });
}
