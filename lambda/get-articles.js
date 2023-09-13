const { DynamoDBClient, PutItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
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

    const param = {
        TableName,
    };

    const command = new ScanCommand(param);

    try {
        // client.send()でDBにデータを登録するコマンドを実行
        const articles = (await client.send(command)).Items;
        // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
        response.statusCode = 201;
        const unmarshalledArticlesItems = articles.map((item) => unmarshall(item));
        response.body = JSON.stringify({ articles: unmarshalledArticlesItems });
        console.log(response.body);

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
}