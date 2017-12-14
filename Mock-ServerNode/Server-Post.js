var express = require('express');
var body_parser = require('body-parser');
var xlsx = require('node-xlsx');

var app = express();
app.use(body_parser.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*'); //<-- you can change this with a specific url like http://localhost:4200
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json,Authorization,authorization');
    next();
});



app.post('/loginStage/getUserType', function (req, res, next) {
    body = req.body.body;
    console.log(body);
    username = body.username;
    password = body.password;
    res.json({
        "UserType": SerachUserPass(username, password)
    });
});


app.listen(5000, () => {
    console.log("El servidor está activo");
})

function SerachUserPass(user, pass) {
    var libro = xlsx.parse(__dirname + '/login.xlsx');
    for (var i = 0; i < libro[0].data.length; i++) {
        if (user == libro[0].data[i][0] && pass == libro[0].data[i][1])
            return libro[0].data[i][2];
    }
    return "error";
}


app.options('*', function (req, res, next) {
    res.sendStatus(200);
});



var headerLogin = "Basic YmFuaXN0bW9BVE06Y25ic2VjcmV0QVRN";
app.post('/loginStage/login', function (req, res, next) {
    header = req.header("Authorization");
    client_id = req.query.client_id;
    username = req.query.username;
    password = req.query.password;
    grant_type = req.query.grant_type;

    console.log("------header------");
    console.log(header);
    console.log("------queryString------");
    console.log("client_id ", client_id);
    console.log("username ", username);
    console.log("password ", password);
    console.log("grant_type ", grant_type);
    console.log("------Respuesta------");

    if (header == headerLogin) {
        if (client_id == "banistmoATM") {
            if (grant_type == "password") {
                if (SerachUserPass(username, password) != "error") {
                    console.log("Petición exitosa");
                    res.json({ "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MTMwMjQ2ODMsInVzZXJfbmFtZSI6ImRpZWdvIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImp0aSI6ImVlZWFhNjE1LTc1ZDQtNDJmNC04ZjVkLWFmYWQ1N2UzNjE1YiIsImNsaWVudF9pZCI6ImJhbmlzdG1vQVRNIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl19.CJ8Vtf-4ZoXXzBcIUA6sk-hELFEXLXBBGDnxMxoe9kGL5GmRPDqAMgscRlFCSu0Mtbsj9UY9tEfWdivJODLOOOHkWBclJJ4VhSPoCMGkdQal3sH1fZf3hndYEX7kDYFzduNNGMHrVtwS0JViUPT_Of6hJjmd8XNQqTq892yzY2gxC6p0YOZnYCA0_V0xie83eIvrZHn8KDeEbTd3Apb57kZNpbBAfrbcRZ1l5Xk-okRVcadO-1DnTSBq-cA2bjBJqlodu_Eo9zqE1Om78p7IhEKtemEBid4WPFfaU3kIA8jrQ87LdhYQx9dnK6Ei6CdrLE-cgzaEIYmjnxcnqPwHFQ", "token_type": "bearer", "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJkaWVnbyIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiJlZWVhYTYxNS03NWQ0LTQyZjQtOGY1ZC1hZmFkNTdlMzYxNWIiLCJleHAiOjE1MTMwMjQ3NDMsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiJjNTA1MWZjMy1hMzRhLTQ2MTYtOWE3MS03NmIwNDEwZTAwNzEiLCJjbGllbnRfaWQiOiJiYW5pc3Rtb0FUTSJ9.K_oQl9gZvxKJ8fiyDDWvyS7RWpqCk8c5VNA7uK3Tx833IogXY3ODueuJJpWNk6MsaCrPLFuKIeLU0bIjjApaFPxdbfVqFmWixA9UUWe18z3qYYmg47vKJ4XmM6u3xLF2I2LCrXC-bl59BNy-J0RCrBOspSgCW2vX02B3zomDG21yoNOpw1-LIZIR5MiQD1PMIBbAu3YiCOTCp1yd5d-dh3qMc1L4HJJ9YZ5PMAccNq98cAwunx6I7jltUeVnjK1X9DhTe9XP4W8rVuLBly0ZxdPbZMkS3ATSbaOXl9IOhSs9ATx-0PONQoyHXZXjBllxDF2nkpVUNW-3ZcMipDgYng", "expires_in": 59, "scope": "read write", "jti": "eeeaa615-75d4-42f4-8f5d-afad57e3615b" });
                }
                else {
                    console.log("Petición erronea");
                    res.json(
                        { "error": "invalid_authentication", "error_description": "Invalid username or password" });

                }

            }
            else {
                console.log("Petición erronea");
                res.json(
                    { "error": "invalid_request", "error_description": "Missing grant type" });


            }
        }
        else {
            console.log("Petición erronea");
            res.json(
                { "error": "invalid_client", "error_description": "Given client ID does not match authenticated client" }
            );


        }
    }
    else {
        console.log("Petición erronea");
        res.status(401).json({
            "timestamp": 1513179257110, "status": 401, "error": "Unauthorized", "message": "Bad credentials", "path": "/oauth/token"
        });


    }
});

var jsonDepo = JSON.stringify({ "wsLnkBusCnbCajero": "081402", "wsLnkBusCnbCuenta": "0000000105266606", "wsLnkBusCnbMonto": "000005000000", "wsLnkBusCnbSucursal": "00814" });
app.post('/Dev/deposit', function (req, res, next) {
    body = JSON.stringify(req.body.body);
    console.log("------body------");
    console.log(body);
    console.log("------Respuesta------");
    if (body == jsonDepo) {
        console.log("Petición exitosa");
        res.json({ "wsResultadoHogan": "0", "wsCodigoImpresion": "0", "wsLineasMensajes": "03", "wsConsecutivoTx": "0100606", "wsNotebook": "0", "wsRespMensaje": "CONSECUTIVO:  100606                                                          MITIL *ABEL                                                                   CUENTA ACTIVA" });
    }
    else {
        console.log("Petición erronea");
        res.json({
            "errorMessage": "java.lang.RuntimeException", "errorType": "java.lang.RuntimeException", "stackTrace": ["com.banistmo.orch.lambda.depositHandler.handleRequest(depositHandler.java:23)", "com.banistmo.orch.lambda.depositHandler.handleRequest(depositHandler.java:1)"]
        });

    }
});