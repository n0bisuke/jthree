function drawFloor( ctx ) {

	var base = "#fff",
		color = "#2ff";

	//ctx = canvas2D context
	ctx.fillStyle = base;
	ctx.fillRect(0, 0, 32, 32);
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, 16, 16);
	ctx.fillStyle = base;
	ctx.fillRect(8, 8, 8, 8);
	ctx.fillStyle = color;
	ctx.fillRect(16, 16, 16, 16);
	ctx.fillStyle = base;
	ctx.fillRect(24, 24, 8, 8);

}

jThree.goml( "index.goml", function( j3 ) {

	j3.Trackball();

	( function() {
		j3( "mesh:first" ).animate( { rotateY: "-=3.14" }, 60000, "easeInOutCubic", arguments.callee );
	} )();

	var audio = $( "audio" );

	audio.on( "play", jThree.MMD.play );
	audio.on( "ended pause", jThree.MMD.pause );
	audio.on( "seeked", function() {
		jThree.MMD.seek( this.currentTime );//単位は秒です
	} );

} );