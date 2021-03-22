let show = false;

let browserDonate = mp.browsers.new('package://HTML/donate/index.html');
let kassa = null;
let test = null;

mp.keys.bind(0x73, false, function() { //F4
	if(chatActive || !loggined || (mp.gui.cursor.visible && !show)) return;	
	if(kassa) {
		kassa.destroy();
		kassa = null;
	}
	show = !show;
	guitoggle(show);
	browserDonate.execute(`donate.show = ${show};`);
	mp.events.callRemote('DONATE::GET_INFO');
});


// Обновляет данные окна доната
mp.events.add('REFERRALS::REFRESH_DATA', data => {
	browserDonate.execute(`donate.referralData = ${data};`);
})

// Обрабатывает различные ошибки
mp.events.add('REFERRALS::ON_ERROR', message => {
	browserDonate.execute(`donate.onRefsError(${JSON.stringify(message)});`);
})

mp.events.add("COIN_SHOP::TO_PAY", link => {
	if(show && kassa) return;
	kassa = mp.browsers.new(link);
	show = true;
	guitoggle(show);
})

mp.events.add('DONATE::UPDATE', donate => {
	browserDonate.execute(`donate.updateDonateData(${JSON.stringify(donate)});`);
})
