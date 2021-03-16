var fs = require("fs")
var path = require('path');

function encoder(code, hash) {
	
	code = code.replace(/[\u0080-\uFFFF]/g, function (s) {
        return "\\u" + ('000' + s.charCodeAt(0).toString(16)).substr(-4);
    });
	
	var b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	var encoded = '';
	var j = 0;
	
	var chr1, chr2, chr3,
		com1, com2, com3,
		enc1, enc2, enc3, enc4;
		
	for (var i=0; i<code.length;) {
		chr1 = code.charCodeAt(i++);
		chr2 = code.charCodeAt(i++);
		chr3 = code.charCodeAt(i++);

		com1 = (chr1^b64chars.indexOf(hash.charAt(j)));
		com1 += j;
		if(j===hash.length-1)j=2; else j++;
		com2 = (chr2^b64chars.indexOf(hash.charAt(j)));
		com2 += j;
		if(j===hash.length-1)j=15; else j++;
		com3 = (chr3^b64chars.indexOf(hash.charAt(j)));
		com3 += j;
		if(j===hash.length-1)j=30; else j++;

		enc1 = com1 >> 2;
		enc2 = ((com1 & 3) << 4) | (com2 >> 4);
		enc3 = isNaN(com2) ? 64:(((com2 & 15) << 2) | (com3 >> 6));
		enc4 = isNaN(com3) ? 64:(com3 & 63);
		
		encoded += b64chars.charAt(enc1) + b64chars.charAt(enc2) + b64chars.charAt(enc3) + b64chars.charAt(enc4);
	}
	return encoded+"==";
}

function generateHash() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 32; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


fs.readdirSync(path.resolve(__dirname, 'src')).forEach(src =>
{
	fs.readFile('src/' + src, function(error, data){
		if(error) throw error;
		
		
		let hash = generateHash();
		let name = src.split('.')[0];
		
		let text = 	`/*
//           Проект: A-MP RP          
//           Сайт: https://a-mprp.ru/           
//           Мы ВКонтакте: https://vk.com/a-mp        
//           © Копирование клиента запрещено и преследуется пиздюлями!
*/

exports = {
	"name" : "${name}",
	"hash" : "${hash}",
	"code" : "${encoder(data.toString(), hash)}"
}`
		
		fs.writeFile('build/' + src, text, function(error){
			console.log('Create ' + src)
		});
	});
});