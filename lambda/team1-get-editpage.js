const { DynamoDBClient, PutItemCommand, QueryCommand ,GetItemCommand  } = require("@aws-sdk/client-dynamodb");
const { marshall ,unmarshall} = require("@aws-sdk/util-dynamodb");
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
    console.log(userId);

    const param = {
        TableName,
        Key:marshall({
            userId,
        })
    }

    const command = new GetItemCommand(param);

    try {
        // client.send()の実行でuserIdとpasswordが一致するデータの検索
        const res = (await client.send(command)).Item;
        
        delete res?.password;

        const foundCount = (await client.send(command)).Count;
        //TODO: 該当するデータが見つからない場合の処理を記述(ヒント：resの中には個数のプロパティが入っています。)
        if (foundCount == 0) {
            throw new Error("userIdまたはpasswordが一致しません");
        }
        console.log(JSON.parse(res));
        
        response.body = JSON.stringify(unmarshall(res));

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




        response.body = JSON.stringify({});
    }
}
