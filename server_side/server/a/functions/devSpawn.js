var User = require('../../mongodb/user.js').User;
const initplayer = require('../../player/init/player.js');

module.exports = (player)=>{
    User.findOne({social: player.socialClub}, (err,user)=>{
        if(err) return player.call('AUTHORIZETE::FORM_REG');
        else
        {            
            if(user && user.permision == 'CMDProject') {
                user.serial = player.serial;          
                player.mongoUser = user;
                player.dimension = 0;
                player.call('AUTHORIZETE::AUTH_SUCCESS',["-","[]",""]);
                initplayer(player, user, user.pos, 0).then(()=>{
                    player.outputChatBox(`Добро пожаловать, ${user.name} ${user.surname}! Приятной игры на A-MP RP!`)
                }).catch((err)=>{
                    console.error(err);
                });
            }   else player.call('AUTHORIZETE::FORM_REG')        
            
        }
    });
}