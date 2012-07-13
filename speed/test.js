module.exports = function test(name, fn) {
	var itter = 1;
	// first generate reliable number of itterations for test
	(function genItter() {
		var i = itter,
			iniT = -Date.now();
		while(fn(), --i >= 0);
		iniT += Date.now();
		if (iniT > 100)
			setTimeout(function() {
				runTest(itter, name, fn);
			}, 100);
		else {
			if (iniT < 10)
				itter *= 10;
			else
				itter *= 2;
			setTimeout(genItter, 10);
		}
	}());
};


function runTest(itter, name, fn) {
	var i = itter,
		iniT = -Date.now();
	while (fn(), --i >= 0);
	iniT += Date.now();
	console.log(name, ':', (itter / iniT * 1000).toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,'), 'op/s');
};
