var ipCountryApi = {
	servers : [],
	callback: null,
	allFailedCallback: null,
	currentIndex: 0,
	init: function(callback, allFailedCallback){
		ipCountryApi.callback = callback;
		ipCountryApi.allFailedCallback = allFailedCallback;
	},
	getCountry: function(){
		var server = ipCountryApi.servers[ipCountryApi.currentIndex];
		var request = $.get(server.url, "json");
		request.success(function(result){
			ipCountryApi.callback(server.returnCountry(result));
		});

		request.error(function(){
			if(ipCountryApi.currentIndex == ipCountryApi.servers.length-1){
				ipCountryApi.allFailedCallback();
				return;
			}
			ipCountryApi.currentIndex++;
			ipCountryApi.getCountry();
		});
	}
}