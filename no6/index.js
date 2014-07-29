jThree.Player.setScript( {
	jQuery: "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js",
	jThree: "script/jThree.js",
	ammo: "script/ammo.js",
	MMD: "script/jThree.MMD.js",
	other: [ "//cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js" ]
} );

jThree.Player( {
	id: "jThree-player",
	goml: "index.goml",
	img: "img/thumbnail.jpg",
	audio: {
		"audio/mp3": "audio/melt.mp3",
		"audio/ogg": "audio/melt.ogg"
	},
	onLoad: function() {
		jThree( "mesh:first" ).animate( { rotateY: "-=1.57" }, 30000, "easeInOutCubic", arguments.callee );
	},
	credits: [
		{
		type: "楽曲",
		url: "http://supercell.sc/melt/",
		name: "supercell"
		},
		{
		type: "モデルデザイン",
		url: "https://twitter.com/animasasa",
		name: "あにまさ"
		},
		{
		type: "モデル・カメラモーション",
		url: "http://www.nicovideo.jp/watch/sm22045369",
		name: "pokky"
		},
		{
		type: "スカイドームテクスチャ",
		url: "http://seiga.nicovideo.jp/user/illust/11592603",
		name: "(メ＿メ)"
		}
	]
} );
