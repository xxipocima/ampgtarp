const sha256 = require('js-sha256');
const orders = require('../mongodb/orders.js').orders;
const {kassa, coinKits, coinConfig, transConfig} = require('./shopConfig')

//console.log(orders.createOrder('dGnqPjyJLUEQHwxPACMA','coins',100,500));
mp.events.add({
    'COIN_SHOP::ORDER_COIN_KIT': orderCoinKit,
    'COIN_SHOP::TO_MONEY': coinToMoney,
    'COIN_SHOP::ORDER_COIN': orderCoin,
    'DONATE::GET_INFO': getDonateInfo

})


function getDonateInfo(player){    
    player.call('DONATE::UPDATE', [
        JSON.stringify(
            {
                money:player.money, 
                coin: player.coin, 
                vipDate: player.vipDate,
                kitDate: player.vipKitDate,
                vip: player.vip
            }
        )
    ]);
}

function orderCoin(player, count){
    const sum = coinConfig.course * count;
    const userId = player._id;
    const order = orders.createOrder(userId, 'coins', count, sum );
    const link = `${kassa.url}${kassa.publicKey}?sum=${sum}&account=${order._id}&currency=RUB&desc=${count} Монет хард`;
    player.call("COIN_SHOP::TO_PAY", [link]);
}

function orderCoinKit(player, id){
    if(coinKits[id]){
        const kit = coinKits[id]
        const sum = kit.price;
        const userId = player._id;
        const order = orders.createOrder(userId, 'kit', id, sum );
        const link = `${kassa.url}${kassa.publicKey}?sum=${sum}&account=${order._id}&currency=RUB&desc=${coinKits[id].name}`;
        player.call("COIN_SHOP::TO_PAY", [link]);
    }
}

function coinToMoney(player, count){
    if(player.editPlayerCoin(-count)){
        const sum = count * transConfig.course;
        player.editmoneyCash(sum, `Покупка ${sum}$ за ${count} Coins` )
    }
}

function getFormSignature(account, currency, desc, sum) {
    hashStr = account + '{up}' + currency + '{up}' + desc + '{up}' + sum + '{up}' + kassa.secretKey;
    return sha256(hashStr);
}

function keyGenerator(a, oi){
    const keyString = `${kassa.id}:${a}:${kassa.secret_1}:${oi}`;
    return crypto.createHash('md5').update(keyString).digest("hex");
}

exports.getDonateInfo = getDonateInfo;