//var DitherJS = require('ditherjs');
	
var paleta = 3;	
var dither = null;
	
$(function() {
	var imageLoader = document.getElementById('imageLoader');
    imageLoader.addEventListener('input', handleImage, false);
	$("#p3").addClass("seleccionada");	
	$("#originalpanel").hide();
	$("#finalpanel").hide();
	$(".paleta").click(function(e) {
		$(".paleta").removeClass("seleccionada");
		$( this ).addClass("seleccionada");
		paleta = parseInt($(this).attr('id')[1]);
		console.log(paleta);
	});
});
	
function handleImage(e){
	//<img class="dither" id="image" />
	$("#imagecontainer").empty();
	$("#imagecontainer").append('<img class="dither" id="image" />');	
    var reader = new FileReader();
    reader.onload = function(event){
		document.getElementById("imageLoader").value = "";
        var img = new Image();		
		var imageTag = document.getElementById('image');
		img.addEventListener('load', function() {
			pixelate();
			
			document.getElementById('original').src = img.src;
			
			var origw = img.width;
			var origh = img.height;
			
			const destw = 640;
			const desth = 400;
			
			var aspectoorig = origw / origh;
			var aspectodest = destw / desth;
			
			var finalw = destw;
			var finalh = desth;
			var offsetx = 0;
			var offsety = 0;
			
			if(aspectoorig > aspectodest) {
				finalw = desth * aspectoorig;
				offsetx = (destw - finalw)/2;
			} else if (aspectoorig < aspectodest) {
				finalh = destw / aspectoorig;
				offsety = (desth - finalh)/2;
			}
						
			
			
			var elem = document.createElement('canvas');
			elem.width = destw;
			elem.height = desth;
			var ctx = elem.getContext('2d');
		
			ctx.drawImage(img, offsetx, offsety, finalw, finalh);
			var data = ctx.canvas.toDataURL();				
			imageTag.src = data;			
			
			$("#originalpanel").show();
			$("#finalpanel").show();
		});
		img.src = event.target.result;

		
		


    }
    reader.readAsDataURL(e.target.files[0]);     
}

	

function pixelate() {
var paletas = [[
[0,0,0],
[85,255,85],
[255,85,85],
[255,255,85]
],
[
[0,0,0],
[85,255,255],
[255,85,85],
[255,255,255]
],
[
[0,0,0],
[255,0,255],
[0,255,255],
[255,255,255]
]];

console.log(paletas[paleta-1]);
var options = {
    "step": 2,
    "className": "dither",
    "palette": paletas[paleta-1],
    "algorithm": "ordered"
};

//var ditherjs = new DitherJS(options);
dither = new DitherJS('.dither',options);

}