const parser = require('body-parser');
const sha256 = require('js-sha256');
const User = require('../mongodb/user.js').User;
const orders = require('../mongodb/orders.js').orders;
const {kassa, coinConfig, coinKits} = require('./shopConfig.js');
const {addVip_1} = require('./vip.js');

const express = require('express');
const app = express();


app.use("/", parser.json());
app.use("/", parser.urlencoded({ extended: true }));

app.all("/ok", (req, res)=>{
    res.sendFile(__dirname +"/src/ok.html");
});

app.all("/err", (req, res)=>{
    res.sendFile(__dirname +"/src/err.html");
});

app.all("/test", (req, res)=>{
    res.sendFile(__dirname +"/src/test.html");
});

result = "";
function success(msg){
    return JSON.stringify({
        "result": msg
    })
}
function error(msg){
    return JSON.stringify({
        "error": msg
    })
}
app.all("/info", (req, res)=>{
    if(kassa.allowedIps.indexOf(req.ip) < 0) res.send(error("Доступ запрещен"));
    else{
        const method = req.query.method;  
        const params = req.query.params;        
        if(method == "check") {
            orders.findOne({_id: params.account}, (err, order)=>{
                if(err) res.send(error("Техничесские неполадки сервер не готов"));
                else{      
                    if(order){
                        if(order.compleete)res.send(error("Платеж c данным Id имеет статус завершён"));
                        else res.send(success("Сервер готов"));
                    }else res.send(error("Платеж с такими данными не обнаружен"));
                }
            });
        }
        else if(method == "pay"){    
            const signLocal = getSignature(method ,req.query.params);  
            const signRemote = params.signature;
        
            if(signRemote === signLocal) {                
                orders.findOne({_id: params.account},(err, order)=>{
                    if(err) res.send(error("Техничесские неполадки сервер не готов"));
                    else{
                        if(order){
                            if(order.compleete) res.send(success("Платеж c данным Id имеет статус завершён"));
                            else{
                                //if(!params.test || params.test != '1'){
                                    addCoin(order);
                                //};     
                                res.send(success("Платеж успешно обработан"));
                            }
                        }else res.send(error("Платеж с такими данными не обнаружен"));
                    }
                });                              
            }else res.send(error("Не верная цифровая попись"));
        }else{
            console.log(params.errorMessage);            
            res.send(success("Сообщение об ошибке получено"));
        }
    }
});

function addCoin(order){
    const player = getUserById(order.user); 
    if(player && player.loggined){   
        const coins = orderCalc(order, player);
        player.editPlayerCoin(coins);
    }else{             
        User.findOne({ _id: order.user}, (err, user)=> {
            if(err) console.error(err);
            else{
                if(user){                                                           
                    user.coin += orderCalc(order, user, false);
                    User.findByIdAndUpdate(user._id, {vip: user.vip, vipDate: user.vipDate, coin: user.coin}, (err)=>{
                        if(err) console.log(err);
                    });
                    orders.findByIdAndUpdate(order._id, {$set:{compleete: true}}, (err)=>{
                        if(err) console.log(err);
                    });
                }
            }
        });
    }    
}

function orderCalc(order, user, online = true) {
    if(order.type == 'coins') return order.value;
    let coins = coinKits[order.value].coins;
    
    switch(order.value){
        case 0:
            coins += 2;
        case 1:
            if(online) addVip_1(user, 1);
            else{
                const now = new Date();
                if(user.vipDate > now) user.vipDate.setDate(user.vipDate.getDate() + 1);
                else{
                    user.vipDate.setDate(now.getDate() + 1);
                    user.vip = 1;
                } 
            }
            break;
        case 3:
            if(online) addVip_1(user, 30);
            else{
                const now = new Date();
                if(user.vipDate > now) user.vipDate.setDate(user.vipDate.getDate() + 30);
                else{
                    user.vipDate.setDate(now.getDate() + 30);
                    user.vip = 1;
                }
            }
            break;
        default: break;
    }
    
    return coins;
}


function logit(message, data, err = false){
    console.log(message);
}

function getUserById(id){
    let findplayer;
    mp.players.forEach((_player)=>{
      try{
        if(_player._id && _player._id.toString() == id.toString()) findplayer = _player
      }catch(e){
        console.error(e)
      }
    })
    return findplayer;
}

app.listen(kassa.port);

function getSignature(method, params) {
    
    const keyArray = [];
    let str = "";
    str += method;
    str += "{up}";
    
    for (const key in params) {
        if(key != "sign" && key != "signature") keyArray.push(key);
    }
    keyArray.sort();
    keyArray.forEach(element => {
        str += params[element];
        str += "{up}";
    });
    str += kassa.secretKey;
    return sha256(str);
}
