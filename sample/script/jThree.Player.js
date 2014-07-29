/*!
 * jThree.Player.js JavaScript Library v1.0.0
 * http://jthree.co/
 *
 * Requires jQuery v2.0.0
 * Includes Stats.js | Copyright (c) 2010-2013 three.js authors
 * Includes TrackballControls.js | Copyright (c) 2010-2013 three.js authors
 * Includes FirstPersonControls.js | Copyright (c) 2010-2013 three.js authors
 * Includes vr.js | Copyright (c) Ben Vanik
 * Includes OculusRiftEffect.js | Copyright (c) troffmo5
 *
 * The MIT License
 *
 * Copyright (c) 2014 Matsuda Mitsuhide and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Date: 2014-05-14
 */

/*
	html anchor ex.:<a id="jThree-player" href="http://jthree.jp/">Your title</a>
	Player.setScript: {
	jQuery: jQuery url,
	jThree: jThree url,
	other: [ url, url, ],
	//if using MMD
	ammo: ammo.js url,
	MMD: jThree.MMD.js URL
	}
	js param:
	{
	id: anchor ID ( default "jThree-player" )
	goml: GOML file URL ( default "index.goml" ),
	rdr: rdrElement selector ( default "rdr:first" ),
	img: thumbnail URL ( default null ),
	duration: audio duration secend for check before loading ( default 0 ),
	onLoad: fn,
	onUpdate: fn,
	delay: second or hush{ cssSelector: second } for MMD,
	camera: start mode1,2,3,
	audio: {
		audio type ("audio/mp3" etc.): audio URL,
		…
	},
	js: user JSfile url,
	css: user CSSflie url,
	credits: [
		{
		type: content type
		url: content holder's site URL
		name: content holder's name
		},
		…
	] ( default null ),
	FlyView: {
		setup: 
	}
	Trackball: {
		setup:
	}
	}
	
 */

(function() {

var icon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlkAAAAbCAMAAAB4KWo7AAAAZlBMVEUAAAAGBgYqLi0aIyNZWVkyMjL8/Pz///8AAAAICAhLS0v29vbh4eESRkWgoKAQW1rU1NQDsa3GxsZhYWEBwr4LCws+Pj4Ke3gD1dGHh4cB/fx2dna7u7sHmZaurq4A6OMKCgru7u6PwIfJAAAAAXRSTlMAQObYZgAABR1JREFUaN7tmouWmjAQQEcQZkBQEFbF5/r/P9nJg+TUkLTA1u5puec0GTKUGHJNFBcWFhYWFhYWFhYWFv4sKIGFf/RO/q0XhQZ4FygIjtwcf795CoCaQB7eTmB6y3h3krQ7kOyrag/Q7LmudHEALvKpHRODTPCssCP4brOQ8WR+q2+cfIHQpTOGq2+0dujppaGu61t8qwXnRwyC7f2+Beiwut+viNf7vcA1iGJqx8DIvkeahT2uAOjwUzJbrcCwWmVjzUKNJzfLLMSQ0sGblAGT+f8rDaUGbhPOzFr66QVy+949jn10voHlkl7iOEk3URx36Zp942KSWH1MY9dxtIw1KzhfKHBiz8V97kw2SzdTKBuWzmss9VcNm8Xl7Kzts290+27b+NiH51IF+0KaBZBjetBSbXE9VaywWqIVfXeEiDxmfTCfnyT5+PhKsxDtvuOfqYlmyWavWkFpsywkn+k2bJY6nJu1eXOOc9uPj7J87FRcnmsVFCmbhZ0xCyebRXqssqIxZmG/kRINzn7gWG+FvpZVxuhYhKshsWQyuKKNNgt7OJRqebLhDVO8uIlmWeZn7ZKl3/6v75X4dAOoW1DczsqxYgPQVE1vVlflwqx8tFiqPy02uSttyCwy6x2OMGsuVixEj1pomG6WPsVnFqlzaJxYaCv3wkQed0yKyM2q1p9LsNiXSfQ6oNujBCgfR9hJzidjFqPNUmyxW0s45lKHuY5yiPrGBBSmU2R0OMIsoF6sN5ple7Ol25VlqlkUNovzGBBrglnEeMzSKWKcrG615ZBZg5NQno7Sr1N0PCuOfrNSFKQADWoO8NRRAWvUdK89kb1NIbN8GwxJvqdZONEsCJllV2wXnQ93+x3MOp7Mh61WULcBs5qEkamkSe9Jst8coHgeuDFPK8i5ibmkjllqlsaZ5Uzqu8zKUCDrrN8a/WbRH9kNGf9mm/3arLfuhsTF0IBKYKLTDcqdoL7FfrNyYKpUtW8B9ijMAkFaySamcc1CySSzqI9nmxX6bjislhXLZxYRTDWLQBdu1s7okPh+sZi+ftcneDLruueD4e1UqmDXluA3a23NWuOWiwufmV4FWPCphYgq7NyvK0QmdL4ThswiG44wa9ZTB6uWRywIeBU26/PD/BZB8gxPVs+Ro5YffMWfNKObn9Vj0Hupe9vlB/hYBhHvhSPMEhTpXnDv+NSniK73xlGaOOytHmWWnSOa/aTUfSZvH9c7alky3zTStOdZZJdq8maJQJfBgbiy/9osMD8Pzc/29hPR8IDqNlbBsY1Gm/VU5x30bshh9LM8qltRycMxZlkI5prlOfZsOcarzDONRFOfwZPZ73zZAMgExAKjlt8sObz5WfeN4g5oZx6Utsf4xawDpsng56wXs7DomxrsBvo1nY8xi/xiQeYw+xdp160sC/wUOtUsINnsuwTNMAtt5L1Vqmlu1hKapLqOS8mtlmIlzfqpzMqbC+KlEUZFzRW7NecKvOSw7vDaJMrBhrlgxWbtRbjFzlXaijXCLALzpeXL/4pmtXoJBtWFQcKvJ/vkX5245vLTcwHS9YRsxroP2fgKwbsITdKuLNtasgPBBdNNIaM9R5sUr3KR2mww5RxXFRSiugBTbVCw2UO+ESEnOmfQwLjjJSL5j6ewj507TAIYy0rgOZwPwV9kWHd6Bd5JoMdYo4+iKElkFImIC9mYcNhXshSncxQJREqeypnY934iWFj48tUSaRFr4YshZvFqYWHhv+QHf8ZvunsByhMAAAAASUVORK5CYII=",
	Player = function( param ) {
	param.id = param.id || "jThree-player";

	var $ = jQuery,
		ver = "1.0.0",
		anchor = $( "#" + param.id ),
		duration,
		delay = "",
		goml = param.goml || "index.goml",
		onLoad = "",
		onUpdate = "",
		frame,
		html,
		userCSS = param.css ? '<link rel="stylesheet" href="' + param.css + '">' : "",
		userJS = param.js ? '<script src="' + param.js + '"></script>' : "",
		audio = "",
		noAudioClass = "",
		camera = 1 - ( param.camera || 1 ),
		topImg = "",
		ball = "",
		fly = "",
		credit_button = "",
		credit = "";

	duration = param.duration || 0;
	duration = ( duration - duration % 60 ) / 60 + ":" + ( "00" + Math.floor( duration % 60 ) ).slice( -2 );

	if ( param.img ) {
		topImg = '<img class="gl_img" src="' + param.img + '" alt="' + anchor.html() + 'サムネイル"/>';
	}

	if ( param.onLoad ) {
		onLoad = "!" + param.onLoad.toString() + "( objects )";
	}

	if ( param.onUpdate ) {
		onUpdate = "jThree.update( function() { !" + param.onUpdate.toString() + "( objects ); } )";
	}

	if ( param.delay ) {
		if ( isFinite( param.delay ) ) {
			delay = "jThree.MMD.seek( current - " + param.delay + " )";
		} else {
			jQuery.each( param.delay, function( selector, val ) {
				delay += 'jThree( "' + selector + '" ).MMD( "seek", current - ' + val + ' );';
			} );
		}
	} else {
		delay = "jThree.MMD && jThree.MMD.seek( current )";
	}

	if ( param.Trackball ) {
		ball = JSON.stringify( param.Trackball );
	}

	if ( param.FlyView ) {
		fly = JSON.stringify( param.FlyView );
	}

	if ( param.audio ) {
		var tmp = new Audio;
		for ( var key in param.audio ) {
			if ( tmp.canPlayType( key ) ) {
				audio = param.audio[ key ];
				break;
			}
		}
	} else {
		noAudioClass = " gl_none";
	}

	if ( param.credits ) {
		credit_button = '<div class="gl_icon gl_left gl_credits-button" style="background-position: -390px 0;" title="作品クレジット"></div>';

		param.credits.forEach( function( item ) {
			credit += '<tr><td>' + item.type + '</td><td>：<a href="' + item.url + '" target="_blank"　title="新しいタブで開く">' + item.name + '</a></td></tr>';
		} );

		credit = '<div class="gl_credits">\
						<div class="gl_icon gl_right" style="background-position: -514px 0;" title="閉じる"></div>\
						<div>作品クレジット（敬称略）</div>\
						<table>' + credit + '</table><br />\
						<div>MMDプラグインの貢献者<a href="http://www20.atpages.jp/katwat/wp/" target="_blank"　title="新しいタブで開く">katwat</a>氏に特別な感謝を。</div>\
					</div>';
	}

	html = '<head><title>' + anchor.html() + '</title>' + baseCSS + userCSS
	+ '</head><body>' + HTML.replace( "{image}", topImg ).replace( "{duration}", duration ).replace( "{version}", ver )
	.replace( "{credit_button}", credit_button ).replace( "{credit}", credit ).replace( /\{noAudio\}/g, noAudioClass )
	.replace( "{icon}", icon ).replace( "{title}", anchor.html() ) + baseJS + script
		+ mainJS.replace( /\{audio\}/g, audio ).replace( '"{delay}"', delay )
		.replace( "{goml}", goml ).replace( '"{onLoad}"', onLoad ).replace( '"{onUpdate}"', onUpdate )
		.replace( '"{ball}"', ball ).replace( '"{fly}"', fly ).replace( '"{camera}"', camera )
		+ userJS + '</body>';


	init( $( '<div class="jThree-player-frame"><div><iframe style="width:100%;height:100%;" frameborder="0" scrolling="no" allowfullscreen/></div></div>' )
	.replaceAll( anchor ).find( "iframe" ).data( "html", html ) );

};

function init( iframe ) {

	iframe.one( "load", function() {
		var frame = iframe.contents();
		frame[ 0 ].open();
		frame[ 0 ].write( $( this ).data( "html" ) );
		frame[ 0 ].close();
		iframe.contents().find( ".gl_reload" ).click( function() {
			init( iframe );
		} );
	} );

	iframe[ 0 ].src = "about:blank";

};
var HTML = '{image}<div class="gl_control">\
					<div class="gl_icon gl_right gl_screen" style="background-position: -30px 0;" title="全画面表示"></div>\
					<a class="gl_right" href="http://jthree.jp/" title="jThree公式サイト" target="_brank">\
						<img src="{icon}" alt="jThreeロゴ" />\
					</a>\
					<div class="gl_icon gl_right gl_camera" style="display:none; background-position: -300px 0;" title="カメラモード切替"></div>\
					<div class="gl_icon gl_right gl_oculus" style="display:none; background-position: -90px 0;" title="Oculusモード"></div>\
					<div class="gl_icon gl_right gl_fps" style="display:none; background-position: -541px 0;" title="FPSメーター表示切替"></div>\
					<div class="gl_icon gl_left gl_pause{noAudio}" style="background-position: -120px 0;" title="デモを再生"></div>\
					<div class="gl_icon gl_left gl_pause" style="display:none; background-position: -150px 0;" title="デモを停止"></div>\
					<div class="gl_icon gl_left gl_mute{noAudio}" style="background-position: -180px 0;" title="ミュート（消音）"></div>\
					<div class="gl_icon gl_left gl_mute" style="display:none; background-position: -210px 0;" title="ミュート解除"></div>\
					<div class="gl_volume gl_left{noAudio}">\
						<div><span class="gl_handle"></span></div>\
					</div>\
					<div class="gl_timer gl_left{noAudio}">\
						<span>0:00</span>\
						<span>/{duration}</span>\
					</div>\
					<div class="gl_progress{noAudio}">\
						<div class="gl_seekable"></div>\
						<div><span class="gl_handle"></span></div>\
					</div>\
				</div>\
				<div class="gl_play">\
					<svg viewBox="0 0 77 54">\
						<rect fill="#1f1f1f" width="77" height="54" ry="15" />\
						<polygon fill="#fff" points="30.3,39.4 30.3,15.75 53,27.6"/>\
					</svg>\
				</div>\
				<div class="gl_loading">\
					<div></div>\
				</div>\
				<div class="gl_text">\
					<div class="gl_tutorial">\
						<div class="gl_icon gl_right" style="background-position: -514px 0;" title="閉じる"></div>\
						<div>カメラアングル操作方法</div>\
						アニメーションの途中でも自由にアングルを操作できます<br />\
						プレイヤー右下のカメラアイコンをクリックすると<br />\
						モードを順番に切り替えられます<br /><br />\
\
						①鑑賞カメラ<br />\
						左ドラッグ：回転<br />\
						右ドラッグ：平行移動<br />\
						スクロール：ズーム<br />\
						スペースキー：アニメーションに戻す<br /><br />\
						②飛行カメラA<br />\
						マウス位置：移動方向<br />\
						左長押し：前進<br />\
						右長押し：後退<br />\
						十字・WASDキー：前後左右移動<br />\
						RFキー：上下移動<br />\
						スクロール：加減速<br />\
						スペースキー：アニメーションに戻す<br /><br />\
						③飛行カメラB<br />\
						基本は飛行カメラAと同じで、マウスによる操作が無効になります<br />\
						マウス操作が難しくなるOculus使用時に最適です<br /><br /><br />\
						\
						Oculus本体の回転をカメラアングルに反映するにはブラウザの機能を拡張する必要があります<br /><br />\
						まずは<a href="http://jthree.jp/?zip=oculus" target="_brank">oculus.zipをダウンロード</a>・解凍します。<br /><br />\
						【Mac OS X】<br />\
						bin ディレクトリから npvr.plugin をコピー<br />\
						~/Library/Internet Plug-Ins/ 以下にコピーした npvr.plugin を貼り付け<br />\
						これで Chrome/Firefox/Safari 上で vr.js が使用可能になります。<br /><br />\
\
						【Windows】<br />\
						Chrome）<br />\
						chrome://extensions を開く<br />\
						"Developer mode" にチェックし "Load unpacked extension" をクリック<br />\
						bin フォルダを選ぶ<br /><br />\
						Firefox）<br /><br />\
						コマンドプロンプトを起動<br />\
						bin フォルダに cd で移動<br />\
						install.bat を実行<br /><br />\
						設定後ブラウザを再起動してください<br /><br />\
						参考サイト　<a href="http://d.sonicjam.co.jp/post/59350832259" target="_brank">SONICJAM Developerz Blog</a>\
					</div>\
					<div class="gl_caution">\
						<div class="gl_icon gl_right" style="background-position: -514px 0;" title="閉じる"></div>\
						<div>jThreeプレイヤー利用時の注意</div>\
							ブラウザはChrome・FireFox・Opera・IEの最新版をご利用ください<br />\
							Win7でのみ確認していますがMac・Linuxでも動作するようです<br />\
							MMDの再生はPCに相当な負荷がかかります<br />\
							また、音楽が流れますので事前に音量をご確認ください<br />\
							デモを見続けると「酔う」場合があります<br />\
							その際はカメラをマウスで固定してご覧ください<br />\
							60FPSが出ないPCでOculusを使用すると酔いやすくなります<br />\
							装着を控えるか短時間に留めてください<br /><br />\
							jThree.Player.js v{version}\
					</div>\
					{credit}\
				</div>\
				<div class="gl_title">\
					<div class="gl_icon gl_left gl_reload" style="display: none; background-position: -571px 0;" title="プレイヤーを初期化"></div>\
					<div class="gl_left" style="margin-left: 5px;"><span>{title}</span></div>\
					{credit_button}\
					<div class="gl_icon gl_right gl_caution-button" style="background-position: -270px 0;" title="jThreeプレイヤー利用時の注意"></div>\
					<div class="gl_icon gl_right gl_tutorial-button" style="background-position: -240px 0;" title="カメラアングル操作方法"></div>\
				</div>\
	';jQuery( "head" ).append( '<style>\
.jThree-player-frame {\
	padding-top: 62.5%;\
	position: relative;\
}\
body > .jThree-player-frame {\
	padding-top: 0;\
	height: 100%;\
}\
.jThree-player-frame > div {\
	position: absolute;\
	width: 100%;\
	height: 100%;\
	top: 0;\
}\
</style>' );

var baseCSS = '<style>\
html{\
	color:#fff;\
	text-shadow: 1px 1px 2px rgba(0,0,0,0.9);\
}\
* {\
	margin: 0;\
	padding: 0;\
}\
body{\
	font-family:Arial, Meiryo, sans-serif;\
	font-size:15px;\
	background: rgba( 255, 255, 255, .7 );\
	line-height: 1.5;\
	position:fixed;\
	top: 0;\
	width: 100%;\
	height: 100%;\
	overflow: hidden;\
}\
a {\
	color: #0ff;\
	text-decoration: none;\
}\
a :hover {\
	text-decoration:underline;\
}\
img {\
	vertical-align: bottom;\
	max-width: 100%;\
	border: none;\
}\
canvas {\
	cursor: move;\
}\
.gl_icon {\
	width: 30px;\
	height: 27px;\
	background: url( "' + icon + '" ) no-repeat;\
	opacity: .5;\
	cursor: pointer;\
}\
.gl_icon:hover {\
	opacity: 1;\
}\
.gl_right {\
	float: right;\
}\
.gl_left {\
	float: left;\
}\
.gl_title {\
	position: absolute;\
	top: 0;\
	width: 100%;\
	background: rgba( 27, 27, 27, .9 );\
	color: #fff;\
	font-size: 16px;\
	height: 27px;\
}\
.gl_title span {\
	line-height: 27px;\
}\
.gl_img {\
	width: 100%;\
	position: absolute;\
	top: 0;\
	left: 0;\
}\
.gl_play {\
	position: absolute;\
	top: 27px;\
	bottom: 27px;\
	width: 100%;\
	cursor: pointer;\
}\
.gl_play > svg {\
	width: 77px;\
	height: 54px;\
	position: absolute;\
	top: 50%;\
	margin-top: -27px;\
	left: 50%;\
	margin-left: -38.5px;\
	display: none;\
}\
.gl_play rect {\
	opacity: .9;\
}\
.gl_play:hover rect {\
	fill: #cc181e;\
	opacity: 1;\
}\
.gl_loading {\
	position: absolute;\
	top: 0;\
	width: 100%;\
	height: 100%;\
	background: rgba( 0, 0, 0, .4 );\
	display: none;\
}\
.gl_loading > div {\
	background: center no-repeat url( "data:image/gif;base64,R0lGODlhQABAAPMDAI6Ojt/f3+7u7oKCgpKSktDQ0KGhobCwsMDAwPb29sjIyP7+/ri4uPz8/Pr6+vj4+CH/C05FVFNDQVBFMi4wAwEAAAAh/hoiQ3JlYXRlZCB3aXRoIENoaW1wbHkuY29tIgAh+QQJBQADACwAAAAAQABAAAAE/3DISau9OOvNu/9giCWBghSCqK6B4b5Is86d8t7GIdOgoDCMk8PSwt0UPE9DcWg6GSnKwYiLJjUIp7ZpTVBxgaumsN0yFhLB91YQZ8rl8EC9drXdFgF8e2/UXXISCQUIDApWM3p7TkgSNmsHaI4ElJUMQ4mLTncDDVNfVgyVowQGOyoLmk2Bc59gEwWkpAg0ZItnFUs3CFZ+sqSIIQtZe8EUCQKnEgG/pJwqCcRbrB6xzZWNHA4CAQECkgMLAdIKCSrM15TZGeKFQEHGPALplNQWCz/v+vY8BummGwroGwgFz7xr/I4RHLjuCjpZDS8EWDjwAZ5WowwkrCCQ4rt4Sf8edAN5oaPHghdZnASCKaUIByufuQwx0SPJmRxMDryJk8M4fYd68ljATcA3oUiTKl0aDpkAc0xDCCigoKqCAlCj+rTKNahWDSW6cs36tYIDsV1llk2DtmvLtcvacuW5NKxcrxcXNGgAjoOPuwreXlng1GgCZRkSAFbLo4HRx48tbpVLF4RjyJgRX1hAFW1lEIUxG+6LQVzazx+Iis7sYdtIcEQDFCjgTXDr1Zglr2gge7ZvFC9xQ9YtQtzv42Qr6CV9WbgA2x+mHv8dgLTqbrUnEHZ+FNX06YhcY8eedZvw5KC/H7cSe/z4lqEhJyCdXr3vQNzcj+8+4IHo+TQ4YJ9Ub1GIo597ZC3gQAIJPKDZOQMCN4ADB7qH2grSqVedBBRWiN2FLNiXFW8edoNeSsYdF0By+Xn4oEskfEhfjBWCiFSLFtIHlyD68bfjPYVB9+OQQ0YAACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CIJYGiFIKorsFhvK/irHRXwLjBNHUoKIhgYFYJ5HKKnqdRODifjBTFdcQllBzFc+u8ShLVXACraXG3iIVEEMYVyBnGmTsGsNuvN9ySmHP1DXgvdV8FQQpSNQJ+W3oACngHahIKBJaXCEQrfYxOjg5UVYkMl6UEBzwrC51OhHahMAeEBaamSTRNjAyTEw5NMAiJgbWmXioLCIyJfAmpEwHEpo4qD1pnrh7Q0Ze3HA4CAQECvAsByQcMBcYg2tsE3RnlQfOIe3bultgWC4bz/vo9Drgz4AyDOX8IlykR4A4ghQQII07D0k4ah4MR/T2wt6iULBsZ/xPak/Ag3LoNGEMGG8lC5TxNLCU4CFAARQYHLhFMHImMwICfAw6cfOZy6J5AQJMSUDihX0Sm9g4knUoAJoUS/urFlBBgqlcE8QSIHbd1AgKvVMuGMIB2qloQbNsCjZdArNGRZ+UOIIBBQM2/6tR21QvWAk3Af6HukdqWwMYiiBHfJYPU61ILviIDdginZ1KhF/xqBmyV5cyaigEcHl1z8lvIrFuzXECbFwfRsUv3WOAgge8ED2xnSBC7pr0GD34rL5hhtWbXIhYkV65c+IVyo1Ov6E1deXAO2BFrP9a9O/Ob4MQ5W5A+nIDzHRqUpw7/Q4Nw+PFDvyB//u/6HZST35yAky3QgHAL+PcfDe0NiB+CdY313gTSKZiAdR4I6GB+6zQgoYTG9Defbh6UtGF+ibD3oYSacNedAxh6QMKJ+CUS4Ypj8YIcdTDWMBON7kmgIo5jPSZkAw44cCBFQAbghYdEjrVfDw1uOMk3Udr1FpBGDhnllLtVaVIFWYoFoD111XjeA1mC+doXUcb45gg4yjknBgnW1cydfPY5UgQAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIg9QaEUgqiuwWG8r9KsdFfAuMHMNSgUCIQiwKO0crhCz9MoMJ5QRIrCQOIOiSVHAe0+s5KENRfQagJeL2IhEYyT5gwi7Z263y9l3JKge/UNLnhlEwkmCChLAn5degA3bwdsEjcElpYIDjV9jE+OgWMHUwAIl6YEB0UiC51PhG1VOQevBaenCjVojAiqAE2CBwqjDQa2pgZgKgtcfqN8Cb0CxqevKg/MXtUeAdOmjhsOAgEBApMACwHMiMkg3N2W3xjoCkFBwnsA0u8E2hYLQPUC9utx4J2BXhYCBFx4L46bbgMpJKC3MGC8JQGKnTJwMWHFipr/9izSiCpiBYUfAzqL80Acuw0oUwZZia+dzHoha1JwUIJcBgcUU3bcs+wUFgwxKyp4iY/YNJoSktZrqFMCg24Gcp4Muq7qBHfdcMkTQDaBOa+lDHoVUXDf2hBt32VYkKDsWwlpsWL4UaBvgQBM8YGdJvak38OJ1l6dhswCX8R+H6x1aoymA8iITZopauqoY8yItVbl+RdqVNCHA9+9UAJ1X9VLFsj+8Bi16NgLGujWfTaDIdeale0e3qA3UtewhRMfbtxfa8imaeRevru5c8jJlVOv7iEc2XIT6IobJwBhh+nbeddoMH6c++wX0Ke3fr69e/eS5c2mIH87fQ723edeiG/ifWcWf+mpp4yADALG33cQCpBTf8T9B06DAo6yQIQRFkGhgiskgOF9o9TFIYTmUGghBzyNSJ4EG54IoVay1bhiBy6OAwZ7Mhr4VoAMTsJjjwLAp8iIExJJVn5rbdggk20oeaMWdZEHXgXeyWjkaoVoOSWXErQU4YFggrDAAwmkaV6ZbLbZQwQAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIg5QaEUgqiuweG+SrPOXfHeB7LQoWAiioDDIsDhCjxPo8BoOhEpCsOISyQ5TKeWYZUkqLjAVRPYbhU7QBH8Qo4xCPM2umYfxG9LQr7FL+wuUV4/KEkCfFpuADZsDGmLBpGSMTR7iE14AA1TYIIIkqAGDDIrC3GXgmqcYRMBoaEKNGWIOhVLqwqCDa+vXSoLCoipFQkJjxICvKGZKg/BW1AirsqSihsOAgEBAo8LAc8IBb4g09QG1hjeCuvrhXnJ5gbMFwsm7PfzSQzxpBnf9wCH8YCnLB8xgAjRJSkXSqGFfwjvDXm3T9KdDhAjrhN4BVuAcRv/MmrkmOeDAI0SS14gUWBbBgco1xnMA8wAgZsEuGAQCRBkyQYHcAo1QJLnRpUVGAhdamAiEXvtfJYMsLRqrHQCshpDWgFBVaZcVQT9KjSsiLFkb2ZYkCDrA7MTvKYlYABDtgJ4W0rNQ3Xu1Qol8gom+UYpWQNvK/gQLDhAYq5AvxK10CAw47wz39QUqvPpZcb9wrJ0afcz471wLyw2jRd1JW2EPbMuEPpKsgG4B8jr8GB2y5IFCOQe/lfD6s+uRQgQPnx45gneTMdWYaB5cwK16d3FnFy5desOLzTImrVbW9gCstf43hwBjQXZtMn/KKIA++HuS8WfL9+phQXHSBDAnH25hdfBfvzBFuACDxTj4CMNMHffdGslmOA4bDmoYT8KEMjADJVZOJ8gGWqo4SMHsGeAeh6QIKJ8gjRoookUIGAdA/6JEOKLpJU4o4OhJRBMDhQeyCN9mvxoYo4qJcAjNxI0oKSGTKqEIH9O+agkizRduU2OUz6YmgQPkFceZWFWOWYGMv4Y4JobSDnjm3BusIADDTpAZ5189slDBAAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giDlBUQSCqK7B4b5Fs85d8d4HItOgYCqnHUWAwxV4nkYAwWwqUhREEZdAcgrNLLMqSUxxAatmqc0WFhLi9xUWY8plqHp9aLsrCbi23aC7oF0BCggFgDMCell2NmsIaBIFBpKTCg40eYlMdg1SX4AIk6EGDEIiC5lMhnlTdgGiokczZHoKjxMNBQwwXAB9r6K8plh6hngJpQACv6J2Kg7DWsUdrsuTsRwNAtoCtgs+TAoBwR/U1QbXGQslJuzSPMrmBs0X6uz2hXcADOYHyBbr99iNe2dunoUEAe8Z5FEOFgcfCe1ZuoMo1AF3/yLaG2jFgTaOGP8AagSZrwNEjTFKWiARAEUGXCgX3lmggIBNmwxAnkxI0kqfm0ANYBRpD6MbBECTGphoYeeJnlYEJJ2qIF2Cj7ZUSkA6NahWFQe6Jv0qIqzYm+keJEjAlCzXswYwCGhJN8ADssnO2qzatG5dqEjeTl3a12/dtiV/DpamxHBdo2JoJs15Ya7juv5KsnQp9/JfvB8sexan8kFLyBVEe85Mg8iA1wPkddjsOV8A2LgH8N2g2jDgHrlzy6Sg7jJqEQaC4ybAmnhv0hSVC09yVUCCbtW3Zf1QQDpuBDS8bRt/N0R376/BrxA/fjxi4tsB3EY/AF2I7O21V1jQwMGD/w3Y0gCPAfQdhwF7+W1TngQL+Pffgw4IcZ50DMyQTYLj8dLggxz+Z8sB0hnQHAceYTjeLR122BYCwR3wHggXmmjdBCmmmBVCLiBg4EMyCjDRAjV2OKIV+CX4CJBBPjhkVCYKgWSSD8RXEoLjIeNgklKqVCJWFjxZ45KgVdBAkC+GucGGHDqQpZka8NdfgGzGKedXEQAAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIg5QVEEiaiuAeO+RbPOXfveikyDQmkGOorgRmQUdp5FQMFsFlIURJEIRWoKzSyzmpgSA1bNUpstLCRD7wscxpDJArR63b4k3lp2Y+6KTxIlCgV+NAJ4WWwABXMIZxIFB5GSMTR3h0yJDVJehAqSnweNMwuXTIQACZtfEwGgoEczY3hmFQ0Bqk8TC66uVSILWHinFQ8JQWi8oIkqDsFawzXJn7AcDQLXAo4ACwLBJ74frdKR1BncJuiDdQAC45HLF0rp6dA7CO7aGD7z6OA77dLgWXjAb57AHeJclcPQrWA6B+sE3JPEoJ6FfQ5zrQPg4Jq/DBj/HX7c2KFhRkokKdgKgCJDg5MnUuoqYKBmTQQjTRYcGWaPzZ8GLIZEZ7ENAqA/DxwTYpBnGAFIgS6ksCCBx3wpFURNKlMEg60/u4b4CramOQcJEkAUC0Br2QMYALGcu1Ym1LJT2c3d27Lr0a0HHljowXfv0nUNDmyFtrLw3KJhgAFl8FGu47mHNzYuSvgyS8FsS3qeC3rdA5ZOK3T2nLnQAQKwCRg4aIHEaMgqAsTeTUCBaM+pQwjgzZs21dV7cYswQJx36+OFgwtvXtxDA6sCEuRDi027igLUd/sehR3btbofwIeHPX5FefPXnutbDzuvh/fwr2HdtqB/f5X0ESAdckP5wYcef/4lOIF61CEwSoHw+ZLghP9J8FpzBsi3gTUQdqcLhRNSoABxDBwYAjcdevQhiAr+sQgDCihXUooCrMUihWI9QOOKN1bYFX7mHdOjf2xVVeBSQ+4n03UePbBfkqGB0GOUJ4JIpQohXqnllutEAAAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giDlBUASJqK4B4r5Bs85d+97KQoeCecYWwW2ICOw8jYBiySykKAri8HnUKJlYBTUhHRqrmWu2qQMIuzBwpjDOCiRctOurriTa2e9C7npPHj4BfjQCeFh0Nl05EwEHjo8FMjN3hkt0DVFdgwqPnQcIZSoLbJWDAHdSg42enQU0Ym0FoRJJN04TCwysnlQio4amFQ8Js2a7nnQqJGMFwTXHnckaDQLVxLgCpCcOKqvQB9IXCz0l5b1VCd+O4RUL5e8lzjsI3wzFQfDw5zsC3/IUJPLBqwPAGzIO5ASWk6TmTicE/yokVIiCoAQH1j5MVLjPooeNAv8ZeqRFriMtiuVG4ipgoGVLBCZBvnugEkADBi5zGvgnU1BNAAp05jwgkgJIk2oECNXpCsOCBNbuWQy61OWBnyBwVnWJ9YPWrQYyLHCQIEHRkVS3Xr0AtZpbbjWVgm0q0a1dAUjBpBV6AC6Ftnfdnq1zs6ozaoHv/hylEybbxHcHE0xSAinku367arhsN7OaBz3y2uFcTSqhAwRSEzDAzgJizgQDqJ5NgO5mzp750abdmsI4yKJFGNg924Bk34DdBudBnDeSsmVnNRhW1oHpDbKbq1ZA4yn078fDaN9Og/p36NehFss+3nYIsufPF3OAgMCA+wcGNRg+fjmG+PGJJICFffcVOABdBYyHwAzeAQidXw4QaGCBdDDQnHEMOvidXwxMOCEBoSiwGwK5gdCghnA14KGHySRQAAIMKBARCBpCJ0kAK07IXU3wachIjgYu+JN58YWSAJAFuufRWAAWJWGOMxJG3QPWWYAjkAxo9gECOWKopQcFeNjXlzQWoAtEZKapphoRAAAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giDlCYCZiqgoK4rpBo85d8N5IsdBhYhYBgawiwOECPM8iUGg6CyhKwYh7JDnM59MqeVBxgqtGoNUGdoDi94UUY8rlMCCxZrsvD7hZsmjV5V1ZAVE0CXpPbQA2awpoigwHkZEFQyp5h02JDX5UhAWSoAcIlSILmE2Ac1M4CoABoaEFNGSYjhINAX4KUBMNkLCghKVZcMIVDg+2acChiSm4cKker8ySzhoNCQICCY4LJU4BDinU1QfXF98m64N3c+aR0hbq7OvyPAjmDKQXJfXsXMQk+AXsHgUH//65E0AQFDoL/hKu45ckgQJQCAwSkQjQnQQS3P8+ROQY0GOIkRIpemzgzxgFXByDmKRg6oCBmwYQuJSAsl7JlQxwCj1gsOeJmRMUCF16QOWcfz89ClhKVRaGBQ8SJEiGdEIBqky7hkAAdqlYEGTL4sywoMGDB07dfVVr4ACGB9vyChE7la7VCtr05h3XVWnZA4QpBBacN+4VX2CJzmMseOedmkJ14qEsWJlJlkcxLOYsIPHZDaM5m3ZDop0HvKS3eebBkIBtAuc6sIytUUUAA7eD/9WQWvBq2sCDB39Y4RvnqDwOKFduwDGf4sdpT5/OfF7WrbbaOhjfYDaW7cqHl2owvv148xoCoBdOg7179/C1KRMw/7Z6EAvcJ6CZBQ4gQMAAA+AGSAPJzWeZbgLeZ8tUCFaY4F8F9KfADAFG6F4lDhhg4YiJMIBeUxx6+OEEDIw4IgGOfKUcAtl90KGKDgzRwIEuWuiMIS4U0NsH9qmIhgA9jrhhV0VGWEkASVq4JJNGTpBAlBX+91mEyoiI5ZButMVeA+VZAGWUCJyGVpLVqQlChiMyUKObGRgCSSt05qmnRxEAACH5BAkFAAMALAAAAABAAEAAAAT/cMhJq7046827/2CIOUJgJmKqCkrrBosqd4FrK0U8g6UZCDoK62YL7DyLQGHJLKAoBeLtceQom03HxCG9CaoaARYLkwy7LSMYMx5/Bwn0a31xtLHvhbz1ljiuP0cJd01qAzVoORMBDI2OBQ0zg4RLfQtRXX0FjpwMCkEil5QFfXCYXoudnQUzYpSgA0k2ThMLCKqdVCpJhKUVDg+wAridhikNV3gijMSOxhoLCQICCUELJUwBWiLDzY3PF9c+Pk9rCd6Nvhbi4z7qOwreCLAWPe0+22ACt8TvFH/3xvmTsQ8XuHoB20WiM4iTgoFCEo7TRWcACWof7EnMV5GbRB/0/zo26FFu3cdAHSlcOsCSpYKSETemrIWgpc0D/jSOg9lRwU2bDBYiFMgxpYCfN1lhWOAgQQIHISsWQAp0ZoqaVFtaFYE164EMCxo4gLp1wlSvDEZMWytA6MyjXpVWkMZ2bdGeWRncfVC3blQwtqiqu9aXLc+KK20iOHyx8Nq/a0aaGEjX8TS3ZTdUtowZDIkAhzHwtTwNcophBlIbOHDQwkjSoWUEUE3bgFwNm/t2blW7duu5jimCOdC79m4LudtWFFDcNxJgDxqYTjG7uerbmTVUt247O3Bh3FNj3+oAgQEC6Bn0aRDeQOzl59HLJyC3AHcF3h3Eny/fEIPmBxzXEVAD/PFnQBD21YaAgBU1UGCBxgyCAAKkeGfGg/zhZ6F2GM6n4YYYCNChfOOBSMF+GEIEYgAjImDiBghgaACDLw5QQIF61chBQ56oqOOPQFIQAQAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giDVCYCZiqgpF6waNKneBa7fLHCalKcQV1s0W0HkWPZMSRRkOH0aOcqp0TBrOmyCqSVKVOUAiS+Rmvl/mmNzami0ONNW9YLcp8VqAOUvIp24ANWxhggiHiAVAKg9/SoFYZHwFiJUIBYUiC44nFGtDgQGWlkUyXmiZAA2DLXsTC6OjUCqbf3wWDQ+pArGkM6totx68vYilHAsJyrqvXj8pxMUIxxnJAtfYs2YJ0oeBGEjY4gLCRpTSqRbj61bb0t8XJOvjbwDRvhs88+LpOmOVBeBh2DeuXT155TLoIyjAYD0RCwn2O9gjoYRwDB9WqHOgY0cF2v8qRFy3SCMsjygZWCRo0UwBlDARlPREUiMFATBzFqjmQFmDiW9e5kSJwGYKBENhGhWBNKnHagsa/Fw6QajTovEeKFsGlAtOpwd24tpKNsHMh1ZzyhxbdiszoydzqrSwQGvbrQ5Npj0AMt7dsl25kOg04i/ZwFQpNDC8FXEKB9dasmXsGAQvA5gNHBB4IRnjkFECHMhMWuyGxYbPzsBJujW1DD3vqp7BoHXrA7Mr5CL71owA27ZfV5MqtVAdAwMGEGDAWQrw1qZTJECevPqA6B4CPC8tYwF169WFT1C2a3tm8R4QgAdPYGYDBQYIEDDA/Mpo85I1LCCwHnz03/IFON+HMdptp4Ap/YHHwBXxCShgIAg8x0BuUiRo3QETIOCggwYUUoBtClDIgQAWVregKg1uGCA1fihwSXMh8FdiKQKo6CB2D6lnYYcSBGCjgAdS9d16gSTwY4A4PtTAAesR8FqKNuZnhmjxGYAAaIIciVViHyhgI25chvChg2uFucM5CsBo5ppsGhEBACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CINUIQCImorkLhvsGyzl3w3kVMh0lpCrJKC3cL7DwLn2n5qNiIN8eRo1wupRIHFCeYaqrWZTCxvXW9mLA6kAKQy64zuuJYh88LeJxSX7ZpCXZWck9bOhIBCgiLiwENNH2CJxMLhUR/BYyaCAVBKpWSbBQPli+Em5tGM2BqnhKVRU2viqiaWJ+SfxYODq4AArWbcioka7oewMGMqhwLDgkJvZSBSwKPIsnKCMwZCz0C4OC3Xgnai8MXSeHrKHMAmcoKvhbf7OHX5LS16BYk9uzuBOjTxA1DvX/g5u0go6kAvwsHEeKb409Wh4j/JroL8QDhOoXu/4qJwqDO47GNlRioVFnAYgWM6zSGVLCyJoOHbhCO2/jOZk0EMiV0ZBd0jgCfNgtSWNDAwYMGIOcUQPqT5wqaVFdaVYE1KwMNC8JGleqVAQKSTBuohbpVwlGvSgGkXbt27JSpVIFamEu3btsGXW3y49tXrd0jKWu2TFe48OEjIk9Satz3cdvJlP1udABOMsnMmtEAO2Cg9M0OhBu7C0C6tOsDBVCDtoystevbcfdSpu2Bwe3fBg4UrUA4bEDgwHPvFesqjwEC0E+LCID8d+wZCQ5A3w5deQbq1V1f//ScO3flPXwJCO/a+wYE5uNrdKCgvAHpABrYRn7Ac7P48Y33i4V25hnADHjVCRiCAACad1YWBMZngBwIVMfAcBwE0CB3X0kA34YGeFLAfgYogCEVG273YAPlbchNIAoo4NAUKXbnVo0EKLiRAimGiAiOOm4UYXxyJADkZQA4wACABQ0pIU4bsfZciSdpuKECSIbAI4DCZRlCAS1Ch8BOXl4Ez4xlpqmmVREAACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CINYIQCI+ormbhusKyzp3w3kUg0+BTlokdJYHDCXiehSnAZAoclUARB0Vuls1sY9KYGq2aRHZ82hG9ryMYgyUzE5IzuqBeVxrusXohncMnDlh/NA55WXU2aDoTAQqOj4szeIZOE3xog42PmwVCInyUAYMAD303JxMCm6sKATRtZDEVSn1MKRILBayrVSq0ebcXDQ6eAKq7m3W+sG8ix8iOrh0Lww4NQgsJSyVbztCQHQ8J4+TdawnfjsoY5O3jvWC60J0b4u7t5lbo0OsW2ffu7BhDJk2DA4DuiiERw6nfBYTu8q0hgeKDPYgJJAoEcRBjkI0W/0icGDXLI8mNfBAwWMmgQLAKHRFqtLNAAcubCE7GkQmSQoGbQBXMBBCzXM9UQJMW9Ndg2FCBAZIGPSrip9SbVENYvboyAx4YWSVE5cpAAQYFBAaoHWBgKUgBZBm4lXBgrd0BBbJuTaoAngQEd+86XFNTak4LCQLfNZA15U2XFxQovqtToEgBlQHUnbx2blgMmzkP8IwkEOYPkkUPGDxD1YHXBxCwpiBANWM7AWDrPkC6AgPRvVUI2L17Ni4Dk83aQUB8t0J/gO0SCC68+W7qE4ggQFCgVy4DBAgYkK0it3XYeWckOBC+fXjsFsyfP5DeF3j37nuLKzZ8Pu8ZaOHnnp4BEjWggAEIjlfHAv4dkNkGCwgo4FLDJWhhQfI1V58zEuKHABcHWChiHQpYh8BzHgTQoXsMTHCgiBYeIEQBxAn1yortfQhAAzDCuBRDCtBhxX0rSiNAjyJuCFKAHRqww5FIJqgkSOx1WEcCUSYIHw8OMCCgAeuEmOWDuDGQoAIviZWlcp958CKMBzzV5gUBwGjjnD00wp1xePbppwoRAAAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giC2JYDpiqiZB6wqLKneCa7fxDDqmmeQU1s0m0HkWvaSgURkOUcaNUsmUNJy3RFRTmiZzQmyruMV4ldCH+FW+NM5JLWCxbsmttYDgLuPBfRN5YkACBYaHAVUqb397E3RiDxMBh5UFAUAiSI2SEw5Yd4WWlQEzXXCZc4J6UHOjo62af7EVDQ6pCa+WZCqbU50gorqGvBsLDciZJHGpHsLDxRm2D9TUzTq5w8QcDtXeD4pblNrXFA3f3+Ur2tEWC+jftEbPle0W5/De6ivjhgF8Gbrlq7ZPRoMECeRJG0iwzQx8DAtGYeRoBMMHCtvQUYCgI4ICGf8hwpM4Y0EBjygVAJwg0ls4hxICoJyp4CXLeCRnCJjJs1SGBUBz6pDJMyVMGSeLojyqIqnSjtLG2YNJ9KkCDAUIDNg6wMDUMjufIvBZ4QDXswMKMJ1k1aYCtGi/RjFZVKWFBHDRHlgrYSNKkBcK5EW7EibFwhIYDD5Llm8Hs4u3Ni7jB/GFt5EHWF6h4IDnAwjkBspswKGAz6gPTMagePFqnalTi55jYPDVNp1jf2Zg0x0CtARem9It20MuBQoCtDJ5wAABA6FTBCCOWrjxAwSyazdgPcN06p67G8OuvTyBrw9+VDgNXrUMBebNG3jpoEBzA9B5NWDQfrOGBc7FV16QY6fhZ6AB7sUEnloqCCCgebcB4MB9BxrIS26x1SRDAA+Wh8AEClRY4QFAfIdaAb194GCH2d3WgIgiNsaCP7N1EGCHPgkAY4UMrpVVhyRKoOOOBva4FnnxeTVBAkQaKF4UDiCQZDQU7uhfGQEwgN8BgDXRpJGOeVDAjryFKcJ0FSqQkZkbqIFcATWyKeecOkQAACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CINYlgOmKqJkHrCosqd4JrB/Ackkn/xBXWzSbQeRYlk1LQqAyHTeMmuVQCAY3nLSHVPKpVruShJXYzYDAK4Ci/zpdFOixZuFtiSaOGexj3c0p5fGVXAgWIiQFXKXKBJnl2ZWsAAYmXBYszjycUWU+DmJhFMlRzjAByRFGpoqKUKaZVrBYNDagJrqMzSGmwHoe6iaQdC8aoDlQJqMDCw8XH0XAAD86IxBnR2sw6ls7cFNvbcNXCeRji43DBotjo6dLTZJcB59nw8dM8vxr4+dMi/BkDGEdQP38EwwVQwJBhAH51ECZs1bBiAXsT8E2UsLCiRXDp/zYCSOCxZICDA0VWKumxgMoPBVh6fOkhpsyGGbJce9nxpssLBQgIFWrAHUCSNxWctMBgqFMCSyf2LFmAlgQFT58ahbPAZkuMCbI+PSDSTkuIQcU6xQjQkQC2EhCodRqVZoamc4XWPQMILtC8Qv2uKMCgMAMFWy0IAGxgmgAEhiPvxSB37uQZCSBHjpw4nAG1P88o2LwZgdU4lelOS0CadOcgNh9mDHDAgG0EgjMEaL358gfWtoPb9q1hN2/DxDksqC1ceOcHyyoIOI5cRoHm2K02KHCg+wEFeRpoPp47G3bsdVl7Xx/VOO/QIgScb65gQgMG6/MTI9xawekPAcwnHGoCE3CX33oMXBHAeIVVtYmAwdWXyoEHYjNPJuV1AOFwEghAYX7wEXSdgAcA4eGH3oVIEAMCEpMAit4l14V457mDH4wZSrFgbQcU4IcTMKpoFwYGHogAOENaQBuI/yWJwTwKFPCak1RW6UEEACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CILYkgJI2orqXpCssqd28Nz2HzJLwTVy2bC+dZOHhIXooirC2Jml0y+QMsmq8EVHOcTicOrEu7xXi9y7D4VL6QzkmH5Lp+UBovOe4N703WNxICAYSFgSt8fXpWYouDhZABVSp9SE8AeEJkAI+RhjNdfZOMThMLnp6XIpWqdw2jCaiRAjOJSa0cnbIBtB0JBQgIAZc6SD4qurK9GgsIBAPQAwQBbQAOu4WbIwbR3QMK1diEoxYM3t7UZde72hcC594G1bGoyxkK8N72UOuQ7Rjm8kVLV62BHw8BBQ4gWE0EPoUD/jXMJGCRhQTPBB5oWOFUAQUg/xUEsEgBgUAC+6qdCsmygEQAB/IV4EghAMubBXABKJARmgGGHAXcHAr0ToACBSTRrDkU51IRNpuyfBoiqlSQGfAQSsnRqtSZFwoYIECWwAGubYReFXmBQdm306h6xdlKAVy4aLcs+DjU5cW7cDc+9chyZFjAcF+2oajYGeKyRalmcPw47kQTii3wrEwgMyVgwRAoyMuEs+AyAkKrFtaBMuDIMhKsXk16zgHEYMsomL2anIVmcH/O403bQyyQhucEYGDAwAEFnjGkJh4atnHmzbMLDzGdOmtE2LVnz7tjVHfq1jmIFa/9gKoGBRgcmA/dlPdg0UccYC+eYQL58wV4AItBAXiX3gYC8CceOBI0AKCAAS4D2mwK+OZBggpmh8AEBUAIIQNVFLhaTjNgmKEBDC7goYf2PHBUUvlxsN+J6QiwIoQHErGeggf8YOONAea2VHjsLZMAkAHmSEQDCLB3VgUP3hgjEQXOx0ABJHGCpJCSddDhighY2GUGAXhI4pghuIhUAbWh6eabM0QAACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CILUmZNGKqJkLrJosqd6xrC/EMLk3j9DmK43ZL6D4+h3IZlBCJqOMmuawGF8+iVEOtLqOAYfa1zXS9ylxjTC5bFmh0FMsWOChr110Hj1fBNWNBAgGFhjgzfX5KYHRZYISGkgFNImdoTXlEewCRk4eJi0pvgQInEwufn2Apl0wZPJUJqpMCia6VNLSStjQFCgoBrDyMDbm6u4W9GgsIBAPQAwQBbmHJhUbMBtHcAwrV15QbCN3d1GUOydkZAuXdBtWzqssZCu7d9FJDk+saDPfczlUjccrDP4DQBFYTUQAhtH4LJZBowclCgmcA4UVEJaCAR4/C/zCQu0cg38AAH1MWgDjhwL0CGyegVPlR3IUCGKEZMBmPpkqeEhrMRBRTwkyfIIuGOIoUptIPTJGaiQQUXNOkNw0Q2Epgp9IEVwvwdMa1rMKIUVOGrICzrNuqUlIhZXnRrVsGSrGoXMvWrl2WCyfayUDWL9ezTwkbNhsxz4MPbRcTADwDLILLCMR2ECCZwIFqAhRgHo34QmG/pWUkED16NFyJBww7LVOgdWsFxyosUODWQGrVtm2/njALJKdUDAwYOKCA8gYBwVv/poFAuXXl0zFAj445O7Pk169XdQCjwnbuCIZnKBA+/AFWAIQiOHCAwUpUrLk/TrGgfXuFCcxH34uADAgUAHreseNfeLM1IOCAEC5zYHAF5LbZgtd9I0EBEHZ4AAJBTEgafCEIgKF1TjXAgIcd0pOOIc6BcMCJvjnBYocJzsAehgfkIMCNEOY4Q3ULLpMAkAMKKUMDCrR3QD4P3hijG9DRZ19FNgI5W2IdBHAjAiRyqUEAK0JYQJhiapAOSOql6eabIUQAACH5BAkFAAMALAAAAABAAEAAAAT/cMhJq7046827/2CILU6SPI2oro7gvsmyzl3y3kJM71eD4wmecGL73WTD3cKIcyR3Pubr8aRFpQJndbXEClKTRfG73YyNwYkgwG4LkGWLWAoerNv4d/wy/9UTeIEBAnt8JjBwC4KCdYUVC5AVDouBaY41lHkegAoKAY1DgJlshBsLCASpqgFVDaNsliMHqrQEBVV3mXAYqLW0rEmumbEXAr61BlWigsQXBce1pcG5g1QcDNC/ZSQoH73ZBMCXHM/gBM1bfVoXCeYHjksF8vKfGArg0tsB8/wB6APYjomLs49fv10UyqkykK9MAoMQG1JwJU+PIwEQDQ4cp6Fgxnkc/zt4/HgLgw9S4zCSLLBxQgEDMGEekKhsZQGaCGLqNNCyykiNCAe83KmTZhJFGf1ZSEB0JwN4KufVszC0acx/T9RlUGC1aMgNObvC7MmjgY115MTCxLqCUycFNzsIUPvuiYC3eD114NqVbNu8eY1SWMDAaskkBQDjLRBUTtWYfv8qxiu4AiB6dRQhOHCAQQG2Ge5OfhuZQ4LNnFMfKF1sNOkZp1TLFmwWoWjXlTcUkC2bAUJXCBgI/xwmsWu0IBbw5j3wtPDnDBBIu62Ydejlsg83CA4durQAkxnPEIBd9eEC3bsjgAM+b4DGH8iX51yScPru+Vq0Ae1hPmdgAtzXnUZ1NOxWnm8SBCjgcwTSgNpy0jywIIOXNKAAbww0xN2C/A1xl3AIFICcHRM2yFEAAioA31cWBLDhcKCwqAFFLHUo4404bhABACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CILU3ZLGKqNk/iuqcqd81rJw46g8FhEAbFw7K43Ro7T+MwaDoJgYrDeNMlNUyndiCYFKk25DWj2G4Nui8YNs4QzNuCRL0WtysC+BYxb60TVgBFAgIJdjIBeloHEzVrQxMJhJOEgSJ5ik18fWtWlJ8CliALb5lyXlM3D3aSoJMJMwiZBIeCLC6rVguun6IfCwaKUSMLlg68lLAyCcFmpyCtyIUeCQEKCgF2CwXNBAxdItHIyhoLCgTo6AbDbQ3ShJAZCwfp9QTPY++hGwj29uxX3CGLh0GAP3uM7jzgRS5DgYP2GgYE5aBDP4jpALZZ4MBBLQ0X/zFCuTPjoUgCEknOkWQoQ4KTCVV6ERCgZk0BHyWcwwhOpiCbQGsSpMAAokaVNIMC9QWAW70DPX1WUwo0aoUGAQoU2OdzQlKqNruKABtUbAiyQDO4u2lWwleyGHoYmGsAqtmpZK3qpMt3ndm3Sj9y68tX750FZIcCYEaY76auuwJfGNyYbkqVg1piUFC5cFsPnDvPNZzEUU4MlDtfnlFNq+vVeEQbYEBSgOvbWzuErkxaRQLcuHt7YVAZ3xXgwJlS2Nb3wNEdv5HfFk6hdYFsXgIgOHCAQQHYGmxLd019wwMF3NNzf75B/PjcKhZsV6++dw1L0d+Xd0ifPgNLWCmAwJeA33nxnlancbAAA/3RB1ACAg4oIQI9uYccex0k0CB9zzQQ4YQS9pSVdMpxIMCG6j1TAIggKuAJcNgtg2J6p8jHIohRrRXANEkwOCM4AtwIIoZj9IAiAjoEKaSERI6B3oY9PbBkiG01UEB/31TwoZDg3SHAhzFSoKSQTX5WgXY3FlCimRaMKWEBCbKJAVZaBdClnHjmmUIEACH5BAkFAAAALAAAAABAAEAAAAT/EMhJq7046827/2CILWQpnujSrOyCvp7Kzi4cBodBGEpiyTOazeNgEI5IQqASbDZqQ80hSRVMgM4VNHpRUKmGGja75Va+3yVg7CybJQI0FTHJCq+PhL4xDMiTDFd2KxQJAoeICW4gcX9HdHV2UIaIlYovC45HahJsWhMPlaICPi8ImnwVJC1QC6OjizE6cpw/bg2vog8wCbNUtR6huYkeCQEFBQGpawW+DFYiDsPEGwsKvjvAQ67TAg7VU2gFbwCUw7ETXn/QXLjD3xqNfwfk0q+lGgWaBPhcC+aHlmk4pUlbFBnoLBB0xI6cCH2a+jnspCeBwAq9HAWaeEVAgI8f/wVcnAARjYGGDl2BXBkAnkJaHCd4ZLkyVrMkB1A6fECTpc46MwUk5DKzJ8iYIooaNYg03tKjGHCFbArn6UcMOAxoNfCsKc+nP69tHcvUjFKabpqNXfvTjMqeLif0WrsWUsy3IEVeCECXrsSJ//ZkENt3a1uqFggXPjmxgZ64G/gu1vrXBk9kyAJUtiBgMldyAjCLLnCYgtrCpUUkGD16M4UFCAqXRXGMNeYAQ5mtPTD7xAPbo1PLra3sSgAFDBggKOA6HnDRwjU8QJ68OoPeF0I/RxZ9BHXr1Q83eFBm9XbSLwKAB4/gYoPjCBAo0Gz8POQPC9avr7U6vn/57GgHHIF2GSSgH3jjSNBAAf/918MEtbGG2wsCHGhdggAE0GCDBUAh4G25aWCghcklaM2GDTYkTUjNfYAAiV2Vg2KDBMKgnoUI1CDAjP/VCMN367HjAI/+dQfDgushgBKDPCqwC2KhxTffSDvy6CNiGc7YIZaMKEDjSFxu8B5ILYZp5pknRAAAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIglBXMggqiuxeC+jLPOHfLeg9HQYcAYhkPhYQngcAyex8EgOJ+GFIVwxEmVmsNz67wKqrgCVlPgcg0LiRH8QowzZnNA8mW7FO+LIM51Axp2LnMTCw4PCQ5pPAF8W0kSDHYEigAOCZeYCZQqe41OfpVUYIMAmaaaMwueTqQAe1ViEpanmDIzCp46FQ4IogMHVwu0ppshCwaNrRUJAjsUDcOZzisJWnIis9GIHgkBBQUB0wsF1gQMVyDQ2tsb40DvBspKwuvTGAs/8O+xb+uoGgr06UM3T5s9PQL1PXqj7pQtMgn1JcgDgJ60DgEjviM4ZkGDBsX/AGrcSHFGgZFAJpasUOjSQQoJUC5cWVGAgAA4AwgIKeGkRo55FtzMmbMZBgQR5VEcSrQoTwAB9AGjOcFB06tAJTQYupPqBKZXcWb1mgFsWKVky54lmkGo2LSu1r694OOA3QPnyFqVC1TB3b8H0L4xS7RrBXKA/47F4hbry2qJ/+LxKhSs4QoBIgNWSflQgpcTEGu2uxhu6NF3S6+gBxpDZtQHOI954O0bONllYYMac9O2b9UAREcG/oG27+O4LyxAoFnwitrHbQd4SmEc4Lx5HkSPTrzbt3CEAihAwABBgeQdBGw/ThyDdgbw46MQoX697fYWFiiIzx/+WEPFkGDfozf4YdZffwgUs4A3CjQYAGcLDlhAaxwsd2B/6JDQ4IYKFODFgAXCdGF/pIzD4YmcQXfcdDMIMCJ//Ih3IocFUNLbb9R1kMCL8Q2i34wnorOVTQIQoQR5PEqRAJBBkuXDiwooIgCTHDo3RgkjXuEAlRuGKEIDWPI3HwUFcKmAkWmpN54CATz0FZdWmkaBjDPWKOcHalaZ450WOMAUenwGKugKEQAAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIglBXIggqiuBTG8L+OsdIfA+GA0dRgwB8OhMKsEcjlEz+NAEJ5QQ4piQOamS80Byn1iBdZcIatpdbmHheQYhinJGMO5G1i33fCLYN59N1x3dRMLDQ0ODWo9AXxcbwAMdwSJAA0PlpcOkyp7jE+ODoBWgpSXpQ9FKwtynaMAAlU5BGMSlaalPDRmfDsVTYAEB1gAtraaIQtbfK0VCQK4g8SmxiEJyVwGyx0L0bceCQEFBQHPCwHJBigqtdwPzxkLBUEG8wfZPdvs7RsLCPP+/rPgOMjHocC/g1LyLBgYbVqFVwj/MchDiaEpdxgMRvyXgOLCUpn/bGz8JwzOgpMOM470V5IiiAAr53V0WWFhggcpASSI6YgmgAXNBAgVmlLjxpYKhyoVinFCv4j28iydmtKcRKR5HExdOvNCAwEBAgjICSfo1qE+N51VmlbEWrYYvobFStHsWgwBTBzYm66t1rddKcTbS3hvVDhvx1owV7gwg8AuF6xtmgBI48IBfQKleoHx5cKQadrUl/FzY7ptLww2vRc1jW0JmmbwzDp0D61hc9u2IIA137q5g4vtsPqz6xAOhAvfTYGf6cMrlCsnK6GcZb7HkUtf7i04OXAIwgdgruHb9tzZMzgoEb59XxDmzw9Pxd59e7qGjMU/n76z/f/GNABOhzjidFWOfOOk8t9/wnxD4INfyNefBQksaN8oAj6oYVdgbUedBgJY6N4oA2r44CQdBqcYDRWKKF51JpoozFdDoVKDi+FNQUKMEKaWl4gFJLIjj+FAR0Z9/3W1HpHhTLiCgAuWVCKPNrYFFoEJPsSkkal1xmMAH3bJm4lZihmCXGGRZ+aabJIRAQAh+QQJBQAAACwAAAAAQABAAAAE/xDISau9OOvNu/9giCUFwyiCqK4F4b6Ms84d8t6E0dBhwByGQ+FhCeBwCJ6ngTA4n4YUxXDESZUaBnR7TVRxBaymsN0eFhLj96UQZ8rlgESwZrsvAvi2DWjUXXIUC4ODSnl6T0kSDHUGaBKEkY8zh4gGfAAOVF+BAJKSNAuWTp0AeVWdn580ZJY7FA42LwdXnqqRoUB6pRUJAq8Tt6szCbpbvB3CoB0JAQUFAZMLAcYICSrKuBsLBQfe38hK2YUaCwjf6Afhodkc3enoteLtGgLw6Qx3trcc1Pfo1/Sp6qDgXzx9wSZ1eGeQFsIV/hoGfBisgQMHCns1PKCIogRfAv9CCkiQcQLDe/IEghQpsqSEgvfWuVnJMiRJDBG9MUipr0HNnxMtLBAQIIAAl/po/hzpUYTSpU1DPP2ZwWfRoB6nssQ6IQACEyYQ8Lzjc6lIrgBKgF07dqbZkSV9rJ2L1s0CrSUfzN2LKWvNm0X27iUSdYFFjBnUCgbbNqoFxYt3Plzg4AGwfpHB1p1htahRwhsSZD6R1LPpAJspQN7bWISD06dTQ1KwWOYKorBNIxUkF6zYnrlje3jg+VcwAQUUKIAme0Rw0603OEiuvDoKp8+Lz+BmvftmixmJZ0c9I0D37gUyDnX2LADoaeMvg1hw/nwt4s/yP+uSPXqGBPV1lwpue/rlNxFusB1FSYDWdUJgge1NgmBxuzHDYHWBcANhgUE1sJIMSlyonBQkbKiffzSYx2B6H5l4omPU1TfRdC7u59g05xWA1YMbgugYUfkFIB8AJZqIomMTILdhNEiGoKR+TDYZQmcCgCbllVgiFAEAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIglBcIogqiuBeG+iLPOHfLexNHQYYAcB0ZBVgngcAiep4EwOJ+HFMVwxEmVGsZz67wmqrgCVlPgcg8LiRH8UowzZnNAImC33xdBnOsGNOwucxMJCgwHCFczentPSRI2bAZpjwOVlgxEK4uMBn0ADlRgVweWpQMGOysLnE6CdKE4rgWmpgw0ZYw6FQ5NLwxXf7SmiSELB4yuFgkCqRMBwqZiMwlaciKz0JaOHA4BBQUBkwALAdWHCSrY2QPbGQsFQPG/eAAC65XS7j/x/MlYBusINMMAj59BYjzqZPNnQYDBh+2wtBDmKUOAhw/R4XFYygDDCwX/McZDiKVbAJIERfJDSa/DRZVAMrWcsGBBgwbiLDiAeWjmrgRAgTrISSEkRpZYFgRdCpToBAUiP+JxwJSpUzWG4iHySbMqU5kVFggIcPIqPapel3IVgTYt0LUh2rp1J6CuRrhy02LwgaAvAhRwlbpNAFZCCb+IkZYc7JQvYsR3Zwr26pTX48f5uOYdesHxZb+FW9q8aRaA589b4Xo4jLqvYlUOOHs4/TkylgZ1cwsIrax134pYlunObXuv79cgcA/XXdzCAgWopSpaPrw0TdrIk1Mf3vyCg7Enm4n9pgAc7w3Ct9ul0U2B+/cFslNIr757h3fv87tn2UD2hO/qrbdCkQD66VcAUWKRpWAmYgUogHUa4FdgfomYpKCCXjg4zYT6uULOhSDeFSCEGgjAYX6ugAfiheLQlxuJGhByonuCfLjihZE1IFwCA81QwIyAAZDAjSDKN+CMB0owJJEYqkYgh3c1wGSTcElZYAG2TUnWefSM9Q04PQo5pZGq1cMkjGVSoCKGaKZJgXJ1cenmnHTyEAEAIfkECQUAAAAsAAAAAEAAQAAABP8QyEmrvTjrzbv/YIglBYIUgqiuhUG8L+KsdKfAOHE0dSgghwOjMKsEcjlEz9NQGJ7QQ4pyQOYSSw4CyjVIJwlrrpDVtLrcw0JyFMMU5cwB3Q1IBG4YOW4R0Lt7DS55dmAlBwpTNX5/UHASCHkGa5AEA5eXDEUrjI0GewAOg1aKB5inAwY8KwtznoV3VTkGsAWoqEo0Z387FQ5OLwYMig2Wt5gEWKwMjYoWCQmrEwHHqKAqCVtdB7AfttWYuRwPAeUC0gsBDHOIyiHf4AOPGgsF60FCzlkC8ZfdFwsU4BvIjQ8AA/EISMNQgCBBfT3wgPv3zCFBcWWO3CIwL0MAiwT/3ZURUAUTrQ4NQeKDmCWBOW8qVxqk8THmgQczAS7YmeHBPZAdcwJY0MCBUQcNKFmoaXGY0AlFjx5NyhAkRYNRpU71+PMAApZ8Fmgdq9RCAwHmygoVO1bqwqdM2mqFGyKr3E0WFiQQIEDkU7Z3305TYMJEAb8zActVy6aw46907WqlauTxY8RY21Km4MDy42tr7W6mEMDzY7x/dzKeZtoxWLoXSrc28boGUQerMciejZPPWb7AUY+YfcLgA+DI+3bY7bm2iN/Jg3OoZ/rqoujJc1NI9zgRVuzJe3NwgDbAuQkL0BZYH0B4B/LggWP+0CDA+vvrnV84Hp/v/A7p4Cfgmn9EqQVff/9xIICADKqVXjnmbJJefwJot0E9DArojAMQdhiAO/yBl+AGJGSIHyzpeNihO3uBZyGJJp44QXkqQqhUi8gl8OIGD8R4XyEp1gihSHpBE00WPuYnATlCQqhfRD4GQIlLTb5El30mulNflR/CFiCDfnEZgGBCucTeeRVQKeSTsFFAo4o7tpmmihXKKYJe0tmp555CRQAAOw==" );\
	height: 100%;\
}\
.gl_control {\
	position: absolute;\
	bottom: 0;\
	width: 100%;\
	height: 27px;\
	background: rgba( 27, 27, 27, .9 );\
}\
.gl_control a {\
	display: block;\
	width: 94px;\
	overflow: hidden;\
	opacity: .6;\
}\
.gl_control a:hover {\
	opacity: 1;\
}\
.gl_control img {\
	margin-left: -420px;\
	max-width: none;\
}\
.gl_volume {\
	background: #757575;\
	height: 4px;\
	width: 50px;\
	margin: 12px 3px 0;\
}\
.gl_volume > div {\
	background: #b91f1f;\
	height: 4px;\
	width: 25px;\
	max-width: 100%;\
}\
.gl_volume span {\
	display: block;\
	background: #fff;\
	height: 14px;\
	width: 6px;\
	float: right;\
	margin-top: -4px;\
	margin-right: -3px;\
	cursor: ew-resize;\
}\
.gl_timer {\
	font-size: 12px;\
	color: #999;\
	padding-left: 10px;\
}\
.gl_timer > span {\
	line-height: 27px;\
}\
.gl_timer > :first-child {\
	color: #fff;\
}\
.gl_seekable {\
	background: #444;\
	height: 8px;\
	width: 0;\
}\
.gl_progress {\
	opacity: .8;\
	background: #777;\
	height: 8px;\
	position: absolute;\
	bottom: 27px;\
	width: 100%;\
}\
.gl_progress:hover {\
	opacity: 1;\
}\
.gl_seekable + div {\
	background: #cc181e;\
	height: 8px;\
	width: 16px;\
	min-width: 16px;\
	max-width: 100%;\
	border-radius: 0 4px 4px 0;\
	position: absolute;\
	top:0;\
}\
.gl_progress span {\
	display: block;\
	background: #cc181e;\
	border: 5px solid #eaeaea;\
	border-radius: 50%;\
	height: 6px;\
	width: 6px;\
	float: right;\
	margin-top: -4px;\
	cursor: pointer;\
}\
.gl_text {\
	background: rgba( 27, 27, 27, .7 );\
	position: absolute;\
	top: 27px;\
	bottom: 0;\
	width: 100%;\
	display: none;\
}\
.gl_text .gl_icon {\
	opacity: .8;\
}\
.gl_text .gl_icon:hover {\
	opacity: 1;\
}\
.gl_text .gl_icon + div {\
	padding-top: 10px;\
	padding-bottom: 15px;\
}\
.gl_text > div {\
	overflow: auto;\
	max-height: 100%;\
	padding-left: 10px;\
	display: none;\
}\
.gl_none {\
	display: none;\
}\
</style>';var mainJS = '<script>!' + function() {

(function() {

	var audio = new Audio, moveTarget, offset, duration = 0, progress, time, length = 0, n = 0,
		objects/*for update*/;

	function loaded() {
		if ( length++ !== n ) return;

		setTimeout( function() {
			$( ".gl_loading, .gl_img" ).detach();
		}, 800 );

		if ( "{audio}" ) {

			progress = $( ".gl_progress > div:last" );

			$( audio ).on( "ended pause", function() {
				jThree.MMD && jThree.MMD.pause();
				$( ".gl_pause:first" ).show().next().hide();
			} )
			.on( "play", function() {
				if ( audio.currentTime === audio.duration ) audio.currentTime = 0;
				jThree.MMD && jThree.MMD.play();
			} )
			.on( "timeupdate", function() {
				var current = audio.currentTime;
				"{delay}";
				progress.width( current / duration * ( progress.parent().width() - 16 ) + 16 );
				time.text( ( current - current % 60 ) / 60 + ":" + ( "00" + Math.floor( current % 60 ) ).slice( -2 ) );
			} );

			$( ".gl_pause" ).click( function() {
				audio[ $( ".gl_pause" ).toggle().index( this ) ? "pause" : "play" ]();
			} ).first().click();

		}

		"{onLoad}";
		"{onUpdate}";

	}

	jThree._Player = loaded;

	if ( "{audio}" ) {
		audio.oncanplaythrough = loaded;
		audio.volume = .5;
		audio.loop = false;
		
		$( audio ).on( "loadedmetadata", function() {
			duration = audio.duration;
			time = $( ".gl_timer > span:first" );
			time.next().text( "/" + ( duration - duration % 60 ) / 60 + ":" + ( "00" + Math.floor( duration % 60 ) ).slice( -2 ) );
		} ).on( "progress", function() {
			if ( audio.seekable.length == 1) $( audio ).unbind( "progress" );
			$( ".gl_seekable" ).width( audio.seekable.length * 100 + "%" );
		} );
		
		function mousemove( e ) {
			moveTarget.width( e.pageX - offset );
			if ( offset ) {
				audio.volume = moveTarget.width() / 50;
			} else {
				audio.currentTime = duration * ( moveTarget.width() -16 ) / ( moveTarget.parent().width() - 16 );
			}
			return false;
		}
	} else {
		length++;
	}


jQuery( function( $ ) {

	var frame = $( "body" );
	!jThree.MMD && $( ".gl_credits > div:last" ).hide();

	frame.find( ".gl_screen" ).click( function() {
		if ( misc.fullMode ) {
			misc.exitFullscreen();
		} else {
			$( this ).attr( "title", "通常サイズに戻す" ).css( "background-position", "-60px 0" );
			misc.requestFullscreen( frame[ 0 ] );
		}
	} );

	misc.exitFn = function() {
		frame.find( ".gl_screen" ).attr( "title", "全画面表示" ).css( "background-position", "-30px 0" );
	};

	function showText( type ) {
		if ( typeof type === "string" ) {
			frame.find( ".gl_text" ).show().children( "div" ).hide()
			.filter( ".gl_" + type ).show();
		} else {
			frame.find( ".gl_text" ).hide();
		}
	}


	frame.find( ".gl_text .gl_icon" ).click( showText );

	frame.find( ".gl_credits-button" ).click( function() {
		showText( "credits" );
	} );
	frame.find( ".gl_tutorial-button" ).click( function() {
		showText( "tutorial" );
	} );
	frame.find( ".gl_caution-button" ).click( function() {
		showText( "caution" );
	} );

	frame.find( ".gl_mute" ).click( function() {
		audio.muted = !frame.find( ".gl_mute" ).toggle().index( this );
	} );

	frame.find( ".gl_handle" ).mousedown( function() {
		moveTarget = $( this ).parent();
		offset = moveTarget.offset().left;
		$( document ).mousemove( mousemove );
	} );

	$( document ).mouseup( function() {
		$( document ).unbind( "mousemove", mousemove );
	} );

	frame.find( ".gl_play svg" ).show();
	frame.find( ".gl_play" ).click( function() {
		frame.find( ".gl_pause:first" ).click();
	} );

	frame.find( ".gl_pause:first" ).one( "click", function() {
		frame.find( ".gl_play" ).detach();
		frame.find( ".gl_reload, .gl_loading, .gl_camera, .gl_oculus, .gl_fps" ).show();
		audio.src = "{audio}";
		jThree.goml( "{goml}", function( j3, loadLength ) {

			var stats = $( j3.Stats() ),
				oculus = j3.Oculus(),
				ball = j3.Trackball().stop().setup( "{ball}" ),
				fly = j3.FlyView().stop().setup( "{fly}" ),
				mode = "{camera}",
				camera = mode % 3 ? fly : ball;

			objects = {
				audio: audio,
				Stats: stats[ 0 ],
				Oculus: oculus,
				Trackball: ball,
				FlyView: fly,
				MMD: jThree.MMD
			};

			$( ".gl_camera" ).css( "background-position", -30 + ( mode % 3 * 3 ) + "0px 0" );

			stats.css( { display: "none", top: 27 } );
			frame.find( ".gl_fps" ).click( function() {
				stats.toggle();
			} );

			frame.find( ".gl_oculus" ).click( function() {
				oculus[ oculus.playing ? "stop" : "start" ]();
			} );

			frame.find( ".gl_camera" ).click( function() {
				$( this ).css( "background-position", -30 + ( --mode % 3 * 3 ) + "0px 0" );

				camera.stop();

				if ( mode % 3 ) {
					camera = fly;
					fly.mousemove( mode % 3 === -1 ).drag( mode % 3 === -1 );
				} else {
					camera = ball;
				}

			} );

			$( "canvas" ).on( "mousedown mousewheel DOMMouseScroll", function() {
				jThree.MMD && ( jThree.MMD.cameraMotion = false );
				camera.start();
			} );

			$( window ).keydown( function( e ) {
				jThree.MMD && ( jThree.MMD.cameraMotion = e.keyCode === 32 );
				camera[ e.keyCode === 32 ? "stop" : "start" ]();
				return false;
			} );

			n = loadLength;
			
		}, true );
	} );

} );

})();

}.toString() + '()</script>';
var script = "",
	baseJS = "";


Player.setScript = function( hush ) {

	hush.other && hush.other.forEach( function( url ) {
		script += '<script src="' + url + '"></script>';
	} );

	if ( !baseJS ) {

		[ "jQuery", "jThree", "ammo", "MMD" ].forEach( function( key ) {
			hush[ key ] && ( baseJS += '<script src="' + hush[ key ] + '"></script>' );
		} );

		baseJS += '<script>!' + function() {
/**
 * jThree.Stats.js v1.2 - http://www.jthree.co/
 * Includes Stats.js
 * http://github.com/mrdoob/stats.js
 */

( function() {

	var l=Date.now(),
		m=l,
		g=
		o=
		h=
		q=
		r=
		s=0,
		n=
		p=Infinity,
		z=document,
		f,
		a,
		i,
		c,
		j,
		d,
		k,
		e,
		b,
		y,
		x;

	z.c=z.createElement;
	f=z.c("div");
	f.id="stats";

	f.addEventListener("mousedown",function(b){
		b.preventDefault();
		if(s=1-s){
			a.style.display="none";
			d.style.display="block";
		}else{
			a.style.display="block";
			d.style.display="none";
		}
	},!1);

	

	f.style.cssText="width:80px;opacity:0.9;cursor:pointer";

	a=z.c("div");

	a.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#002";
	f.appendChild(a);

	i=z.c("div");

	i.style.cssText="color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
	i.innerHTML="FPS";
	a.appendChild(i);

	c=z.c("div");

	c.style.cssText="position:relative;width:74px;height:30px;background-color:#0ff";

	for(a.appendChild(c);74>c.children.length;){
		j=z.c("span");
		j.style.cssText="width:1px;height:30px;float:left;background-color:#113";
		c.appendChild(j)
	}

	d=z.c("div");

	d.style.cssText="padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";
	f.appendChild(d);

	k=z.c("div");

	k.style.cssText="color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
	k.innerHTML="MS";
	d.appendChild(k);

	e=z.c("div");

	e.style.cssText="position:relative;width:74px;height:30px;background-color:#0f0";

	for(d.appendChild(e);74>e.children.length;)
		j=z.c("span"),
		j.style.cssText="width:1px;height:30px;float:left;background-color:#131",
		e.appendChild(j);

	f.style.position = "absolute";
	f.style.top = f.style.left = "0px";

	x=function(){
		b=Date.now();
		g=b-l;
		n=Math.min(n,g);
		o=Math.min(Math.max(o,g),999);
		k.textContent=g+" MS ("+n+"-"+o+")";
		y=Math.min(30,30-30*(g/200));
		e.appendChild(e.firstChild).style.height=y+"px";
		r++;b>m+1E3&&(h=Math.round(1E3*r/(b-m)),
		p=Math.min(p,h),
		q=Math.max(q,h),i.textContent=h+" FPS ("+p+"-"+q+")",
		y=Math.min(30,30-30*(h/100)),
		c.appendChild(c.firstChild).style.height=y+"px",m=b,r=0);
		l = b;
	};

	jThree.Stats = function( selector ) {

		var r = jThree( isFinite( selector ) ? "rdr:eq(" + selector + ")" : selector || "rdr" ),
			_f = f,
			u = jThree.getCanvas( r[ 0 ] ).parentNode;

		f = null;

		if ( document.defaultView.getComputedStyle( u, null ).position === "static" )
			u.style.position = "relative";

		u.appendChild( _f );

		r.eq( 0 ).update( x );

		return _f;

	};

} )();
/**
 * jThree.Trackball.js v1.3 - http://www.jthree.co/
 * Includes TrackballControls.js
 * Eberhard Graether / http://egraether.com/
 * Mark Lundin 		 / http://mark-lundin.com
 */

THREE.TrackballControls = function ( object, domElement ) {

	var _this = this,
		STATE = { NONE: -1, ROTATE: 0, ZOOM: 1, PAN: 2 };

	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;

	// API

	this.enabled = true;

	this.screen = { left: 0, top: 0, width: 0, height: 0 };

	this.rotateSpeed = 1.0;
	this.zoomSpeed = 1.2;
	this.panSpeed = 0.3;

	this.noRotate = 
	this.noZoom = 
	this.noPan = 
	this.noRoll = false;

	this.damping = 0.2;

	this.minDistance = 0;
	this.maxDistance = Infinity;

	// internals

	this.target = object._lookAt;

	this.lastPosition = new THREE.Vector3;
	this._eye = new THREE.Vector3;

	var _state = STATE.NONE,
		_prevState = STATE.NONE,

		_rotateStart = new THREE.Vector3,
		_rotateEnd = new THREE.Vector3,

		_zoomStart = new THREE.Vector2,
		_zoomEnd = new THREE.Vector2,

		_panStart = new THREE.Vector2,
		_panEnd = new THREE.Vector2;

	// for reset

	this.target0 = this.target.clone();
	this.position0 = this.object.position.clone();
	this.up0 = this.object.up.clone();

	// for #getMouseProjectionOnBall

	this.objectUp = new THREE.Vector3;

	// methods

	this.rotateCamera = (function(){

		var axis = new THREE.Vector3,
			quaternion = new THREE.Quaternion;


		return function () {

			var angle = Math.acos( _rotateStart.dot( _rotateEnd ) / _rotateStart.length() / _rotateEnd.length() );

			if ( angle ) {

				axis.crossVectors( _rotateStart, _rotateEnd ).normalize();

				angle *= _this.rotateSpeed;

				quaternion.setFromAxisAngle( axis, -angle );

				this._eye.applyQuaternion( quaternion );
				_this.object.up.applyQuaternion( quaternion );

				_rotateEnd.applyQuaternion( quaternion );

				quaternion.setFromAxisAngle( axis, angle * ( _this.damping - 1.0 ) );
				_rotateStart.applyQuaternion( quaternion );

			}
		};

	}());

	this.zoomCamera = function () {

		var factor = 1.0 + ( _zoomEnd.y - _zoomStart.y ) * this.zoomSpeed;

		if ( factor !== 1.0 && factor > 0.0 ) {

			this._eye.multiplyScalar( factor );

			_zoomStart.y += ( _zoomEnd.y - _zoomStart.y ) * this.damping;

		}

	};

	this.panCamera = (function(){

		var mouseChange = new THREE.Vector2,
			objectUp = new THREE.Vector3,
			pan = new THREE.Vector3;

		return function () {

			mouseChange.copy( _panEnd ).sub( _panStart );

			if ( mouseChange.lengthSq() ) {

				mouseChange.multiplyScalar( this._eye.length() * _this.panSpeed );

				pan.copy( this._eye ).cross( _this.object.up ).setLength( mouseChange.x );
				pan.add( objectUp.copy( _this.object.up ).setLength( mouseChange.y ) );

				_this.object.position.add( pan );
				_this.target.add( pan );

				_panStart.add( mouseChange.subVectors( _panEnd, _panStart ).multiplyScalar( _this.damping ) );

			}
		};

	}());

	this.reset = function () {

		_state = _prevState = STATE.NONE;

		this.object.position.copy( this.position0 );
		this.object.up.copy( this.up0 );
		this.object.lookAt( this.target0 );

		this._eye.subVectors( this.object.position, this.target );

		this.lastPosition.copy( this.object.position );

		return this;

	};

	// listeners

	function mousedown( event ) {

		if ( ! _this.enabled ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.NONE ) {

			_state = event.button;

		}

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_rotateStart = _this.getMouseProjectionOnBall( event.pageX, event.pageY, _rotateStart );
			_rotateEnd.copy(_rotateStart);

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomStart = _this.getMouseOnScreen( event.pageX, event.pageY, _zoomStart );
			_zoomEnd.copy(_zoomStart);

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panStart = _this.getMouseOnScreen( event.pageX, event.pageY, _panStart);
			_panEnd.copy(_panStart);

		}

		document.addEventListener( "mousemove", mousemove, false );
		document.addEventListener( "mouseup", mouseup, false );

	}

	function mousemove( event ) {

		if ( ! _this.enabled ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _state === STATE.ROTATE && !_this.noRotate ) {

			_rotateEnd = _this.getMouseProjectionOnBall( event.pageX, event.pageY, _rotateEnd );

		} else if ( _state === STATE.ZOOM && !_this.noZoom ) {

			_zoomEnd = _this.getMouseOnScreen( event.pageX, event.pageY, _zoomEnd );

		} else if ( _state === STATE.PAN && !_this.noPan ) {

			_panEnd = _this.getMouseOnScreen( event.pageX, event.pageY, _panEnd );

		}

	}

	function mouseup( event ) {

		if ( ! _this.enabled ) return;

		event.preventDefault();
		event.stopPropagation();

		_state = STATE.NONE;

		document.removeEventListener( "mousemove", mousemove );
		document.removeEventListener( "mouseup", mouseup );

	}

	function mousewheel( event ) {

		if ( ! _this.enabled ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta / 40;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail / 3;

		}

		_zoomStart.y += delta * 0.01;

	}

	this.domElement.addEventListener( "contextmenu", function ( event ) { event.preventDefault(); }, false );

	this.domElement.addEventListener( "mousedown", mousedown, false );

	this.domElement.addEventListener( "mousewheel", mousewheel, false );
	this.domElement.addEventListener( "DOMMouseScroll", mousewheel, false ); // firefox

	this.handleResize();

};

THREE.TrackballControls.prototype = {

	constructor: THREE.TrackballControls,

	stop: function() {
		this.enabled = false;
		return this;
	},

	start: function() {
		this.enabled = true;
		return this;
	},

	setup: function( param ) {
		jThree.extend( this, param );
		return this;
	},

	handleResize: function () {

		if ( this.domElement === document ) {

			this.screen.left = 
			this.screen.top = 0;
			this.screen.width = window.innerWidth;
			this.screen.height = window.innerHeight;

		} else {

			jThree.extend( this.screen, this.domElement.getBoundingClientRect() );
			//getBoundingClientRect() is readOnly
			// adjustments come from similar code in the jquery offset() function
			var d = this.domElement.ownerDocument.documentElement;
			this.screen.left += window.pageXOffset - d.clientLeft;
			this.screen.top += window.pageYOffset - d.clientTop;

		}

	},

	getMouseOnScreen: function ( pageX, pageY, optionalTarget ) {

		return ( optionalTarget || new THREE.Vector2 ).set(
			( pageX - this.screen.left ) / this.screen.width,
			( pageY - this.screen.top ) / this.screen.height
		);

	},

	getMouseProjectionOnBall: function ( pageX, pageY, projection ) {

		var mouseOnBall = new THREE.Vector3(
			( pageX - this.screen.width * 0.5 - this.screen.left ) / (this.screen.width*.5),
			( this.screen.height * 0.5 + this.screen.top - pageY ) / (this.screen.height*.5),
			0.0
		),
		length = mouseOnBall.length();

		if ( this.noRoll ) {

			if ( length < Math.SQRT1_2 ) {

				mouseOnBall.z = Math.sqrt( 1.0 - length*length );

			} else {

				mouseOnBall.z = .5 / length;

			}

		} else if ( length > 1.0 ) {

			mouseOnBall.normalize();

		} else {

			mouseOnBall.z = Math.sqrt( 1.0 - length * length );

		}

		this._eye.copy( this.object.position ).sub( this.target );

		projection.copy( this.object.up ).setLength( mouseOnBall.y );
		projection.add( this.objectUp.copy( this.object.up ).cross( this._eye ).setLength( mouseOnBall.x ) );
		projection.add( this._eye.setLength( mouseOnBall.z ) );

		return projection;

	},

	checkDistances: function () {

		if ( !this.noZoom || !this.noPan ) {

			if ( this._eye.lengthSq() > this.maxDistance * this.maxDistance ) {

				this.object.position.addVectors( this.target, this._eye.setLength( this.maxDistance ) );

			}

			if ( this._eye.lengthSq() < this.minDistance * this.minDistance ) {

				this.object.position.addVectors( this.target, this._eye.setLength( this.minDistance ) );

			}

		}

	},

	update: function () {

		if ( ! this.enabled ) return;

		this._eye.subVectors( this.object.position, this.target );

		if ( !this.noRotate ) {

			this.rotateCamera();

		}

		if ( !this.noZoom ) {

			this.zoomCamera();

		}

		if ( !this.noPan ) {

			this.panCamera();

		}

		this.object.position.addVectors( this.target, this._eye );

		this.checkDistances();

		this.object.lookAt( this.target );

		if ( this.lastPosition.distanceToSquared( this.object.position ) > 0 ) {

			this.lastPosition.copy( this.object.position );

		}

	}

};

jThree.Trackball = function( selector ) {

	var balls = [];

	jThree( isFinite( selector ) ? "rdr:eq(" + selector + ")" : selector || "rdr" ).each( function() {

		var ball = new THREE.TrackballControls( jThree.three( jThree.getCamera( this ) ), jThree.getCanvas( this ) );

		jThree.update( this, function() {
			ball.callback && ball.callback();
			ball.update();
		} );

		jThree( this ).resize( function() {
			ball.handleResize();
		} ).on( "attrChange", function( e ) {

			if ( e.attrName !== "camera" ) return;
			ball.object = jThree.three( jThree.getCamera( this ) );
			ball.target = ball.object._lookAt;

		} );

		balls.push( ball );

	} );

	return balls.length > 1 ? balls : balls[ 0 ];

};/**
 * jThree.FlyView.js v1.3 - http://www.jthree.co/
 * Includes FirstPersonControls.js
 * mrdoob / http://mrdoob.com/
 * alteredq / http://alteredqualia.com/
 * paulirish / http://paulirish.com/
 */

THREE.FirstPersonControls = function ( object, domElement ) {

	var _this = this;

	this.object = object;
	this.target = new THREE.Vector3;

	this.domElement = ( domElement !== undefined ) ? domElement : document;

	this.movementSpeed =
	this.acceleration = 10;
	this.lookSpeed = 0.1;

	this.lookVertical = true;
	this.autoForward = false;

	this.activeLook = true;

	this.heightSpeed = false;
	this.heightCoef = 1.0;
	this.heightMin = 0.0;
	this.heightMax = 1.0;

	this.constrainVertical = false;
	this.verticalMin = 0;
	this.verticalMax = Math.PI;

	this.autoSpeedFactor =

	this.mouseX =
	this.mouseY =

	this.lat =
	this.lon =
	this.phi =
	this.theta = 0;

	this.moveForward =
	this.moveBackward =
	this.moveLeft =
	this.moveRight =
	this.freeze = false;

	this.viewHalfX =
	this.viewHalfY = 0;

	this.position0 = object.position.clone();
	this.lookAt0 = object._lookAt.clone();

	//

	function onMouseDown( event ) {

		if ( _this.freeze ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _this.activeLook && event.button !== 1  ) {

			_this[ event.button ? "moveBackward" : "moveForward" ] = true;

		}

	}

	function onMouseUp( event ) {

		if ( _this.freeze ) return;

		event.preventDefault();
		event.stopPropagation();

		if ( _this.activeLook && event.button !== 1 ) {

			_this[ event.button ? "moveBackward" : "moveForward" ] = false;

		}

	}

	function onMouseMove( event ) {

		if ( _this.freeze ) return;

		if ( _this.domElement === document ) {

			_this.mouseX = event.pageX - _this.viewHalfX;
			_this.mouseY = event.pageY - _this.viewHalfY;

		} else {

			_this.mouseX = event.pageX - _this.domElement.offsetLeft - _this.viewHalfX;
			_this.mouseY = event.pageY - _this.domElement.offsetTop - _this.viewHalfY;

		}

	}

	function mousewheel( event ) {

		if ( _this.freeze ) return;

		event.preventDefault();
		event.stopPropagation();

		var delta = 0;

		if ( event.wheelDelta ) { // WebKit / Opera / Explorer 9

			delta = event.wheelDelta;

		} else if ( event.detail ) { // Firefox

			delta = - event.detail;

		}

		if ( delta > 0 ) {
			_this.movementSpeed += _this.acceleration;
		} else if ( _this.movementSpeed > _this.acceleration ) {
			_this.movementSpeed -= _this.acceleration;
		} else {
			_this.movementSpeed = 0;
		}

	}

	function onKeyDown( event ) {

		if ( _this.freeze ) return;

		switch ( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ _this.moveForward = true; break;

			case 37: /*left*/
			case 65: /*A*/ _this.moveLeft = true; break;

			case 40: /*down*/
			case 83: /*S*/ _this.moveBackward = true; break;

			case 39: /*right*/
			case 68: /*D*/ _this.moveRight = true; break;

			case 82: /*R*/ _this.moveUp = true; break;
			case 70: /*F*/ _this.moveDown = true; break;

			case 81: /*Q*/ _this.freeze = !_this.freeze; break;

		}

	}

	function onKeyUp( event ) {

		if ( _this.freeze ) return;

		switch( event.keyCode ) {

			case 38: /*up*/
			case 87: /*W*/ _this.moveForward = false; break;

			case 37: /*left*/
			case 65: /*A*/ _this.moveLeft = false; break;

			case 40: /*down*/
			case 83: /*S*/ _this.moveBackward = false; break;

			case 39: /*right*/
			case 68: /*D*/ _this.moveRight = false; break;

			case 82: /*R*/ _this.moveUp = false; break;
			case 70: /*F*/ _this.moveDown = false; break;

		}

	}

	this.mousewheel = function( bool ) {

		if ( bool ) {
			this.domElement.addEventListener( "mousewheel", mousewheel, false );
			this.domElement.addEventListener( "DOMMouseScroll", mousewheel, false ); // firefox
		} else {
			this.domElement.removeEventListener( "mousewheel", mousewheel );
			this.domElement.removeEventListener( "DOMMouseScroll", mousewheel ); // firefox
		}

		return this;

	};

	this.drag = function( bool ) {

		if ( bool ) {
			this.domElement.addEventListener( "mousedown", onMouseDown, false );
			this.domElement.addEventListener( "mouseup", onMouseUp, false );
		} else {
			this.domElement.removeEventListener( "mousedown", onMouseDown );
			this.domElement.removeEventListener( "mouseup", onMouseUp );
		}

		return this;

	};

	this.mousemove = function( bool ) {

		if ( bool ) {
			this.domElement.addEventListener( "mousemove", onMouseMove, false );
		} else {
			this.domElement.removeEventListener( "mousemove", onMouseMove );
		}

		return this;

	};

	this.mousewheel( true ).mousemove( true ).drag( true );

	this.domElement.addEventListener( "contextmenu", function ( e ) { e.preventDefault(); }, false );
	window.addEventListener( "keydown", onKeyDown, false );
	window.addEventListener( "keyup", onKeyUp, false );

	this.handleResize();
	this.eyeSet();

};

THREE.FirstPersonControls.prototype = {

	constructor: THREE.FirstPersonControls,

	stop: function() {
		this.freeze = true;
		this.moveForward =
		this.moveLeft =
		this.moveBackward =
		this.moveRight =
		this.moveUp =
		this.moveDown = false;
		return this;
	},

	start: function() {
		this.freeze = false;
		this.eyeSet();
		return this;
	},

	setup: function( param ) {
		jThree.extend( this, param );
		return this;
	},

	reset: function() {

		this.moveForward =
		this.moveLeft =
		this.moveBackward =
		this.moveRight =
		this.moveUp =
		this.moveDown = false;

		this.object.position.copy( this.position0 );
		this.object.lookAt( this.lookAt0 );

		this.eyeSet();

		return this;
	},

	eyeSet: function() {

		var position = this.object.position,
			lookAt = this.object._lookAt,
			tmp = Math.pow( lookAt.z - position.z, 2 ) + Math.pow( lookAt.x - position.x, 2 );

		this.lon = THREE.Math.radToDeg( Math.atan2( lookAt.z - position.z, lookAt.x - position.x ) );
		this.lat = ( lookAt.y - position.y < 0 ? -1 : 1 ) * THREE.Math.radToDeg( Math.acos( Math.sqrt( tmp ) / Math.sqrt( tmp + Math.pow( lookAt.y - position.y, 2 ) ) ) ) || 0;

		return this;
	},

	handleResize: function () {

		if ( this.domElement === document ) {

			this.viewHalfX = window.innerWidth / 2;
			this.viewHalfY = window.innerHeight / 2;

		} else {

			this.viewHalfX = this.domElement.offsetWidth / 2;
			this.viewHalfY = this.domElement.offsetHeight / 2;

		}

	},

	update: function( delta ) {

		if ( this.freeze ) return;

		if ( this.heightSpeed ) {

			this.autoSpeedFactor = delta * ( ( THREE.Math.clamp( this.object.position.y, this.heightMin, this.heightMax ) - this.heightMin ) * this.heightCoef );

		} else {

			this.autoSpeedFactor = 0.0;

		}

		var actualMoveSpeed = delta * this.movementSpeed;

		if ( this.moveForward || ( this.autoForward && !this.moveBackward ) ) this.object.translateZ( - ( actualMoveSpeed + this.autoSpeedFactor ) );
		if ( this.moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this.moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this.moveRight ) this.object.translateX( actualMoveSpeed );

		if ( this.moveUp ) this.object.translateY( actualMoveSpeed );
		if ( this.moveDown ) this.object.translateY( - actualMoveSpeed );

		var actualLookSpeed = this.activeLook ? delta * this.lookSpeed : 0,
			verticalLookRatio = this.constrainVertical ? Math.PI / ( this.verticalMax - this.verticalMin ) : 1;

		this.lon += this.mouseX * actualLookSpeed;
		if( this.lookVertical ) this.lat -= this.mouseY * actualLookSpeed * verticalLookRatio;

		this.lat = Math.max( - 89, Math.min( 89, this.lat ) );
		this.phi = THREE.Math.degToRad( 90 - this.lat );

		this.theta = THREE.Math.degToRad( this.lon );

		if ( this.constrainVertical ) {

			this.phi = THREE.Math.mapLinear( this.phi, 0, Math.PI, this.verticalMin, this.verticalMax );

		}

		var targetPosition = this.target,
			position = this.object.position;

		targetPosition.x = position.x + 100 * Math.sin( this.phi ) * Math.cos( this.theta );
		targetPosition.y = position.y + 100 * Math.cos( this.phi );
		targetPosition.z = position.z + 100 * Math.sin( this.phi ) * Math.sin( this.theta );

		this.object.lookAt( targetPosition );

	}

};

jThree.FlyView = function( selector ) {

	var cameras = [];

	jThree( isFinite( selector ) ? "rdr:eq(" + selector + ")" : selector || "rdr" ).each( function() {

		var camera = new THREE.FirstPersonControls( jThree.three( jThree.getCamera( this ) ), jThree.getCanvas( this ) );

		camera.renderer = this;

		jThree.update( this, function( delta, elapsed ) {
			camera.callback && camera.callback( delta, elapsed );
			camera.update( delta * .001 );
		} );

		jThree( this ).resize( function() {
			camera.handleResize();
		} ).on( "attrChange", function( e ) {

			if ( e.attrName !== "camera" ) return;
			camera.object = jThree.three( jThree.getCamera( this ) );
			camera.eyeSet();

		} );

		cameras.push( camera );

	} );

	return cameras.length > 1 ? cameras : cameras[ 0 ];

};/**
 * jThree.Oculus.js v0.0 - http://www.jthree.co/
 * Includes vr.js | Copyright (c) Ben Vanik
 * Includes OculusRiftEffect.js | Copyright (c) troffmo5
 */
 
/**
 * vr.js library main code.
 *
 * @author Ben Vanik <ben.vanik@gmail.com>
 * @license Apache 2.0
 * @module vr
 */

(function(global) {


/**
 * @namespace vr
 * @alias module vr
 */
var vr = {};


/**
 * Error codes that may be set as the 'code' property on Error objects.
 * These can be used for handing the errors without having to inspect their
 * text.
 * @enum {number}
 * @memberof vr
 */
vr.ErrorCode = {
  /**
   * The plugin was not found and is most likely not installed.
   */
  PLUGIN_NOT_FOUND: 1,

  /**
   * Plugin is present but was blocked from running by the browser. The user
   * should enable the plugin for the page (from the page action in Chrome).
   */
  PLUGIN_BLOCKED: 4
};


/**
 * The data source providing the sensor data.
 * @enum {number}
 * @memberof vr
 */
vr.DataSourceMode = {
  /**
   * NPAPI plugin.
   */
  PLUGIN: 0,

  /**
   * Javascript USB driver.
   */
  DRIVER: 1
};


// From Closure base.js:
function inherits(childCtor, parentCtor) {
  function tempCtor() {};
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor();
  childCtor.prototype.constructor = childCtor;
};


/**
 * Data source base type.
 * @constructor
 * @private
 */
vr.DataSource = function() {
};


/**
 * Disposes the data source and any dependent resources.
 */
vr.DataSource.prototype.dispose = function() {
};


/**
 * Detects whether the data source is present and supported.
 * This could be called periodically to wait for install.
 * @return {boolean} True if present.
 */
vr.DataSource.prototype.isPresent = function() {
  return false;
};


/**
 * Loads the data source.
 * @param {function(this:T, Error=)=} opt_callback Callback function.
 * @param {T=} opt_scope Optional callback scope.
 * @template T
 */
vr.DataSource.prototype.load = function(callback, opt_scope) {
  global.setTimeout(function() {
    callback.call(opt_scope, null);
  }, 0);
};


/**
 * Queries the connected HMD device.
 * @return {vr.HmdInfo} Device info or null if none attached.
 */
vr.DataSource.prototype.queryHmdInfo = function() {
  return null;
};


/**
 * Queries the connected Sixense device.
 * @return {vr.SixenseInfo} Device info or null if none attached.
 */
vr.DataSource.prototype.querySixenseInfo = function() {
  return null;
};


/**
 * Resets the HMD orientation to its default.
 */
vr.DataSource.prototype.resetHmdOrientation = function() {
};


/**
 * Polls active devices and fills in the state structure.
 * @param {!vr.State} state State structure to fill in. This must be created by
 *     the caller and should be cached across calls to prevent extra garbage.
 */
vr.DataSource.prototype.poll = function(state) {
};



/**
 * NPAPI plugin-based data source.
 * @param {!Document} document HTML document.
 * @constructor
 * @inherits {vr.DataSource}
 * @private
 */
vr.PluginDataSource = function(document) {
  vr.DataSource.call(this);

  /**
   * HTML document.
   * @type {!Document}
   * @private
   */
  this.document_ = document;

  /**
   * Native plugin object.
   * @type {Object}
   * @private
   */
  this.native_ = null;
};
inherits(vr.PluginDataSource, vr.DataSource);


/**
 * @override
 */
vr.PluginDataSource.prototype.dispose = function() {
  // TOOD(benvanik): destroy the plugin embed, remove from dom, etc.
  vr.DataSource.prototype.dispose.call(this);
};


/**
 * @override
 */
vr.PluginDataSource.prototype.isPresent = function() {
  var plugins = navigator.plugins;
  plugins.refresh();
  for (var n = 0; n < plugins.length; n++) {
    var plugin = plugins[n];
    for (var m = 0; m < plugin.length; m++) {
      var mimeType = plugin[m];
      if (mimeType.type == "application/x-vnd-vr") {
        return true;
      }
    }
  }
  return false;
};


/**
 * Creates the <embed> tag for the plugin.
 * @return {!HTMLEmbedElement} Embed element. Not yet added to the DOM.
 * @private
 */
vr.PluginDataSource.prototype.createEmbed_ = function() {
  var embed = this.document_.createElement("embed");
  embed.type = "application/x-vnd-vr";
  embed.width = 4;
  embed.height = 4;
  embed.style.visibility = "hidden";
  embed.style.width = "0";
  embed.style.height = "0";
  embed.style.margin = "0";
  embed.style.padding = "0";
  embed.style.borderStyle = "none";
  embed.style.borderWidth = "0";
  embed.style.maxWidth = "0";
  embed.style.maxHeight = "0";
  return embed;
};


/**
 * @override
 */
vr.PluginDataSource.prototype.load = function(callback, opt_scope) {
  // Create <embed>.
  var embed = this.createEmbed_();

  // Add to DOM. We may be able to just add to a fragment, but I'm not
  // sure.
  this.document_.body.appendChild(embed);

  // Wait until the plugin adds itself to the global.
  var startTime = Date.now();
  var self = this;
  function checkLoaded() {
    if (global._vr_native_) {
      self.native_ = global._vr_native_;
      callback.call(opt_scope, null);
    } else {
      var elapsed = Date.now() - startTime;
      if (elapsed > 5 * 1000) {
        // Waited longer than 5 seconds - timeout.
        self.native_ = null;
        var e = new Error("Plugin blocked - enable and reload.");
        e.code = vr.ErrorCode.PLUGIN_BLOCKED;
        callback.call(opt_scope, e);
      } else {
        // Keep waiting.
        global.setTimeout(checkLoaded, 100);
      }
    }
  };
  checkLoaded();
};


/**
 * Executes a command in the plugin and returns the raw result.
 * @param {number} commandId Command ID.
 * @param {string=} opt_commandData Command data string.
 * @return {string} Raw result string.
 * @private
 */
vr.PluginDataSource.prototype.execCommand_ = function(
    commandId, opt_commandData) {
  if (!this.native_) {
    return "";
  }
  return this.native_.exec(commandId, opt_commandData || "") || "";
};


/**
 * @override
 */
vr.PluginDataSource.prototype.queryHmdInfo = function() {
  var queryData = this.execCommand_(1);
  if (!queryData || !queryData.length) {
    return null;
  }
  var values = queryData.split(",");
  return new vr.HmdInfo(values);
};


/**
 * @override
 */
vr.PluginDataSource.prototype.querySixenseInfo = function() {
  // TODO(benvanik): a real query
  return new vr.SixenseInfo();
};


/**
 * @override
 */
vr.PluginDataSource.prototype.resetHmdOrientation = function() {
  this.execCommand_(2);
};


/**
 * @override
 */
vr.PluginDataSource.prototype.poll = function(state) {
  if (!this.native_) {
    return;
  }

  // Data is chunked into devices by |.
  // Data inside the device chunk is split on ,.
  // The first entry inside a chunk is the device type.
  // So:
  // s,1,2,3|r,4,5,6|
  // is:
  //   - sixense with data 1,2,3
  //   - rift with data 4,5,6
  var pollData = this.native_.poll();
  var deviceChunks = pollData.split("|");
  for (var n = 0; n < deviceChunks.length; n++) {
    var deviceChunk = deviceChunks[n].split(",");
    if (!deviceChunk.length) {
      continue;
    }
    switch (deviceChunk[0]) {
      case "s":
        // Sixense data.
        this.parseSixenseChunk_(state, deviceChunk, 1);
        break;
      case "r":
        // Oculus data.
        this.parseHmdChunk_(state, deviceChunk, 1);
        break;
    }
  }
};


/**
 * Parses a Sixense data poll chunk and sets the state.
 * @param {!vr.State} state Target state.
 * @param {!Array.<string>} data Data elements.
 * @param {number} o Offset into data elements to start at.
 * @private
 */
vr.PluginDataSource.prototype.parseSixenseChunk_ = function(state, data, o) {
  // b,[base#],
  //   c,[controller#],
  //     [x],[y],[z],[q0],[q1],[q2],[q3],[jx],[jy],[tr],[buttons],
  //     [docked],[hand],[hemisphere tracking],
  //   c,[controller#],
  //     [x],[y],[z],[q0],[q1],[q2],[q3],[jx],[jy],[tr],[buttons],
  //     [docked],[hand],[hemisphere tracking],
  //   ...
  // ...

  while (o < data.length) {
    var c = data[o++];
    if (c == "b") {
      var baseId = data[o++];
      state.sixense.present = true;
    } else if (c == "c") {
      var controllerId = data[o++];
      var controller = state.sixense.controllers[controllerId];
      controller.position[0] = parseFloat(data[o++]);
      controller.position[1] = parseFloat(data[o++]);
      controller.position[2] = parseFloat(data[o++]);
      controller.rotation[0] = parseFloat(data[o++]);
      controller.rotation[1] = parseFloat(data[o++]);
      controller.rotation[2] = parseFloat(data[o++]);
      controller.rotation[3] = parseFloat(data[o++]);
      controller.joystick[0] = parseFloat(data[o++]);
      controller.joystick[1] = parseFloat(data[o++]);
      controller.trigger = parseFloat(data[o++]);
      controller.buttons = parseInt(data[o++], 10);
      controller.isDocked = data[o++] == "1";
      controller.hand = parseInt(data[o++], 10);
      controller.isTrackingHemispheres = data[o++] == "1";
    } else {
      break;
    }
  }
};


/**
 * Parses an HMD data poll chunk and sets the state.
 * @param {!vr.State} state Target state.
 * @param {!Array.<string>} data Data elements.
 * @param {number} o Offset into data elements to start at.
 * @private
 */
vr.PluginDataSource.prototype.parseHmdChunk_ = function(state, data, o) {
  if (data.length == 5) {
    state.hmd.present = true;
    state.hmd.rotation[0] = parseFloat(data[o++]);
    state.hmd.rotation[1] = parseFloat(data[o++]);
    state.hmd.rotation[2] = parseFloat(data[o++]);
    state.hmd.rotation[3] = parseFloat(data[o++]);
  } else {
    state.hmd.present = false;
  }
};



/**
 * Javascript USB driver-based data source.
 * @param {!Object} driver Driver instance.
 * @constructor
 * @inherits {vr.DataSource}
 * @private
 */
vr.DriverDataSource = function(driver) {
  vr.DataSource.call(this);

  /**
   * Driver object.
   * @type {!Object}
   * @private
   */
  this.driver_ = driver;
};
inherits(vr.DriverDataSource, vr.DataSource);


/**
 * @override
 */
vr.DriverDataSource.prototype.dispose = function() {
  this.driver_.dispose();
  vr.DataSource.prototype.dispose.call(this);
};


/**
 * @override
 */
vr.DriverDataSource.prototype.isPresent = function() {
  return true;
};


/**
 * @override
 */
vr.DriverDataSource.prototype.load = function(callback, opt_scope) {
  global.setTimeout(function() {
    callback.call(opt_scope, null);
  }, 0);
};


/**
 * @override
 */
vr.DriverDataSource.prototype.queryHmdInfo = function() {
  var info = new vr.HmdInfo();
  if (!this.driver_.fillHmdInfo(info)) {
    return null;
  }
  return info;
};


/**
 * @override
 */
vr.DriverDataSource.prototype.querySixenseInfo = function() {
  return null;
};


/**
 * @override
 */
vr.DriverDataSource.prototype.resetHmdOrientation = function() {
  this.driver_.resetOrientation();
};


/**
 * @override
 */
vr.DriverDataSource.prototype.poll = function(state) {
  var present = this.driver_.isPresent();
  state.hmd.present = present;
  if (present) {
    this.driver_.getOrientation(state.hmd.rotation);
  } else {
    state.hmd.rotation[0] = state.hmd.rotation[1] = state.hmd.rotation[2] = 0;
    state.hmd.rotation[3] = 0;
  }
};



/**
 * VR runtime state object.
 * Keeps track of state used by the various {@link vr} namespace methods.
 * @param {!Document} document HTML document.
 * @constructor
 * @private
 */
vr.Runtime = function(document) {
  /**
   * HTML document.
   * @type {!Document}
   * @private
   */
  this.document_ = document;

  /**
   * Current data source mode.
   * @type {vr.DataSourceMode}
   * @private
   */
  this.dataSourceMode_ = vr.DataSourceMode.PLUGIN;

  // If we have the USB driver, use that. Otherwise, default to plugin.
  if (global["__vr_driver__"]) {
    this.dataSourceMode_ = vr.DataSourceMode.DRIVER;
  }
  var dataSource = null;
  switch (this.dataSourceMode_) {
    default:
    case vr.DataSourceMode.PLUGIN:
      dataSource = new vr.PluginDataSource(this.document_);
      break;
    case vr.DataSourceMode.DRIVER:
      dataSource = new vr.DriverDataSource(global["__vr_driver__"]);
      break;
  }

  /**
   * Current data source.
   * @type {!vr.DataSource}
   * @private
   */
  this.dataSource_ = dataSource;

  /**
   * Whether the plugin is installed.
   * @type {boolean}
   * @private
   */
  this.isInstalled_ = this.dataSource_.isPresent();

  /**
   * Whether the plugin is initialized.
   * @type {boolean}
   * @private
   */
  this.isLoaded_ = false;

  /**
   * The error that occurred during initialization, if any.
   * @type {Object}
   * @private
   */
  this.error_ = null;

  /**
   * Whether the plugin is attempting to load.
   * This is set on the first attempt and never cleared to prevent fail loops.
   * @type {boolean}
   * @private
   */
  this.isLoading_ = false;

  /**
   * A list of callbacks waiting for ready.
   * @type {!Array.<!Array>}
   * @private
   */
  this.readyWaiters_ = [];

  /**
   * HMD info, if any device is attached.
   * @type {vr.HmdInfo}
   * @private
   */
  this.hmdInfo_ = null;

  /**
   * Sixense info, if any device is attached.
   * @type {vr.SixenseInfo}
   * @private
   */
  this.sixenseInfo_ = null;

  /**
   * An array of [x, y, w, h] of the window position before entering fullscreen.
   * This will not be set if we were not the ones who initiated the fullscreen
   * change.
   * @type {Array.<number>}
   * @private
   */
  this.oldWindowSize_ = null;

  var self = this;
  var fullScreenChange = function(e) {
    self.fullScreenChange_(e);
  };
  document.addEventListener("fullscreenchange", fullScreenChange, false);
  document.addEventListener("mozfullscreenchange", fullScreenChange, false);
};


/**
 * Starts loading the plugin and queues a callback that will be called when the
 * plugin is ready.
 *
 * The callback will receive an error object if an error occurred.
 * This error object may have a 'code' property corresponding to
 * {@link vr.ErrorCode}.
 *
 * If the plugin is already initialized the given callback will be called next
 * tick, so it's always safe to use this and assume asynchronicity.
 *
 * @param {function(this:T, Error=)=} opt_callback Callback function.
 * @param {T=} opt_scope Optional callback scope.
 * @template T
 */
vr.Runtime.prototype.load = function(opt_callback, opt_scope) {
  var self = this;

  // Fail if not installed.
  if (!this.isInstalled_) {
    var e = new Error("Plugin not installed!");
    e.code = vr.ErrorCode.PLUGIN_NOT_FOUND;
    this.error_ = e;
    if (opt_callback) {
      global.setTimeout(function() {
        opt_callback.call(opt_scope, self.error_);
      }, 0);
    }
    return;
  }

  if (this.isLoaded_ || this.error) {
    // Already loaded or errored, callback.
    if (opt_callback) {
      global.setTimeout(function() {
        opt_callback.call(opt_scope, self.error_);
      }, 0);
    }
    return;
  } else {
    // Wait for load...
    if (opt_callback) {
      this.readyWaiters_.push([opt_callback, opt_scope]);
    }

    if (this.isLoading_) {
      // Already loading, ignore the request.
      return;
    }

    // Start loading!
    this.isLoading_ = true;

    // Wait for DOM ready and initialize.
    vr.waitForDomReady(this.document_, function() {
      this.dataSource_.load(function(opt_error) {
        this.completeLoad_(opt_error);
      }, this);
    }, this);

    return;
  }
};


/**
 * Readies the library and calls back any waiters.
 * @param {Object=} opt_error Error, if any.
 * @private
 */
vr.Runtime.prototype.completeLoad_ = function(opt_error) {
  // Set state.
  if (opt_error) {
    this.isLoaded_ = false;
    this.error_ = opt_error;
  } else {
    this.isLoaded_ = true;
    this.error_ = null;
  }

  // Callback all waiters.
  while (this.readyWaiters_.length) {
    var waiter = this.readyWaiters_.shift();
    waiter[0].call(waiter[1], opt_error || null);
  }
};


/**
 * Polls active devices and fills in the state structure.
 * This also takes care of dispatching device notifications/etc.
 * @param {!vr.State} state State structure to fill in. This must be created by
 *     the caller and should be cached across calls to prevent extra garbage.
 * @return {boolean} True if the state query was successful.
 */
vr.Runtime.prototype.poll = function(state) {
  // Reset.
  state.sixense.present = false;
  state.hmd.present = false;

  // Poll data.
  this.dataSource_.poll(state);

  // Query any info if needed.
  if (state.sixense.present && !this.sixenseInfo_) {
    // Sixense connected.
    this.sixenseInfo_ = this.dataSource_.querySixenseInfo();
    // TODO(benvanik): fire event?
  } else if (!state.sixense.present && this.sixenseInfo_) {
    // Sixense disconnected.
    this.sixenseInfo_ = null;
    // TODO(benvanik): fire event?
  }
  if (state.hmd.present && !this.hmdInfo_) {
    // HMD connected.
    this.hmdInfo_ = this.dataSource_.queryHmdInfo();
    // TODO(benvanik): fire event?
  } else if (!state.hmd.present && this.hmdInfo_) {
    // HMD disconnected.
    this.hmdInfo_ = null;
    // TODO(benvanik): fire event?
  }

  return true;
};


/**
 * Handles full screen change events.
 * @param {!Event} e Event.
 * @private
 */
vr.Runtime.prototype.fullScreenChange_ = function(e) {
  if (vr.isFullScreen()) {
    // Entered fullscreen.
  } else {
    // Exited fullscreen.

    // Move the window back.
    if (this.oldWindowSize_) {
      global.moveTo(this.oldWindowSize_[0], this.oldWindowSize_[1]);
      global.resizeTo(this.oldWindowSize_[2], this.oldWindowSize_[3]);
      this.oldWindowSize_ = null;
    }
  }
};


/**
 * Shared runtime object.
 * @type {!vr.Runtime}
 * @private
 */
vr.runtime_ = new vr.Runtime(global.document);


/**
 * Whether the plugin is installed.
 * Note that even if installed it may be blocked on first use by the browser.
 * @return {boolean} True if the plugin is installed.
 */
vr.isInstalled = function() {
  return vr.runtime_.isInstalled_;
};


/**
 * Whether the plugin is initialized.
 * @return {boolean} True if the plugin is loaded.
 */
vr.isLoaded = function() {
  return vr.runtime_.isLoaded_;
};


/**
 * Gets the error that occurred during initialization, if any.
 * @return {Error|null} Error object. May contain a 'code' property
 *     corresponding to a value from {@link vr.ErrorCode}.
 * @memberof vr
 */
vr.getError = function() {
  return vr.runtime_.error_;
};


/**
 * Starts loading the plugin and queues a callback that will be called when the
 * plugin is ready.
 *
 * The callback will receive an error object if an error occurred.
 * This error object may have a 'code' property corresponding to
 * {@link vr.ErrorCode}.
 *
 * If the plugin is already initialized the given callback will be called next
 * tick, so it's always safe to use this and assume asynchronicity.
 *
 * @param {function(this:T, Error=)=} opt_callback Callback function.
 * @param {T=} opt_scope Optional callback scope.
 * @template T
 * @memberof vr
 *
 * @example
 * vr.load(function(opt_error) {
 *   if (opt_error) {
 *     // Plugin failed to load for some reason.
 *     switch (opt_error.code) {
 *       case vr.ErrorCode.PLUGIN_NOT_FOUND:
 *         // Plugin was not installed.
 *         break;
 *       case vr.ErrorCode.PLUGIN_BLOCKED:
 *         // Plugin was blocked by the browser - user must enable.
 *         break;
 *       default:
 *         // Some other error?
 *         break;
 *     }
 *     return;
 *   } else {
 *     // Plugin found and ready to use!
 *   }
 * });
 */
vr.load = function(opt_callback, opt_scope) {
  vr.runtime_.load(opt_callback, opt_scope);
};



/**
 * Gets the information of the currently connected HMD device, if any.
 * This is populated on demand by calling {@link vr.pollState}.
 * @return {vr.HmdInfo} HMD info, if any.
 * @memberof vr
 */
vr.getHmdInfo = function() {
  return vr.runtime_.hmdInfo_;
};


/**
 * Resets the current orientation of the headset to be zero.
 * This should be used to compensate for drift when the user has likely come
 * back after not using the HMD for awhile. For example, on page visibility
 * change.
 * @memberof vr
 */
vr.resetHmdOrientation = function() {
  vr.runtime_.dataSource_.resetHmdOrientation();
};


/**
 * Gets the information of the currently connected Sixense device, if any.
 * This is populated on demand by calling {@link vr.pollState}.
 * @return {vr.SixenseInfo} Sixense info, if any.
 * @memberof vr
 */
vr.getSixenseInfo = function() {
  return vr.runtime_.sixenseInfo_;
};


/**
 * Polls active devices and fills in the state structure.
 * This also takes care of dispatching device notifications/etc.
 * @param {!vr.State} state State structure to fill in. This must be created by
 *     the caller and should be cached across calls to prevent extra garbage.
 * @return {boolean} True if the state query was successful.
 * @memberof vr
 *
 * @example
 * // Cache the state object to reduce garbage generation.
 * var state = new vr.State();
 * function frameTick() {
 *   // Poll state at the start of each frame, before rendering.
 *   if (vr.pollState(state)) {
 *     // VR plugin active and state was polled.
 *     // TODO: update camera/controls/etc.
 *   }
 *   // TODO: render with the latest data.
 * };
 */
vr.pollState = function(state) {
  return vr.runtime_.poll(state);
};


/**
 * Detects whether the window is currently fullscreen.
 * @return {boolean} True if in full screen mode.
 * @memberof vr
 */
vr.isFullScreen = function() {
  var runtime = vr.runtime_;
  var element =
      runtime.document_.fullScreenElement ||
      runtime.document_.mozFullScreenElement ||
      runtime.document_.webkitFullscreenElement;
  return !!element;
};


/**
 * Enters full screen mode, moving the window to the Oculus display if present.
 * @return {boolean} True if the window entered fullscreen.
 * @memberof vr
 */
vr.enterFullScreen = function() {
  var runtime = vr.runtime_;

  // Stash current window position.
  runtime.oldWindowSize_ = [
    global.screenX, global.screenY,
    global.outerWidth, global.outerHeight
  ];

  // Move to new position.
  // TODO(benvanik): make this work. I believe the API only works for popups.
  var hmdInfo = runtime.hmdInfo_;
  if (hmdInfo) {
    global.moveTo(hmdInfo.desktopX, hmdInfo.desktopY);
    global.resizeTo(hmdInfo.resolutionHorz, hmdInfo.resolutionVert);
  }

  // Enter fullscreen.
  var requestFullScreen =
      runtime.document_.documentElement.requestFullscreen ||
      runtime.document_.documentElement.mozRequestFullScreen ||
      runtime.document_.documentElement.webkitRequestFullScreen;
  requestFullScreen.call(
      runtime.document_.documentElement, Element.ALLOW_KEYBOARD_INPUT);

  return true;
};


/**
 * Exits fullscreen mode and moves the window back to its original position.
 * @memberof vr
 */
vr.exitFullScreen = function() {
  var runtime = vr.runtime_;

  // Exit fullscreen.
  // The {@link vr.Runtime#fullScreenChange_} handler will move the window back.
  var cancelFullScreen =
      runtime.document_.cancelFullScreen ||
      runtime.document_.mozCancelFullScreen ||
      runtime.document_.webkitCancelFullScreen;
  if (cancelFullScreen) {
    cancelFullScreen.call(runtime.document_);
  }
};


/**
 * Requests an animation frame.
 * @param {!function(this:T)} callback Function to call on the next frame.
 * @param {T=} opt_scope Callback scope.
 * @template T
 * @memberof vr
 */
vr.requestAnimationFrame = function(callback, opt_scope) {
  var raf =
      global.requestAnimationFrame ||
      global.mozRequestAnimationFrame ||
      global.msRequestAnimationFrame ||
      global.oRequestAnimationFrame ||
      global.webkitRequestAnimationFrame;
  if (opt_scope) {
    return raf.call(global, function() {
      return callback.apply(opt_scope, arguments);
    });
  } else {
    return raf.call(global, callback);
  }
};


/**
 * Calls the given function when the DOM is ready for use.
 * @param {!Document} document HTML document.
 * @param {!function(this:T)} callback Callback function.
 * @param {T=} opt_scope Optional callback scope.
 * @template T
 */
vr.waitForDomReady = function(document, callback, opt_scope) {
  if (document.readyState == "interactive" ||
      document.readyState == "complete") {
    global.setTimeout(function() {
      callback.call(opt_scope);
    }, 0);
  } else {
    var initialize = function() {
      document.removeEventListener("DOMContentLoaded", initialize, false);
      callback.call(opt_scope);
    };
    document.addEventListener("DOMContentLoaded", initialize, false);
  }
};


/**
 * Logs to the console, if one is present.
 * This should be used for critical debugging messages only, as it has a
 * performance cost.
 * @param {...*} var_args Things to log.
 * @memberof vr
 */
vr.log = function(var_args) {
  if (global.console && global.console.log) {
    global.console.log.apply(global.console, arguments);
  }
};


// TODO(benvanik): move state/info to its own file


/**
 * HMD device info.
 * @param {Array.<number>=} opt_values Device values.
 * @constructor
 */
vr.HmdInfo = function(opt_values) {
  var o = 0;

  /**
   * Name string describing the product: "Oculus Rift DK1", etc.
   * @type {string}
   * @readonly
   */
  this.deviceName = opt_values ?
      opt_values[o++] : "Mock Device";

  /**
   * Manufacturer name.
   * @type {string}
   * @readonly
   */
  this.deviceManufacturer = opt_values ?
      opt_values[o++] : "vr.js";

  /**
   * Device version.
   * @type {number}
   * @readonly
   */
  this.deviceVersion = opt_values ?
      parseFloat(opt_values[o++]) : 0;

  /**
   * Desktop coordinate position of the screen (can be negative) along X.
   * @type {number}
   * @readonly
   */
  this.desktopX = opt_values ?
      parseFloat(opt_values[o++]) : 0;

  /**
   * Desktop coordinate position of the screen (can be negative) along Y.
   * @type {number}
   * @readonly
   */
  this.desktopY = opt_values ?
      parseFloat(opt_values[o++]) : 0;

  /**
   * Horizontal resolution of the entire screen, in pixels.
   * @type {number}
   * @readonly
   */
  this.resolutionHorz = opt_values ?
      parseFloat(opt_values[o++]) : 1280;

  /**
   * Vertical resolution of the entire screen, in pixels.
   * @type {number}
   * @readonly
   */
  this.resolutionVert =opt_values ?
      parseFloat(opt_values[o++]) : 800;

  /**
   * Horizontal physical size of the screen, in meters.
   * @type {number}
   * @readonly
   */
  this.screenSizeHorz = opt_values ?
      parseFloat(opt_values[o++]) : 0.14976;

  /**
   * Vertical physical size of the screen, in meters.
   * @type {number}
   * @readonly
   */
  this.screenSizeVert = opt_values ?
      parseFloat(opt_values[o++]) : 0.0936;

  /**
   * Physical offset from the top of the screen to the eye center, in meters.
   * This will usually, but not necessarily be half of
   * {@link vr.HmdInfo#screenSizeVert}.
   * @type {number}
   * @readonly
   */
  this.screenCenterVert = opt_values ?
      parseFloat(opt_values[o++]) : 800 / 2;

  /**
   * Distance from the eye to screen surface, in meters.
   * Useful for calculating FOV and projection.
   * @type {number}
   * @readonly
   */
  this.eyeToScreenDistance = opt_values ?
      parseFloat(opt_values[o++]) : 0.041;

  /**
   * Distance between physical lens centers useful for calculating distortion
   * center.
   * @type {number}
   * @readonly
   */
  this.lensSeparationDistance = opt_values ?
      parseFloat(opt_values[o++]) : 0.0635;

  /**
   * Configured distance between the user's eye centers, in meters.
   * Defaults to 0.0635.
   * @type {number}
   * @readonly
   */
  this.interpupillaryDistance = opt_values ?
      parseFloat(opt_values[o++]) : 0.0635;

  /**
   * Radial distortion correction coefficients.
   * The distortion assumes that the input texture coordinates will be scaled
   * by the following equation:
   *   uvResult = uvInput * (K0 + K1 * uvLength^2 + K2 * uvLength^4)
   * Where uvInput is the UV vector from the center of distortion in direction
   * of the mapped pixel, uvLength is the magnitude of that vector, and uvResult
   * the corresponding location after distortion.
   * @type {!Float32Array}
   * @readonly
   */
  this.distortionK = new Float32Array(opt_values ? [
    parseFloat(opt_values[o++]), parseFloat(opt_values[o++]),
    parseFloat(opt_values[o++]), parseFloat(opt_values[o++])
  ] : [1.0, 0.22, 0.24, 0]);

  /**
   * Additional per-channel scaling is applied after distortion:
   * Index [0] - Red channel constant coefficient.
   * Index [1] - Red channel r^2 coefficient.
   * Index [2] - Blue channel constant coefficient.
   * Index [3] - Blue channel r^2 coefficient.
   * @type {!Float32Array}
   * @readonly
   */
  this.chromaAbCorrection = new Float32Array(opt_values ? [
    parseFloat(opt_values[o++]), parseFloat(opt_values[o++]),
    parseFloat(opt_values[o++]), parseFloat(opt_values[o++])
  ] : [1, 0, 1, 0]);
};


/**
 * Gets a human readable string describing the device.
 * @return {string} String.
 */
vr.HmdInfo.prototype.toString = function() {
  return this.deviceName + " v" + this.deviceVersion +
      " (" + this.deviceManufacturer + ")";
};


/**
 * Distorts the given value the same way the shader would.
 * @param {number} r Value to distort.
 * @return {number} Distorted value.
 */
vr.HmdInfo.prototype.distort = function(r) {
  var rsq = r * r;
  var K = this.distortionK;
  return r * (K[0] + K[1] * rsq + K[2] * rsq * rsq + K[3] * rsq * rsq * rsq);
};


/**
 * Default HMD info.
 * Do not modify.
 * @type {!vr.HmdInfo}
 */
vr.HmdInfo.DEFAULT = new vr.HmdInfo();



/**
 * HMD state data.
 * @constructor
 */
vr.HmdState = function() {
  /**
   * Whether any HMD data is present in this state update.
   * Do not use any other values on this type if this is false.
   * @type {boolean}
   * @readonly
   */
  this.present = false;

  /**
   * Rotation quaternion.
   * @type {!Float32Array}
   * @readonly
   */
  this.rotation = new Float32Array(4);
};



/**
 * Bitmask values for the sixense controller buttons field.
 * @enum {number}
 * @memberof vr
 */
vr.SixenseButton = {
  NONE: 0,
  BUTTON_START: 1 << 0,
  BUTTON_1: 1 << 5,
  BUTTON_2: 1 << 6,
  BUTTON_3: 1 << 3,
  BUTTON_4: 1 << 4,
  BUMPER: 1 << 7,
  JOYSTICK: 1 << 8
};


/**
 * Possible values of the sixense controller hand.
 * @enum {number}
 * @memberof vr
 */
vr.SixenseHand = {
  /** Hand has not yet been determined. */
  UNKNOWN: 0,
  /** Controller is in the left hand. */
  LEFT: 1,
  /** Controller is in the right hand. */
  RIGHT: 2
};



/**
 * Sixense device info.
 * @param {Array.<number>=} opt_values Device values.
 * @constructor
 */
vr.SixenseInfo = function(opt_values) {
};



/**
 * Sixense state data.
 * @constructor
 */
vr.SixenseState = function() {
  /**
   * Whether any sixense data is present in this state update.
   * Do not use any other values on this type if this is false.
   * @type {boolean}
   * @readonly
   */
  this.present = false;

  /**
   * Connected controllers.
   * @type {!Array.<!vr.SixenseControllerState>}
   * @readonly
   */
  this.controllers = [
    new vr.SixenseControllerState(),
    new vr.SixenseControllerState()
  ];
};



/**
 * Sixense controller state data.
 * @constructor
 */
vr.SixenseControllerState = function() {
  /**
   * Position XYZ.
   * @type {!Float32Array}
   * @readonly
   */
  this.position = new Float32Array(3);

  /**
   * Rotation quaternion.
   * @type {!Float32Array}
   * @readonly
   */
  this.rotation = new Float32Array(4);

  /**
   * Joystick XY.
   * @type {!Float32Array}
   * @readonly
   */
  this.joystick = new Float32Array(2);

  /**
   * Trigger press value [0-1].
   * @type {number}
   * @readonly
   */
  this.trigger = 0.0;

  /**
   * A bitmask of {@link vr.SixenseButton} values indicating which buttons
   * are currently pressed.
   * @type {number}
   * @readonly
   */
  this.buttons = vr.SixenseButton.NONE;

  /**
   * Whether the controller is docked in the station.
   * Make the user place the controllers in the dock to get this value.
   * @type {boolean}
   * @readonly
   */
  this.isDocked = false;

  /**
   * The hand the controller represents, if it has been set.
   * Make the user place the controllers in the dock to get this value.
   * @type {vr.SixenseHand}
   * @readonly
   */
  this.hand = vr.SixenseHand.UNKNOWN;

  /**
   * Whether hemisphere tracking is enabled.
   * Make the user place the controllers in the dock to get this value.
   * @type {boolean}
   * @readonly
   */
  this.isTrackingHemispheres = false;
};



/**
 * VR state object.
 * This should be created and cached to enable efficient updates.
 * @constructor
 */
vr.State = function() {
  /**
   * Sixense state.
   * @type {!vr.SixenseState}
   * @readonly
   */
  this.sixense = new vr.SixenseState();

  /**
   * HMD state.
   * @type {!vr.HmdState}
   * @readonly
   */
  this.hmd = new vr.HmdState();
};


// TODO(benvanik): move math to its own file


/**
 * @namespace vr.mat4f
 */
vr.mat4f = {};


/**
 * Simple 4x4 float32 matrix storage type.
 * @typedef {!Float32Array}
 * @memberof vr.mat4f
 *
 * @example
 * [ m00 m01 m02 m03    [  0  1  2  3
 *   m10 m11 m12 m13       4  5  6  7
 *   m20 m21 m22 m23       8  9 10 11
 *   m30 m31 m32 m33 ]    12 13 14 15 ]
 */
vr.mat4f.Type;


/**
 * Creates a matrix object.
 * @return {!vr.mat4f.Type} Matrix.
 * @memberof vr.mat4f
 */
vr.mat4f.create = function() {
  return new Float32Array(16);
};


/**
 * Makes an identity matrix.
 * @param {!vr.mat4f.Type} v Destination matrix.
 * @memberof vr.mat4f
 */
vr.mat4f.makeIdentity = function(v) {
  v[0] = v[5] = v[10] = v[15] = 1;
  v[1] = v[2] = v[3] = v[4] = v[6] = v[7] = v[8] = v[9] = v[11] =
      v[12] = v[13] = v[14] = 0;
};


/**
 * Makes a translation matrix.
 * @param {!vr.mat4f.Type} v Destination matrix.
 * @param {number} x Translation along X.
 * @param {number} y Translation along Y.
 * @param {number} z Translation along Z.
 * @memberof vr.mat4f
 */
vr.mat4f.makeTranslation = function(v, x, y, z) {
  v[0] = v[5] = v[10] = v[15] = 1;
  v[1] = v[2] = v[3] = v[4] = v[6] = v[7] = v[8] = v[9] = v[11] = 0;
  v[12] = x;
  v[13] = y;
  v[14] = z;
};


/**
 * Makes a matrix describing a rectangle.
 * @param {!vr.mat4f.Type} v Destination matrix.
 * @param {number} x Rectangle X.
 * @param {number} y Rectangle Y.
 * @param {number} w Rectangle width.
 * @param {number} h Rectangle height.
 * @memberof vr.mat4f
 */
vr.mat4f.makeRect = function(v, x, y, w, h) {
  v[0] = w;
  v[5] = h;
  v[10] = v[15] = 1;
  v[1] = v[2] = v[3] = v[4] = v[6] = v[7] = v[8] = v[9] = v[11] = v[14] = 0;
  v[12] = x;
  v[13] = y;
};


/**
 * Makes a perspective projection matrix.
 * @param {!vr.mat4f.Type} v Destination matrix.
 * @param {number} fovy FOV along Y.
 * @param {number} aspect Aspect ratio.
 * @param {number} near Near plane distance.
 * @param {number} far Far plane distance.
 * @memberof vr.mat4f
 */
vr.mat4f.makePerspective = function(v, fovy, aspect, near, far) {
  var f = 1 / Math.tan(fovy / 2);
  var nf = 1 / (near - far);
  v[0] = f / aspect;
  v[1] = v[2] = v[3] = v[4] = 0;
  v[5] = f;
  v[6] = v[7] = v[8] = v[9] = 0;
  v[10] = (far + near) * nf;
  v[11] = -1;
  v[12] = v[13] = 0;
  v[14] = (2 * far * near) * nf;
  v[15] = 0;
};


/**
 * Multiples matrices a and b in order and stores the result in v.
 * @param {!vr.mat4f.Type} v Destination matrix.
 * @param {!vr.mat4f.Type} a LHS matrix.
 * @param {!vr.mat4f.Type} b RHS matrix.
 * @memberof vr.mat4f
 */
vr.mat4f.multiply = function(v, a, b) {
  var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
  var a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
  var a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
  var a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
  var b0, b1, b2, b3;
  b0 = b[0]; b1 = b[1]; b2 = b[2]; b3 = b[3];
  v[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  v[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  v[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  v[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
  v[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  v[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  v[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  v[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
  v[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  v[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  v[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  v[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
  b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
  v[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
  v[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
  v[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
  v[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
};



// TODO(benvanik): move webgl to its own file

/**
 * WebGL program object.
 * Designed to support async compilation/linking.
 * When creating many programs first call {@link vr.Program#beginLinking} on all
 * of them followed by a {@link vr.Program#endLinking} on all of them.
 * @param {!WebGLRenderingContext} gl WebGL context.
 * @param {string} displayName Debug name.
 * @param {string} vertexShaderSource Vertex shader source.
 * @param {string} fragmentShaderSource Fragment shader source.
 * @param {!Array.<string>} attributeNames A list of attribute names.
 * @param {!Array.<string>} uniformNames A list of uniform names.
 * @constructor
 *
 * @example
 * var program = new vr.Program(gl, 'MyShader',
 *     'vertex shader source', 'fragment shader source',
 *     ['attribute1', 'attribute2'],
 *     ['uniform1', 'uniform2']);
 * program.beginLinking();
 * program.endLinking();
 * function render() {
 *   program.use();
 *   gl.enableVertexAttribArray(program.attributes['attribute1']);
 *   gl.enableVertexAttribArray(program.attributes['attribute2']);
 *   gl.uniform1f(program.uniforms['uniform1'], 1);
 *   gl.uniform1f(program.uniforms['uniform2'], 2);
 *   // Draw/etc.
 * };
 *
 * @example <caption>Asynchronous compilation/linking.</caption>
 * // Create all programs. This is cheap.
 * var programs = [new vr.Program(...), new vr.Program(...), ...];
 *
 * // Begin compilation/linking.
 * for (var n = 0; n < programs.length; n++) {
 *   programs[n].beginLinking();
 * }
 *
 * // Perform other loading/uploads/etc.
 * // TODO: your loading code.
 *
 * // End compilation/linking and generate any errors.
 * for (var n = 0; n < programs.length; n++) {
 *   try {
 *     programs[n].endLinking();
 *   } catch (e) {
 *     // Handle any compilation/link errors here.
 *   }
 * }
 */
vr.Program = function(gl, displayName,
    vertexShaderSource, fragmentShaderSource,
    attributeNames, uniformNames) {
  /**
   * WebGL context.
   * @type {!WebGLRenderingContext}
   * @private
   */
  this.gl_ = gl;

  /**
   * Attribute names to locations.
   * @type {!Object.<number>}
   * @readonly
   */
  this.attributes = {};
  for (var n = 0; n < attributeNames.length; n++) {
    this.attributes[attributeNames[n]] = -1;
  }

  /**
   * Uniform names to locations.
   * @type {!Object.<!WebGLUniformLocation>}
   * @readonly
   */
  this.uniforms = {};
  for (var n = 0; n < uniformNames.length; n++) {
    this.uniforms[uniformNames[n]] = null;
  }

  /**
   * WebGL program object.
   * @type {!WebGLProgram}
   * @private
   */
  this.program_ = gl.createProgram();
  this.program_.displayName = displayName;

  // Create shaders and attach to program.
  // The program retains them and we no longer need them.
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  vertexShader.displayName = displayName + ":VS";
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.attachShader(this.program_, vertexShader);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  fragmentShader.displayName = displayName + ":FS";
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.attachShader(this.program_, fragmentShader);
};


/**
 * Disposes the object.
 */
vr.Program.prototype.dispose = function() {
  var gl = this.gl_;
  gl.deleteProgram(this.program_);
};


/**
 * Compiles the shaders and begins linking.
 * This must be followed by a call to {@link vr.Program#endLinking}.
 * Shader/program errors will not be queried until then.
 */
vr.Program.prototype.beginLinking = function() {
  var gl = this.gl_;
  var shaders = gl.getAttachedShaders(this.program_);
  for (var n = 0; n < shaders.length; n++) {
    gl.compileShader(shaders[n]);
  }
  gl.linkProgram(this.program_);
};


/**
 * Links the program and throws on any compile/link errors.
 */
vr.Program.prototype.endLinking = function() {
  var gl = this.gl_;

  // Gather shader compilation errors/warnings.
  var shaders = gl.getAttachedShaders(this.program_);
  for (var n = 0; n < shaders.length; n++) {
    var shaderName = shaders[n].displayName;
    var shaderInfoLog = gl.getShaderInfoLog(shaders[n]);
    var compiled = !!gl.getShaderParameter(shaders[n], gl.COMPILE_STATUS);
    if (!compiled) {
      // Error.
      throw "Shader " + shaderName + " compilation errors:\n" +
          shaderInfoLog;
    } else if (shaderInfoLog && shaderInfoLog.length) {
      // Warning.
      vr.log("Shader " + shaderName + " compilation warnings:\n" +
          shaderInfoLog);
    }
  }

  // Gather link errors/warnings.
  var programName = this.program_.displayName;
  var programInfoLog = gl.getProgramInfoLog(this.program_);
  var linked = !!gl.getProgramParameter(this.program_, gl.LINK_STATUS);
  if (!linked) {
    // Error.
    throw "Program " + programName + " link errors:\n" +
        programInfoLog;
  } else if (programInfoLog && programInfoLog.length) {
    // Warning.
    vr.log("Program " + programName + " link warnings:\n" +
        programInfoLog);
  }

  // Grab attribute/uniform locations.
  for (var attribName in this.attributes) {
    this.attributes[attribName] =
        gl.getAttribLocation(this.program_, attribName);
  }
  for (var uniformName in this.uniforms) {
    this.uniforms[uniformName] =
        gl.getUniformLocation(this.program_, uniformName);
  }
};


/**
 * Uses the program on the current GL context.
 */
vr.Program.prototype.use = function() {
  this.gl_.useProgram(this.program_);
};




// TODO(benvanik): move stereo eye/params its own file


/**
 * An eye.
 * Contains matrices used when rendering the viewport.
 *
 * You should not create this directly. Instead, use the
 * {@link vr.StereoParams#getEyes} to get eyes that have their information
 * updated automatically.
 *
 * @param {number} left Left, in [0-1] view coordinates.
 * @param {number} top Top, in [0-1] view coordinates.
 * @param {number} width Width, in [0-1] view coordinates.
 * @param {number} height Height, in [0-1] view coordinates.
 * @constructor
 */
vr.StereoEye = function(left, top, width, height) {
  /**
   * 2D viewport used when compositing, in [0-1] view coordinates.
   * Stored as [left, top, width, height].
   * @type {!Array.<number>}
   * @readonly
   */
  this.viewport = [left, top, width, height];

  /**
   * Eye-specific distortion center X.
   * @type {number}
   * @readonly
   */
  this.distortionCenterOffsetX = 0;

  /**
   * Eye-specific distortion center Y.
   * @type {number}
   * @readonly
   */
  this.distortionCenterOffsetY = 0;

  /**
   * Matrix used for drawing 3D things.
   * @type {!vr.mat4f.Type}
   * @readonly
   */
  this.projectionMatrix = new Float32Array(16);

  /**
   * Translation to be applied to the view matrix.
   * @type {!vr.mat4f.Type}
   * @readonly
   */
  this.viewAdjustMatrix = new Float32Array(16);

  /**
   * Matrix used for drawing 2D things, like HUDs.
   * @type {!vr.mat4f.Type}
   * @readonly
   */
  this.orthoProjectionMatrix = new Float32Array(16);
};



/**
 * Stereo rendering parameters.
 *
 * You should not create this directly. Instead, use
 * {@link vr.StereoRenderer#getParams} to get an instance that is kept up to
 * date auotmatically.
 *
 * @constructor
 */
vr.StereoParams = function() {
  /**
   * Near plane Z.
   * @type {number}
   * @private
   */
  this.zNear_ = 0.01;

  /**
   * Far plane Z.
   * @type {number}
   * @private
   */
  this.zFar_ = 1000;

  /**
   * Overridden IPD from the device.
   * If this is undefined the value from the HMD info will be used instead.
   * @type {number|undefined}
   * @private
   */
  this.interpupillaryDistance_ = undefined;

  /**
   * Scale by which the input render texture is scaled by to make the
   * post-distortion result fit the viewport.
   * @type {number}
   * @private
   */
  this.distortionScale_ = 1;

  // Constants for now.
  this.distortionFitX_ = -1;
  this.distortionFitY_ = 0;

  /**
   * Eyes.
   * Each eye contains the matrices and bounding data used when rendering.
   * @type {!Array.<!vr.StereoEye>}
   * @private
   */
  this.eyes_ = [
    new vr.StereoEye(0, 0, 0.5, 1),
    new vr.StereoEye(0.5, 0, 0.5, 1)
  ];

  /**
   * Cached matrices used for temporary math.
   * @type {!Array.<!vr.mat4f>}
   * @private
   */
  this.tmpMat4s_ = [vr.mat4f.create(), vr.mat4f.create()];
};


/**
 * Sets the value of the near Z plane.
 * @param {number} value New value.
 */
vr.StereoParams.prototype.setZNear = function(value) {
  this.zNear_ = value;
};


/**
 * Sets the value of the far Z plane.
 * @param {number} value New value.
 */
vr.StereoParams.prototype.setZFar = function(value) {
  this.zFar_ = value;
};


/**
 * Gets the current value of the interpupillary distance, if overriden.
 * @return {number|undefined} Current value or undefined if not set.
 */
vr.StereoParams.prototype.getInterpupillaryDistance = function() {
  return this.interpupillaryDistance_;
};


/**
 * Sets the value of the interpupillary distance override.
 * Use a value of undefined to clear the override and use device defaults.
 * @param {number|undefined} value New value or undefined to disable override.
 */
vr.StereoParams.prototype.setInterpupillaryDistance = function(value) {
  this.interpupillaryDistance_ = value;
};


/**
 * Gets the distortion scale.
 * The data in the eyes must be updated for the frame with a call to
 * {@link vr.StereoParams#update}.
 * @return {number} Distortion scale.
 */
vr.StereoParams.prototype.getDistortionScale = function() {
  return this.distortionScale_;
};


/**
 * Gets a list of eyes.
 * The data in the eyes must be updated for the frame with a call to
 * {@link vr.StereoParams#update}.
 * @return {!Array.<!vr.StereoEye>}
 */
vr.StereoParams.prototype.getEyes = function() {
  return [this.eyes_[0], this.eyes_[1]];
};


/**
 * Updates the stereo parameters with the given HMD data.
 * @param {!vr.HmdInfo} info HMD info.
 */
vr.StereoParams.prototype.update = function(info) {
  var interpupillaryDistance = info.interpupillaryDistance;
  if (this.interpupillaryDistance_ !== undefined) {
    interpupillaryDistance = this.interpupillaryDistance_;
  }

  // -- updateDistortionOffsetAndScale --

  var lensOffset = info.lensSeparationDistance / 2;
  var lensShift = info.screenSizeHorz / 4 - lensOffset;
  var lensViewportShift = 4 * lensShift / info.screenSizeHorz;
  var distortionCenterOffsetX = lensViewportShift;
  if (Math.abs(this.distortionFitX_) < 0.0001 &&
      Math.abs(this.distortionFitY_) < 0.0001) {
    this.distortionScale_ = 1;
  } else {
    var stereoAspect = info.resolutionHorz / info.resolutionVert / 2;
    var dx = this.distortionFitX_ - distortionCenterOffsetX;
    var dy = this.distortionFitY_ / stereoAspect;
    var fitRadius = Math.sqrt(dx * dx + dy * dy);
    this.distortionScale_ = info.distort(fitRadius) / fitRadius;
  }

  // -- updateComputedState --

  var percievedHalfRTDistance = info.screenSizeVert / 2 * this.distortionScale_;
  var fovY = 2 * Math.atan(percievedHalfRTDistance / info.eyeToScreenDistance);

  // -- updateProjectionOffset --

  var viewCenter = info.screenSizeHorz / 4;
  var eyeProjectionShift = viewCenter - info.lensSeparationDistance / 2;
  var projectionCenterOffset = 4 * eyeProjectionShift / info.screenSizeHorz;

  // -- update2D --
  var metersToPixels = (info.resolutionHorz / info.screenSizeHorz);
  var lensDistanceScreenPixels = metersToPixels * info.lensSeparationDistance;
  var eyeDistanceScreenPixels = metersToPixels * interpupillaryDistance;
  var offCenterShiftPixels =
      (info.eyeToScreenDistance / 0.8) * eyeDistanceScreenPixels;
  var leftPixelCenter =
      (info.resolutionHorz / 2) - lensDistanceScreenPixels / 2;
  var rightPixelCenter = lensDistanceScreenPixels / 2;
  var pixelDifference = leftPixelCenter - rightPixelCenter;
  var area2dfov = 85 * Math.PI / 180;
  var percievedHalfScreenDistance =
      Math.tan(area2dfov / 2) * info.eyeToScreenDistance;
  var vfovSize = 2.0 * percievedHalfScreenDistance / this.distortionScale_;
  var fovPixels = info.resolutionVert * vfovSize / info.screenSizeVert;
  var orthoPixelOffset =
      (pixelDifference + offCenterShiftPixels / this.distortionScale_) / 2;
  orthoPixelOffset = orthoPixelOffset * 2 / fovPixels;

  // -- updateEyeParams --
  var eyeL = this.eyes_[0];
  var eyeR = this.eyes_[1];

  eyeL.distortionCenterOffsetX = distortionCenterOffsetX;
  eyeL.distortionCenterOffsetY = 0;
  eyeR.distortionCenterOffsetX = -distortionCenterOffsetX;
  eyeR.distortionCenterOffsetY = 0;

  vr.mat4f.makeIdentity(eyeL.viewAdjustMatrix);
  eyeL.viewAdjustMatrix[12] = interpupillaryDistance / 2;
  vr.mat4f.makeIdentity(eyeR.viewAdjustMatrix);
  eyeR.viewAdjustMatrix[12] = -interpupillaryDistance / 2;

  // eye proj = proj offset * proj center
  var projMatrix = this.tmpMat4s_[0];
  var projOffsetMatrix = this.tmpMat4s_[1];
  var aspect = info.resolutionHorz / info.resolutionVert / 2;
  vr.mat4f.makePerspective(projMatrix, fovY, aspect, this.zNear_, this.zFar_);
  vr.mat4f.makeTranslation(projOffsetMatrix, projectionCenterOffset, 0, 0);
  vr.mat4f.multiply(eyeL.projectionMatrix, projOffsetMatrix, projMatrix);
  vr.mat4f.makeTranslation(projOffsetMatrix, -projectionCenterOffset, 0, 0);
  vr.mat4f.multiply(eyeR.projectionMatrix, projOffsetMatrix, projMatrix);

  // eye ortho = ortho center * ortho offset
  var orthoMatrix = this.tmpMat4s_[0];
  var orthoOffsetMatrix = this.tmpMat4s_[1];
  vr.mat4f.makeIdentity(orthoMatrix);
  orthoMatrix[0] = fovPixels / (info.resolutionHorz / 2);
  orthoMatrix[5] = -fovPixels / info.resolutionVert;
  vr.mat4f.makeTranslation(orthoOffsetMatrix, orthoPixelOffset, 0, 0);
  vr.mat4f.multiply(eyeL.orthoProjectionMatrix, orthoMatrix, orthoOffsetMatrix);
  vr.mat4f.makeTranslation(orthoOffsetMatrix, -orthoPixelOffset, 0, 0);
  vr.mat4f.multiply(eyeR.orthoProjectionMatrix, orthoMatrix, orthoOffsetMatrix);
};



// TODO(benvanik): move stereo renderer to its own file


/**
 * The post processing mode to use when rendering each eye.
 * @enum {number}
 * @memberof vr
 */
vr.PostProcessingMode = {
  /**
   * Straight pass-through with no distortion.
   */
  STRAIGHT: 0,
  /**
   * Distort for lens correction.
   */
  WARP: 1,
  /**
   * Distort and also apply chromatic aberration correction.
   */
  WARP_CHROMEAB: 2
};


/**
 * Stereo rendering controller.
 * Responsible for setting up stereo rendering and drawing the scene each frame.
 * @param {!WebGLRenderingContext} gl GL context.
 * @param {vr.StereoRenderer.Attributes=} opt_attributes Render target
 *     attributes.
 * @constructor
 *
 * @example
 * // Create a renderer with just a depth channel.
 * var stereoRenderer = new vr.StereoRenderer(gl, {
 *   alpha: false,
 *   depth: true,
 *   stencil: false
 * });
 * var state = new vr.State();
 * function renderScene() {
 *   vr.pollState(state);
 *   // TODO: process camera/controls/etc.
 *   stereoRenderer.render(state, function(eye) {
 *     // Compute the model-view matrix from the camera and the eye view adjust.
 *     var modelViewMatrix = mat4.clone(camera.modelViewMatrix);
 *     mat4.multiply(modelViewMatrix, eye.viewAdjustMatrix, modelViewMatrix);
 *     // Render using the eye projection matrix and the new model-view matrix.
 *     renderMyScene(eye.projectionMatrix, modelViewMatrix);
 *   });
 * };
 */
vr.StereoRenderer = function(gl, opt_attributes) {
  /**
   * WebGL context.
   * @type {!WebGLRenderingContext}
   * @private
   */
  this.gl_ = gl;

  /**
   * Render target attributes.
   * Values may be omitted.
   * @type {!vr.StereoRenderer.Attributes}
   * @private
   */
  this.attributes_ = opt_attributes || {};

  /**
   * Whether the renderer has been initialized yet.
   * Invalid to draw if this is false.
   * @type {boolean}
   * @private
   */
  this.isInitialized_ = false;

  /**
   * Whether a real HMD is present.
   * @type {boolean}
   * @private
   */
  this.hmdPresent_ = false;

  /**
   * Current HMD info.
   * If no HMD is present this is set to the default info used for testing.
   * @type {!vr.HmdInfo}
   * @private
   */
  this.hmdInfo_ = new vr.HmdInfo();

  /**
   * 2D quad data buffer.
   * @type {!WebGLBuffer}
   * @private
   */
  this.quadBuffer_ = gl.createBuffer();
  this.quadBuffer_.displayName = "vr.StereoRendererQuad";
  var previousBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer_);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    0, 0, 0, 0, // TL   x-x
    1, 0, 1, 0, // TR   |/
    0, 1, 0, 1, // BL   x
    1, 0, 1, 0, // TR     x
    1, 1, 1, 1, // BR    /|
    0, 1, 0, 1  // BL   x-x
  ]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, previousBuffer);

  /**
   * Straight pass-through program.
   * Does not distort the eyes as they are rendered.
   * @type {!vr.Program}
   * @private
   */
  this.straightProgram_ = new vr.Program(gl,
      "vr.StereoRendererStraight",
      vr.StereoRenderer.PROGRAM_VERTEX_SOURCE_,
      vr.StereoRenderer.STRAIGHT_FRAGMENT_SOURCE_,
      vr.StereoRenderer.PROGRAM_ATTRIBUTE_NAMES_,
      vr.StereoRenderer.PROGRAM_UNIFORM_NAMES_);

  /**
   * Warp program.
   * Draws a single eye distored to a render target.
   * @type {!vr.Program}
   * @private
   */
  this.warpProgram_ = new vr.Program(gl,
      "vr.StereoRendererWarp",
      vr.StereoRenderer.PROGRAM_VERTEX_SOURCE_,
      vr.StereoRenderer.WARP_FRAGMENT_SOURCE_,
      vr.StereoRenderer.PROGRAM_ATTRIBUTE_NAMES_,
      vr.StereoRenderer.PROGRAM_UNIFORM_NAMES_);

  /**
   * Warp program with chromatic aberration correction.
   * Draws a single eye distored to a render target.
   * @type {!vr.Program}
   * @private
   */
  this.warpChromeAbProgram_ = new vr.Program(gl,
      "vr.StereoRendererWarpChromeAb",
      vr.StereoRenderer.PROGRAM_VERTEX_SOURCE_,
      vr.StereoRenderer.WARP_CHROMEAB_FRAGMENT_SOURCE_,
      vr.StereoRenderer.PROGRAM_ATTRIBUTE_NAMES_,
      vr.StereoRenderer.PROGRAM_UNIFORM_NAMES_);

  /**
   * Current post processing mode.
   * Updated by {@link vr.StereoRenderer#setPostProcessingMode}.
   * @type {vr.PostProcessingMode}
   * @private
   */
  this.postProcessingMode_ = vr.PostProcessingMode.WARP_CHROMEAB;

  /**
   * Current post processing program.
   * Updated by {@link vr.StereoRenderer#setPostProcessingMode}.
   * @type {!vr.Program}
   * @private
   */
  this.postProcessingProgram_ = this.warpChromeAbProgram_;

  /**
   * Whether all uniform values need to be updated for the program.
   * This is used to prevent some redundant uniform calls for values that don't
   * change frequently.
   * @type {boolean}
   * @private
   */
  this.updateAllUniforms_ = true;

  /**
   * Framebuffer used for drawing the scene.
   * Managed by {@link vr.StereoRenderer#initialize_}.
   * @type {!WebGLFramebuffer}
   * @private
   */
  this.framebuffer_ = gl.createFramebuffer();
  this.framebuffer_.displayName = "vr.StereoRendererFB";

  /**
   * Renderbuffers attached to the framebuffer, excluding the render texture.
   * Makes for easier cleanup.
   * @type {!Array.<!WebGLRenderbuffer>}
   * @private
   */
  this.framebufferAttachments_ = [];

  /**
   * The width of the render target used for drawing the scene.
   * Managed by {@link vr.StereoRenderer#initialize_}.
   * @type {number}
   * @private
   */
  this.renderTargetWidth_ = 0;

  /**
   * The height of the render target used for drawing the scene.
   * Managed by {@link vr.StereoRenderer#initialize_}.
   * @type {number}
   * @private
   */
  this.renderTargetHeight_ = 0;

  /**
   * Render texture used for drawing the scene.
   * Managed by {@link vr.StereoRenderer#initialize_}.
   * @type {!WebGLTexture}
   * @private
   */
  this.renderTexture_ = gl.createTexture();
  this.renderTexture_.displayName = "vr.StereoRendererRT";

  /**
   * Stereo parameters.
   * These may change at any time, and should be verified each update.
   * @type {!StereoParams}
   * @private
   */
  this.stereoParams_ = new vr.StereoParams();

  /**
   * Cached matrix used for temporary math.
   * @type {!vr.mat4f.Type}
   * @private
   */
  this.tmpMat4_ = vr.mat4f.create();

  // TODO(benvanik): only link the programs required.
  // TODO(benvanik): all programs async.
  var programs = [
    this.straightProgram_,
    this.warpProgram_,
    this.warpChromeAbProgram_
  ];
  for (var n = 0; n < programs.length; n++) {
    programs[n].beginLinking();
  }
  for (var n = 0; n < programs.length; n++) {
    programs[n].endLinking();
  }

  // Startup with default options.
  this.initialize_();
};


/**
 * Render target attributes.
 * @typedef {Object}
 * @property {boolean|undefined} alpha Whether an alpha channel is required.
 * @property {boolean|undefined} depth Whether an depth channel is required.
 * @property {boolean|undefined} stencil Whether an stencil channel is required.
 */
vr.StereoRenderer.Attributes;


/**
 * The render target used for rendering the scene will be this much larger
 * than the HMD's resolution, to compensate for the resolution loss from the
 * warping shader.
 * @type {number}
 * @const
 * @private
 */
vr.StereoRenderer.RENDER_TARGET_SCALE_ = 2;


/**
 * Disposes the object.
 */
vr.StereoRenderer.prototype.dispose = function() {
  var gl = this.gl_;
  for (var n = 0; n < this.framebufferAttachments_.length; n++) {
    gl.deleteRenderbuffer(this.framebufferAttachments_[n]);
  }
  gl.deleteTexture(this.renderTexture_);
  gl.deleteFramebuffer(this.framebuffer_);
  gl.deleteBuffer(this.quadBuffer_);
  if (this.straightProgram_) {
    this.straightProgram_.dispose();
  }
  if (this.warpProgram_) {
    this.warpProgram_.dispose();
  }
  if (this.warpChromeAbProgram_) {
    this.warpChromeAbProgram_.dispose();
  }
};


/**
 * Gets the parameters used for stereo rendering.
 * @return {!vr.StereoParams} Stereo params.
 */
vr.StereoRenderer.prototype.getParams = function() {
  return this.stereoParams_;
};


/**
 * Gets the current post-processing mode.
 * @return {vr.PostProcessingMode} Post-processing mode.
 */
vr.StereoRenderer.prototype.getPostProcessingMode = function() {
  return this.postProcessingMode_;
};


/**
 * Switches the post-processing mode.
 * @param {vr.PostProcessingMode} value New mode.
 */
vr.StereoRenderer.prototype.setPostProcessingMode = function(value) {
  if (value == this.postProcessingMode_) {
    return;
  }
  this.updateAllUniforms_ = true;
  this.postProcessingMode_ = value;
  switch (value) {
    case vr.PostProcessingMode.STRAIGHT:
      this.postProcessingProgram_ = this.straightProgram_;
      break;
    case vr.PostProcessingMode.WARP:
      this.postProcessingProgram_ = this.warpProgram_;
      break;
    default:
    case vr.PostProcessingMode.WARP_CHROMEAB:
      this.postProcessingProgram_ = this.warpChromeAbProgram_;
      break;
  }
};


/**
 * Initializes the renderer when the HMD changes.
 * @private
 */
vr.StereoRenderer.prototype.initialize_ = function() {
  var gl = this.gl_;
  var info = this.hmdInfo_;

  // Only resize if required.
  if (gl.canvas.width != info.resolutionHorz) {
    // Resize canvas to HMD resolution.
    // Also ensure device pixel size is 1:1.
    gl.canvas.width = info.resolutionHorz;
    gl.canvas.height = info.resolutionVert;
    gl.canvas.style.width = gl.canvas.width + "px";
    gl.canvas.style.height = gl.canvas.height + "px";
  }

  // Resize framebuffer and validate.
  this.setupRenderTarget_(
      info.resolutionHorz * vr.StereoRenderer.RENDER_TARGET_SCALE_,
      info.resolutionVert * vr.StereoRenderer.RENDER_TARGET_SCALE_);

  // Update program uniforms next render.
  this.updateAllUniforms_ = true;

  this.isInitialized_ = true;
};


/**
 * Sets up the render target for drawing the scene.
 * @param {number} width Render target width.
 * @param {number} height Render target height.
 * @private
 */
vr.StereoRenderer.prototype.setupRenderTarget_ = function(width, height) {
  var gl = this.gl_;

  width = Math.floor(width) || 4;
  height = Math.floor(height) || 4;

  // Ignore redundant setups.
  if (this.renderTargetWidth_ == width &&
      this.renderTargetHeight_ == height) {
    return;
  }

  this.renderTargetWidth_ = width;
  this.renderTargetHeight_ = height;

  var previousFramebuffer = gl.getParameter(gl.FRAMEBUFFER_BINDING);
  var previousRenderbuffer = gl.getParameter(gl.RENDERBUFFER_BINDING);
  var previousTexture2d = gl.getParameter(gl.TEXTURE_BINDING_2D);

  gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);

  // Resize texture.
  gl.bindTexture(gl.TEXTURE_2D, this.renderTexture_);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0,
      this.attributes_.alpha ? gl.RGBA : gl.RGB,
      width, height, 0,
      this.attributes_.alpha ? gl.RGBA : gl.RGB,
      gl.UNSIGNED_BYTE, null);

  // Attach color texture.
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D,
      this.renderTexture_, 0);

  // Cleanup previous attachments.
  for (var n = 0; n < this.framebufferAttachments_.length; n++) {
    gl.deleteRenderbuffer(this.framebufferAttachments_[n]);
  }
  this.framebufferAttachments_ = [];

  // Setup depth/stencil textures.
  var depthBuffer = null;
  if (this.attributes_.depth) {
    depthBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,
        width, height);
    this.framebufferAttachments_.push(depthBuffer);
  }
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER, depthBuffer);
  var stencilBuffer = null;
  if (this.attributes_.stencil) {
    stencilBuffer = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, stencilBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.STENCIL_INDEX8, width, height);
    this.framebufferAttachments_.push(stencilBuffer);
  }
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.STENCIL_ATTACHMENT,
      gl.RENDERBUFFER, stencilBuffer);

  // Verify.
  var status = gl.FRAMEBUFFER_COMPLETE;
  // TODO(benvanik): debug only.
  status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

  gl.bindFramebuffer(gl.FRAMEBUFFER, previousFramebuffer);
  gl.bindRenderbuffer(gl.RENDERBUFFER, previousRenderbuffer);
  gl.bindTexture(gl.TEXTURE_2D, previousTexture2d);

  if (status != gl.FRAMEBUFFER_COMPLETE) {
    throw "Invalid framebuffer: " + status;
  }
};


/**
 * Gets the current interpupillary distance value.
 * @return {number} IPD value.
 */
vr.StereoRenderer.prototype.getInterpupillaryDistance = function() {
  var info = this.hmdInfo_;
  var ipd = this.stereoParams_.getInterpupillaryDistance();
  return (ipd !== undefined) ? ipd : info.interpupillaryDistance;
};


/**
 * Sets a new interpupillary distance value.
 * @param {number} value New IPD value.
 */
vr.StereoRenderer.prototype.setInterpupillaryDistance = function(value) {
  this.stereoParams_.setInterpupillaryDistance(value);
};


/**
 * Updates the stereo data and renders the scene.
 * The given callback is used to perform the render and may be called more than
 * once. It receives the eye to render and the width and height of the render
 * target.
 * @param {function(this:T, !vr.StereoEye, number, number)} callback Callback.
 * @param {T=} opt_scope Scope.
 * @template T
 */
vr.StereoRenderer.prototype.render = function(vrstate, callback, opt_scope) {
  var gl = this.gl_;

  var nowPresent = vrstate.hmd.present;
  if (nowPresent != this.hmdPresent_) {
    this.hmdPresent_ = true;
    if (nowPresent) {
      // HMD connected! Query info.
      this.hmdInfo_ = vr.getHmdInfo();
    } else {
      // Disconnected. Reset to defaults.
      this.hmdInfo_ = new vr.HmdInfo();
    }
    this.initialize_();
  }

  // Update stereo parameters based on VR state.
  this.stereoParams_.update(this.hmdInfo_);

  // Skip drawing if not ready.
  if (!this.isInitialized_) {
    return;
  }

  // Render.
  var eyes = this.stereoParams_.getEyes();
  for (var n = 0; n < eyes.length; n++) {
    var eye = eyes[n];

    // Render to the render target.
    // The user will clear if needed.
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer_);
    gl.viewport(
        eye.viewport[0] * this.renderTargetWidth_,
        eye.viewport[1] * this.renderTargetHeight_,
        eye.viewport[2] * this.renderTargetWidth_,
        eye.viewport[3] * this.renderTargetHeight_);
    callback.call(opt_scope,
        eye, this.renderTargetWidth_, this.renderTargetHeight_);

    // Distort to the screen.
    // TODO(benvanik): allow the user to specify a render target?
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    this.renderEye_(eye);
  }

  // User shouldn't be doing anything after this. Flush now.
  gl.flush();
};


/**
 * Renders the given eye to the target framebuffer with distortion.
 * @param {!StereoEye} eye Eye to render.
 * @private
 */
vr.StereoRenderer.prototype.renderEye_ = function(eye) {
  var gl = this.gl_;

  // Source the input texture.
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, this.renderTexture_);

  // Activate program.
  var program = this.postProcessingProgram_;
  program.use();

  // Update all uniforms, if needed.
  if (this.updateAllUniforms_) {
    this.updateAllUniforms_ = false;
    gl.uniform1i(program.uniforms["u_tex0"], 0);
    gl.uniform4fv(program.uniforms["u_hmdWarpParam"],
        this.hmdInfo_.distortionK);
    gl.uniform4fv(program.uniforms["u_chromAbParam"],
        this.hmdInfo_.chromaAbCorrection);
  }

  // Calculate eye uniforms for offset.
  var fullWidth = this.hmdInfo_.resolutionHorz;
  var fullHeight = this.hmdInfo_.resolutionVert;
  var x = eye.viewport[0];
  var y = eye.viewport[1];
  var w = eye.viewport[2];
  var h = eye.viewport[3];
  var aspect = (w * fullWidth) / (h * fullHeight);
  var scale = 1 / this.stereoParams_.getDistortionScale();

  // Texture matrix used to scale the input render target.
  var texMatrix = this.tmpMat4_;
  vr.mat4f.makeRect(texMatrix, x, y, w, h);
  gl.uniformMatrix4fv(program.uniforms["u_texMatrix"], false,
      texMatrix);

  gl.uniform2f(program.uniforms["u_lensCenter"],
      x + (w + eye.distortionCenterOffsetX / 2) / 2, y + h / 2);
  gl.uniform2f(program.uniforms["u_screenCenter"],
      x + w / 2, y + h / 2);
  gl.uniform2f(program.uniforms["u_scale"],
      w / 2 * scale, h / 2 * scale * aspect);
  gl.uniform2f(program.uniforms["u_scaleIn"],
      2 / w, 2 / h / aspect);

  // Viewport (in screen coordinates).
  gl.viewport(x * fullWidth, 0, w * fullWidth, fullHeight);

  // Setup attribs.
  var a_xy = program.attributes.a_xy;
  var a_uv = program.attributes.a_uv;
  gl.enableVertexAttribArray(a_xy);
  gl.enableVertexAttribArray(a_uv);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer_);
  gl.vertexAttribPointer(a_xy, 2, gl.FLOAT, false, 4 * 4, 0);
  gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, 4 * 4, 2 * 4);

  // Draw the quad.
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  // NOTE: the user must cleanup attributes themselves.
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindTexture(gl.TEXTURE_2D, null);
};


/**
 * Attribute names for the programs.
 * @type {!Array.<string>}
 * @private
 */
vr.StereoRenderer.PROGRAM_ATTRIBUTE_NAMES_ = [
  "a_xy", "a_uv"
];


/**
 * Uniform names for the programs. Some may be unused.
 * @type {!Array.<string>}
 * @private
 */
vr.StereoRenderer.PROGRAM_UNIFORM_NAMES_ = [
  "u_texMatrix",
  "u_tex0",
  "u_lensCenter", "u_screenCenter", "u_scale", "u_scaleIn",
  "u_hmdWarpParam", "u_chromAbParam"
];


/**
 * Source code for the shared vertex shader.
 * @type {string}
 * @const
 * @private
 */
vr.StereoRenderer.PROGRAM_VERTEX_SOURCE_ = [
  "attribute vec2 a_xy;",
  "attribute vec2 a_uv;",
  "varying vec2 v_uv;",
  "uniform mat4 u_texMatrix;",
  "void main() {",
  "  gl_Position = vec4(2.0 * a_xy - 1.0, 0.0, 1.0);",
  "  v_uv = (u_texMatrix * vec4(a_uv, 0.0, 1.0)).xy;",
  "}"
].join("\n");


/**
 * Source code for the warp fragment shader in debug mode.
 * This just passes the texture right through.
 * @type {string}
 * @const
 * @private
 */
vr.StereoRenderer.STRAIGHT_FRAGMENT_SOURCE_ = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform sampler2D u_tex0;",
  "void main() {",
  "  gl_FragColor = texture2D(u_tex0, v_uv);",
  "}"
].join("\n");


/**
 * Source code for the warp fragment shader.
 * @type {string}
 * @const
 * @private
 */
vr.StereoRenderer.WARP_FRAGMENT_SOURCE_ = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform sampler2D u_tex0;",
  "uniform vec2 u_lensCenter;",
  "uniform vec2 u_screenCenter;",
  "uniform vec2 u_scale;",
  "uniform vec2 u_scaleIn;",
  "uniform vec4 u_hmdWarpParam;",
  "vec2 hmdWarp(vec2 texIn) {",
  "  vec2 theta = (texIn - u_lensCenter) * u_scaleIn;",
  "  float rSq = theta.x * theta.x + theta.y * theta.y;",
  "  vec2 theta1 = theta * (u_hmdWarpParam.x + u_hmdWarpParam.y * rSq + ",
  "      u_hmdWarpParam.z * rSq * rSq + u_hmdWarpParam.w * rSq * rSq * rSq);",
  "  return u_lensCenter + u_scale * theta1;",
  "}",
  "void main() {",
  "  vec2 tc = hmdWarp(v_uv);",
  "  if (any(notEqual(clamp(tc, u_screenCenter - vec2(0.25, 0.5), ",
  "      u_screenCenter + vec2(0.25, 0.5)) - tc, vec2(0.0, 0.0)))) {",
  "    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
  "  } else {",
  //"    gl_FragColor = vec4(0.0, tc.xy, 1.0);",
  "    gl_FragColor = texture2D(u_tex0, tc);",
  "  }",
  "}"
].join("\n");


/**
 * Source code for the warp fragment shader that also fixes
 * chromatic aberration.
 * @type {string}
 * @const
 * @private
 */
vr.StereoRenderer.WARP_CHROMEAB_FRAGMENT_SOURCE_ = [
  "precision highp float;",
  "varying vec2 v_uv;",
  "uniform sampler2D u_tex0;",
  "uniform vec2 u_lensCenter;",
  "uniform vec2 u_screenCenter;",
  "uniform vec2 u_scale;",
  "uniform vec2 u_scaleIn;",
  "uniform vec4 u_hmdWarpParam;",
  "uniform vec4 u_chromAbParam;",
  "void main() {",
  "  vec2 theta = (v_uv - u_lensCenter) * u_scaleIn; // Scales to [-1, 1]",
  "  float rSq = theta.x * theta.x + theta.y * theta.y;",
  "  vec2 theta1 = theta * (u_hmdWarpParam.x + u_hmdWarpParam.y * rSq +",
  "      u_hmdWarpParam.z * rSq * rSq +",
  "      u_hmdWarpParam.w * rSq * rSq * rSq);",
  "  vec2 thetaBlue = theta1 * (u_chromAbParam.z + u_chromAbParam.w * rSq);",
  "  vec2 tcBlue = u_lensCenter + u_scale * thetaBlue;",
  "  if (any(notEqual(clamp(tcBlue, u_screenCenter - vec2(0.25, 0.5),",
  "      u_screenCenter + vec2(0.25, 0.5)) - tcBlue, vec2(0.0, 0.0)))) {",
  "    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
  "    return;",
  "  }",
  "  vec2 tcGreen = u_lensCenter + u_scale * theta1;",
  "  vec2 thetaRed = theta1 * (u_chromAbParam.x + u_chromAbParam.y * rSq);",
  "  vec2 tcRed = u_lensCenter + u_scale * thetaRed;",
  "  gl_FragColor = vec4(",
  "      texture2D(u_tex0, tcRed).r,",
  "      texture2D(u_tex0, tcGreen).g,",
  "      texture2D(u_tex0, tcBlue).b,",
  "      1);",
  "}"
].join("\n");



/**
 * @global
 * @alias module vr
 */
global.vr = vr;

})(window);

/**
 * @author troffmo5 / http://github.com/troffmo5
 *
 * Effect to render the scene in stereo 3d side by side with lens distortion.
 * It is written to be used with the Oculus Rift (http://www.oculusvr.com/) but
 * it works also with other HMD using the same technology
 */

THREE.OculusRiftEffect = function ( renderer, options ) {
	// worldFactor indicates how many units is 1 meter
	var worldFactor = (options && options.worldFactor) ? options.worldFactor: 1.0;

	// Specific HMD parameters
	var HMD = jThree.extend( {
		// Parameters from the Oculus Rift DK1
		hResolution: 1280,
		vResolution: 800,
		hScreenSize: 0.14976,
		vScreenSize: 0.0936,
		interpupillaryDistance: 0.064,
		lensSeparationDistance: 0.064,
		eyeToScreenDistance: 0.041,
		distortionK : [1.0, 0.22, 0.24, 0.0],
		chromaAbParameter: [ 0.996, -0.004, 1.014, 0.0]
	}, options || {} );

	// Perspective camera
	var pCamera = new THREE.PerspectiveCamera();
	pCamera.matrixAutoUpdate = false;
	pCamera.target = new THREE.Vector3();

	// Orthographic camera
	var oCamera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
	oCamera.position.z = 1;

	// pre-render hooks
	this.preLeftRender = function() {};
	this.preRightRender = function() {};

	var emptyColor = new THREE.Color("#000");

	// Render target
	var RTParams = { minFilter: THREE.LinearFilter, magFilter: THREE.NearestFilter, format: THREE.RGBAFormat };
	var renderTargetL;
	var renderTargetR;
	var RTMaterialL = new THREE.ShaderMaterial( {
		uniforms: {
			"texid": { type: "t" },
			"scale": { type: "v2", value: new THREE.Vector2(1.0,1.0) },
			"scaleIn": { type: "v2", value: new THREE.Vector2(1.0,1.0) },
			"lensCenter": { type: "v2", value: new THREE.Vector2(0.0,0.0) },
			"hmdWarpParam": { type: "v4", value: new THREE.Vector4(1.0,0.0,0.0,0.0) },
			"chromAbParam": { type: "v4", value: new THREE.Vector4(1.0,0.0,0.0,0.0) }
		},
		vertexShader: [
			"varying vec2 vUv;",
			"void main() {",
			" vUv = uv;",
			"	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
			"}"
		].join("\n"),

		fragmentShader: [
			"uniform vec2 scale;",
			"uniform vec2 scaleIn;",
			"uniform vec2 lensCenter;",
			"uniform vec4 hmdWarpParam;",
			"uniform vec4 chromAbParam;",
			"uniform sampler2D texid;",
			"varying vec2 vUv;",
			"void main()",
			"{",
			"  vec2 uv = (vUv*2.0)-1.0;", // range from [0,1] to [-1,1]
			"  vec2 theta = (uv-lensCenter)*scaleIn;",
			"  float rSq = theta.x*theta.x + theta.y*theta.y;",
			"  vec2 rvector = theta*(hmdWarpParam.x + hmdWarpParam.y*rSq + hmdWarpParam.z*rSq*rSq + hmdWarpParam.w*rSq*rSq*rSq);",
			"  vec2 rBlue = rvector * (chromAbParam.z + chromAbParam.w * rSq);",
			"  vec2 tcBlue = (lensCenter + scale * rBlue);",
			"  tcBlue = (tcBlue+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  if (any(bvec2(clamp(tcBlue, vec2(0.0,0.0), vec2(1.0,1.0))-tcBlue))) {",
			"    gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);",
			"    return;}",
			"  vec2 tcGreen = lensCenter + scale * rvector;",
			"  tcGreen = (tcGreen+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  vec2 rRed = rvector * (chromAbParam.x + chromAbParam.y * rSq);",
			"  vec2 tcRed = lensCenter + scale * rRed;",
			"  tcRed = (tcRed+1.0)/2.0;", // range from [-1,1] to [0,1]
			"  gl_FragColor = vec4(texture2D(texid, tcRed).r, texture2D(texid, tcGreen).g, texture2D(texid, tcBlue).b, 1);",
			"}"
		].join("\n")
	} );
	var RTMaterialR = RTMaterialL.clone();

	var meshL = new THREE.Mesh( new THREE.PlaneGeometry( 1, 2 ), RTMaterialL ),
		meshR = new THREE.Mesh( new THREE.PlaneGeometry( 1, 2 ), RTMaterialR );

	meshL.position.x = -.5;
	meshR.position.x = .5;

	// Final scene
	var finalScene = new THREE.Scene();
	finalScene.add( oCamera );
	finalScene.add( meshL );
	finalScene.add( meshR );

    var left = {}, right = {};
    var distScale = 1.0;
	this.setHMD = function(v) {
		HMD = v;
		// Compute aspect ratio and FOV
		var aspect = HMD.hResolution / (2*HMD.vResolution);

		// Fov is normally computed with:
		//   THREE.Math.radToDeg( 2*Math.atan2(HMD.vScreenSize,2*HMD.eyeToScreenDistance) );
		// But with lens distortion it is increased (see Oculus SDK Documentation)
		var r = -1.0 - (4 * (HMD.hScreenSize/4 - HMD.lensSeparationDistance/2) / HMD.hScreenSize);
		distScale = (HMD.distortionK[0] + HMD.distortionK[1] * Math.pow(r,2) + HMD.distortionK[2] * Math.pow(r,4) + HMD.distortionK[3] * Math.pow(r,6));
		var fov = THREE.Math.radToDeg(2*Math.atan2(HMD.vScreenSize*distScale, 2*HMD.eyeToScreenDistance));

		// Compute camera projection matrices
		var proj = (new THREE.Matrix4()).makePerspective( fov, aspect, 0.3, 10000 );
		var h = 4 * (HMD.hScreenSize/4 - HMD.interpupillaryDistance/2) / HMD.hScreenSize;
		left.proj = ((new THREE.Matrix4()).makeTranslation( h, 0.0, 0.0 )).multiply(proj);
		right.proj = ((new THREE.Matrix4()).makeTranslation( -h, 0.0, 0.0 )).multiply(proj);

		// Compute camera transformation matrices
		left.tranform = (new THREE.Matrix4()).makeTranslation( -worldFactor * HMD.interpupillaryDistance/2, 0.0, 0.0 );
		right.tranform = (new THREE.Matrix4()).makeTranslation( worldFactor * HMD.interpupillaryDistance/2, 0.0, 0.0 );


		// Distortion shader parameters
		var lensShift = 4 * (HMD.hScreenSize/4 - HMD.lensSeparationDistance/2) / HMD.hScreenSize;
		left.lensCenter = new THREE.Vector2(lensShift, 0.0);
		right.lensCenter = new THREE.Vector2(-lensShift, 0.0);

		RTMaterialL.uniforms["hmdWarpParam"].value = new THREE.Vector4(HMD.distortionK[0], HMD.distortionK[1], HMD.distortionK[2], HMD.distortionK[3]);
		RTMaterialL.uniforms["chromAbParam"].value = new THREE.Vector4(HMD.chromaAbParameter[0], HMD.chromaAbParameter[1], HMD.chromaAbParameter[2], HMD.chromaAbParameter[3]);
		RTMaterialL.uniforms["scaleIn"].value = new THREE.Vector2(1.0,1.0/aspect);
		RTMaterialL.uniforms["scale"].value = new THREE.Vector2(1.0/distScale, 1.0*aspect/distScale);

		RTMaterialR.uniforms["hmdWarpParam"].value = new THREE.Vector4(HMD.distortionK[0], HMD.distortionK[1], HMD.distortionK[2], HMD.distortionK[3]);
		RTMaterialR.uniforms["chromAbParam"].value = new THREE.Vector4(HMD.chromaAbParameter[0], HMD.chromaAbParameter[1], HMD.chromaAbParameter[2], HMD.chromaAbParameter[3]);
		RTMaterialR.uniforms["scaleIn"].value = new THREE.Vector2(1.0,1.0/aspect);
		RTMaterialR.uniforms["scale"].value = new THREE.Vector2(1.0/distScale, 1.0*aspect/distScale);

		// Create render target
		if ( renderTargetL ) renderTargetL.dispose();
		renderTargetL = new THREE.WebGLRenderTarget( HMD.hResolution*distScale/2, HMD.vResolution*distScale, RTParams );
		RTMaterialL.uniforms[ "texid" ].value = renderTargetL;

		// Create render target
		if ( renderTargetR ) renderTargetR.dispose();
		renderTargetR = new THREE.WebGLRenderTarget( HMD.hResolution*distScale/2, HMD.vResolution*distScale, RTParams );
		RTMaterialR.uniforms[ "texid" ].value = renderTargetR;

	};
	this.getHMD = function() {return HMD};

	this.setHMD(HMD);	

	this.setSize = function ( width, height ) {

		renderer.setSize( width, height );
	};

	this.render = function ( scene, camera ) {
		var cc = renderer.getClearColor().clone();

		// Clear
		renderer.setClearColor(emptyColor);
		renderer.clear();
		renderer.setClearColor(cc);

		// camera parameters
		if (camera.matrixAutoUpdate) camera.updateMatrix();

		// Render left
		this.preLeftRender();

		pCamera.projectionMatrix.copy(left.proj);

		pCamera.matrix.copy(camera.matrix).multiply(left.tranform);
		pCamera.matrixWorldNeedsUpdate = true;

		RTMaterialL.uniforms["lensCenter"].value = left.lensCenter;
		renderer.render( scene, pCamera, renderTargetL, true );

		// Render right
		this.preRightRender();

		pCamera.projectionMatrix.copy(right.proj);

		pCamera.matrix.copy(camera.matrix).multiply(right.tranform);
		pCamera.matrixWorldNeedsUpdate = true;

		RTMaterialR.uniforms["lensCenter"].value = right.lensCenter;
		renderer.render( scene, pCamera, renderTargetR, true );

		renderer.render( finalScene, oCamera );

	};

};

!function() {

var Oculus = function( selector ) {
	var that = this;
	this.isInstalled = vr.isInstalled();
	this.rdrObj = jThree( selector || "rdr:first" ).resize( function() { that.resize(); } );
	this.rdr = this.rdrObj.three( 0 );

	this.scene = jThree.three( jThree.getScene( this.rdr ) );
	this.canvas = jThree.getCanvas( this.rdr );

	this.camera = jThree.three( jThree.getCamera( this.rdr ) );
	this.camera.useQuaternion = this.isInstalled && true;

	this.effect = new THREE.OculusRiftEffect( this.rdr, {
		worldFactor: 10
	} );

	this.vrstate = new vr.State,
	this.quaternion = new THREE.Quaternion;

};

Oculus.prototype = {
	constructor: Oculus,
	get tracking() {
		return this.camera.useQuaternion;
	},
	set tracking( bool ) {
		this.camera.useQuaternion = !!bool;
	},
	resize: function() {
		if ( !this.playing ) return;
		var hmd = this.effect.getHMD();
		hmd.vResolution = this.canvas.clientHeight;
		hmd.hResolution = hmd.vResolution / 10 * 16;
		this.effect.setHMD( hmd );
		this.rdr.setViewport( ( this.canvas.clientWidth - hmd.hResolution ) /2, 0, this.canvas.clientWidth - ( this.canvas.clientWidth - hmd.hResolution ), this.canvas.clientHeight );
	},
	start: function() {

		var that = this;
		this.playing = true;
		this.rdrObj.attr( "rendering", "false" );
		this.rdr.autoClear = false;

		this.resize();

		vr.load( function ( err ) {

			that.loadError = err;
			var rdr = that.rdr, j, elem,
				vrstate = that.vrstate,
				quaternion = that.quaternion,
				scene = that.scene,
				camera = that.camera,
				visible = [];

			jThree.update( that.updateFn = function( delta, elapsed ) {

				for ( ( j = rdr.__updateFn.length ) && ( elem = rdr.userData.dom ); j; ) {
					rdr.__updateFn[ --j ].call( elem, delta, elapsed );
				}

				if ( vr.pollState( vrstate ) && vrstate.hmd.present && camera.rotationAutoUpdate ) {
					camera.quaternion.set( vrstate.hmd.rotation[ 0 ], vrstate.hmd.rotation[ 1 ], vrstate.hmd.rotation[ 2 ], vrstate.hmd.rotation[ 3 ] );
				}

				for ( j = rdr.__renderTarget.length; j; ) {
					elem = rdr.__renderTarget[ --j ];

					elem.__invisible && elem.__invisible.forEach( function( obj ) {

						if ( jThree.styleHooks.display.get( obj ) ) {
							visible.push( obj );
							jThree.styleHooks.display.set( obj, false );
						}

					} );

					rdr.render( elem.__camera.userData.scene, elem.__camera, elem );

					visible.forEach( function( obj ) {
						jThree.styleHooks.display.set( obj, true );
					} );
					visible.length = 0;

				}

				that.effect.render( scene, camera );

			} );

		} );

		return this;
	},
	stop: function() {
		this.playing = false;
		this.rdrObj.attr( "rendering", "true" );
		this.rdr.autoClear = true;
		jThree.update( this.updateFn, false );
		this.rdr.setViewport( 0, 0, this.canvas.clientWidth, this.canvas.clientHeight );
		return this;
	}
};

jThree.Oculus = function( selector ) {
	return new Oculus( selector );
};

}();window.misc = {
	drawFloor: function( ctx, base, color ) {

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

	},
	requestFullscreen: function( target ) {

		if (target.webkitRequestFullscreen) {
			target.webkitRequestFullscreen(); //Chrome15+, Safari5.1+, Opera15+
		} else if (target.mozRequestFullScreen) {
			target.mozRequestFullScreen(); //FF10+
		} else if (target.msRequestFullscreen) {
			target.msRequestFullscreen(); //IE11+
		} else if (target.requestFullscreen) {
			target.requestFullscreen(); // HTML5 Fullscreen API仕様
		} else {
			alert("ご利用のブラウザはフルスクリーン操作に対応していません");
			return;
		}
	},
	exitFullscreen: function() {
		if ( document.exitFullscreen ) {
			document.exitFullscreen(); //HTML5 Fullscreen API仕様
		} else if ( document.cancelFullScreen ) {
			document.cancelFullScreen(); //Gecko:FullScreenAPI仕様
		} else if ( document.webkitCancelFullScreen ) {
			document.webkitCancelFullScreen(); //Chrome, Safari, Opera
		} else if ( document.mozCancelFullScreen ) {
			document.mozCancelFullScreen(); //Firefox
		} else {
			document.msExitFullscreen();
		}
	},

	handleFSevent: function() {
		if( (document.webkitFullscreenElement && document.webkitFullscreenElement !== null)
		 || (document.mozFullScreenElement && document.mozFullScreenElement !== null)
		 || (document.msFullscreenElement && document.msFullscreenElement !== null)
		 || (document.fullScreenElement && document.fullScreenElement !== null) ) {
			misc.fullMode = true;
		}else{
			misc.fullMode = false;
			misc.exitFn();
		}
	},
	fullMode: false,
	exitFn: function() {}
};

document.addEventListener("webkitfullscreenchange", misc.handleFSevent, false);
document.addEventListener("mozfullscreenchange",misc. handleFSevent, false);
document.addEventListener("MSFullscreenChange", misc.handleFSevent, false);
document.addEventListener("fullscreenchange", misc.handleFSevent, false);}.toString() +'()</script>';
	}
};


var jThree = window.jThree || {};
jThree.Player = Player;
window.jThree = jThree;

})();