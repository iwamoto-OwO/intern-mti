const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
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

    const { 
        userId, 
        condition,
        pref, 
        city, 
        allergen1, 
        allergen2,
        allergen3,
        sympton1,
        sympton2,
        sympton3,
        medicine,
        text,
    } = JSON.parse(event.body);//JS側の記述にしている
    
    const timestamp = Date.now();
    
    const aller = {
        allergen1:allergen1,
        allergen2:allergen2,
        allergen3:allergen3,
    }
    
    const allergen = JSON.stringify(aller);
    
    const sympt = {
        sympton1:sympton1,
        sympton2:sympton2,
        sympton3:sympton3,
    }
    
    const sympton = JSON.stringify(sympt);
    
    
    console.log(userId, 
        condition,
        pref, 
        city, 
        allergen1, 
        allergen2,
        allergen3,
        sympton1,
        sympton2,
        sympton3,
        medicine,
        text,
        timestamp
        )
        
    const param = {
        TableName,
        Item: marshall({
        userId, 
        pref, 
        city, 
        allergen,
        sympton,
        medicine,
        text,
        timestamp
        }),
    };
    

    const command = new PutItemCommand(param);

    try {
        // client.send()でDBにデータを登録するコマンドを実行
        await client.send(command);
        // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
        response.statusCode = 201;
        response.body = JSON.stringify({ userId, text, timestamp, allergen,sympton});
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
