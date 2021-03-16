const user = require('../mongodb/user.js').User;
require('./shop');

function addVip_1(player, days = 1) {
    const now = new Date();
    console.log(now);
    console.log(player.vipDate);
    
    if(player.vipDate > now){
        player.vipDate.setDate(player.vipDate.getDate() + days);
        console.log('more', player.vipDate);
    } 
    else 
    {
        player.vipDate.setDate(now.getDate() + days);
        player.vip = 1;
        console.log('less', player.vipDate);
    }

    user.findByIdAndUpdate(player._id,  {
         $set: {vip: 1, vipDate: player.vipDate}
    }, function(err, doc){
        if(err)console.error(err)
    });
    require('./shop').getDonateInfo(player);
}

exports.addVip_1 = addVip_1; 