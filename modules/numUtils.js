function formatNumber(num) {
	let number = new String(num).trim();
	switch (number.length) {
		case 1:
			return '0'+ number;

		default:
			return number;
	}
}

module.exports = {
	formatMinute: (function(){
		return function(n) {
			return formatNumber(n);
		}
	})()
};
