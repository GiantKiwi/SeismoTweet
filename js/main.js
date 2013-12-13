//Holi
$(document).on('ready', function() {
	earthquake.globe= new DAT.Globe(document.getElementById('container'));
	earthquake.obtainedData();
	
	$('.pinmw').click(function() {
		if ($(this).attr('id') == -1 || $(this).attr('id') == 4){
			alert('Because the amount of data that will be processed, it may cause this window to not respond. Please wait patiently...');
		}
		$('canvas').remove();
		earthquake.globe = new DAT.Globe(document.getElementById('container'));
		earthquake.seleccionadata($(this).attr('id'));
		earthquake.insertaDatos();
		
	});	
	
});

var earthquake=new Array();
earthquake['data'] = new Array();
earthquake['selected'] = new Array();
earthquake['loaded'] = false;
earthquake['magnitude'] = 6;


earthquake['obtainedData'] = function obtainedData() {
	$.getJSON('sismos2011.json', function(ret) {
		earthquake.data = ret;
		earthquake.loaded = true;
		/* valores iniciales, temporal, se reciben sugerencias */
		earthquake.seleccionadata(earthquake['magnitude']);
		earthquake.insertadata();
				
	});
}
earthquake['selecteddata'] = function selectedData(max) {
	var magnitude = 0;
	earthquake['magnitude']=max;
	earthquake.selected=[];
	for( i = 0; i < earthquake.data.length; i += 3) {
		magnitude = Math.floor(earthquake.data[i + 2]);
		if(earthquake['magnitude'] == -1) {
			earthquake.selected=earthquake.data;
		} else {			
			if(magnitude == earthquake['magnitude']) {				
				earthquake.selected.push(earthquake.data[i]);
				earthquake.selected.push(earthquake.data[i + 1]);
				earthquake.selected.push(earthquake.data[i + 2]);
			}
		}
	}
}

earthquake['insertaData'] = function insertaData() {
	earthquake.globe.addData(earthquake.selected, {
		format : 'magnitude'
	});
	earthquake.globe.createPoints();
	earthquake.globe.animate();

}

