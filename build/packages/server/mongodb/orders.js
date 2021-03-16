let mongoose = require('./mongo'),
	Schema = mongoose.Schema


let SchemaTypes = mongoose.Schema.Types;
let orders = new Schema({
	user: String,
	type: String,
	value: Number,
	sum: Number,
	compleete: Boolean,
	date: Date
});

orders.statics = {
	createOrder(user, type, value, sum ){
		const d = new this({
			user,
			type,
			value,
			sum,
			compleete: false,
			date: new Date()
		});
		d.save()
		return d;
	}
}

exports.orders = mongoose.model('orders', orders);