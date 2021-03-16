//http://www.free-kassa.ru/merchant/cash.php?m=178262&oa=1500&0=3&s=31ee76261d87fed8cb9d4c465c48158c
const kassa = {
    url: 'https://unitpay.ru/pay/',
    port: 8010,
    publicKey: '205341-9ac88',
    secretKey: '9dceef47609d68bb32fbf607fbbce31d',
    allowedIps: [
        '31.186.100.49', 
        '178.132.203.105', 
        '52.29.152.23', 
        '52.19.56.234',
        '::ffff:31.186.100.49', 
        '::ffff:178.132.203.105', 
        '::ffff:52.29.152.23', 
        '::ffff:52.19.56.234',
        '::ffff:127.0.0.1',
        '127.0.0.1',
        '::1'
    ]
}

const transConfig = {
    course: 1000,
    coin: 0,
    money: 0
}

const coinConfig = {
    course: 30,
    coin: 0,
    money: 0
}

const coinKits = [
    {
        name: "10 монет",
        bonus: "+2",
        type: "Монеты хард",
        desc: "Базовый набор",
        img: "coin.png",
        price: 299,
        coins: 10,
        money: "rub.png"
    },
    {
        name: "50 монет",
        bonus: "VIP 1 день",
        type: "Монеты хард",
        desc: "Малый набор",
        img: "coin2.png",
        price: 999,
        coins: 50,
        money: "rub.png"
    },
    {
        name: "100 монет",
        type: "Монеты хард",
        desc: "Средний набор",
        img: "coin3.png",
        price: 2999,
        coins: 100,
        money: "rub.png"
    },
    {
        name: "200 монет",
        bonus: "VIP 30 дней",
        type: "Монеты хард",
        desc: "Большой набор",
        img: "coin4.png",
        price: 4999,
        coins: 200,
        money: "rub.png"
    },
    {
        name: "500 монет",
        type: "Монеты хард",
        desc: "Огромный набор",
        img: "coin5.png",
        price: 6999,
        coins: 500,
        money: "rub.png"
    }
]

const banditKit = {
    weapon: "ak",
    ammo: 30
}

module.exports = {
    kassa,
    transConfig,
    coinConfig,
    banditKit,
    coinKits
}
