jThree.goml( "index.goml", function( j3 ) {
	j3.Trackball();//jThree.Trackball.jsを読み込むとこれだけでカメラコントロールが有効になります。
	//GOMLの内容を表示するだけならこのコールバック関数は不要です。
	//第一引数にjThreeオブジェクトが渡されるので手間を省くためにj3に置き換えてます。
	//MMDプラグインと共に使うammo.jsと競合するためグローバル空間では変数名に「j3」を使わないでください。
	//今回は解説しませんがjThreeオブジェクトをjQueryのように使ってGOMLファイル内の要素にアクセスできます。
} );