const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { marshall } = require("@aws-sdk/util-dynamodb");
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

    // TODO: リクエストボディの中身をJavaScriptオブジェクトに変換し、1つ、あるいは複数の変数に代入する
    const {
        userId,
        password,
        pref,
        city,
        allergen1,
        allergen2,
        allergen3,
        allergen4,
        allergen5,
        allergen6,
        allergen7,
        level1,
        level2,
        level3,
        level4,
        level5,
        level6,
        level7,
        medicine,
    } = JSON.parse(event.body);
    // TODO: DBに登録するための情報をparamオブジェクトとして宣言する（中身を記述）
    
    console.log(
        userId,
        pref,
        city,
        allergen1,
        allergen2,
        allergen3,
        allergen4,
        allergen5,
        allergen6,
        allergen7,
        level1,
        level2,
        level3,
        level4,
        level5,
        level6,
        level7,
        medicine,
    );

    var allergenWad1, allergenWad2, allergenWad3, allergenWad4, allergenWad5, allergenWad6, allergenWad7;

    if (allergen1 != "") {
        allergenWad1 = {
            allergen1: allergen1,
            level1: level1
        }
    }

    if (allergen2 != "") {
        allergenWad2 = {
            allergen2: allergen2,
            level2: level2
        }
    }

    if (allergen3 != "") {
        allergenWad3 = {
            allergen3: allergen3,
            level3: level3
        }
    }

    if (allergen4 != "") {
        allergenWad4 = {
            allergen4: allergen4,
            level4: level4
        }
    }

    if (allergen5 != "") {
        allergenWad5 = {
            allergen5: allergen5,
            level5: level5
        }
    }

    if (allergen6 != "") {
        allergenWad6 = {
            allergen6: allergen6,
            level6: level6
        }
    }

    if (allergen7 != "") {
        allergenWad7 = {
            allergen7: allergen7,
            level7: level7
        }
    }



    const allergenWad = {
        allergenWad1: allergenWad1,
        allergenWad2: allergenWad2,
        allergenWad3: allergenWad3,
        allergenWad4: allergenWad4,
        allergenWad5: allergenWad5,
        allergenWad6: allergenWad6,
        allergenWad7: allergenWad7,
    }

    console.log(allergenWad);
    
    const allergen = JSON.stringify(allergenWad);
    
    const param = {
        TableName,
        Item: marshall({
            userId,
            pref,
            city,
            allergen,
            medicine,
        }),
    };


    // DBにデータを登録するコマンドを用意
    const command = new PutItemCommand(param);

    try {
        // client.send()でDBにデータを登録するコマンドを実行
        await client.send(command);
        // TODO: 登録に成功した場合の処理を記載する。(status codeの設定と、response bodyの設定)
        response.statusCode = 201;
        response.body = JSON.stringify({ userId, pref, city,allergenWad, medicine });

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
