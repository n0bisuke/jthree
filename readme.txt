「jThree v2」をダウンロードしていただきありがとうございます。

jThreeはタグで書いてjQueryで動かすインラインWebGLライブラリです。
コアにthree.jsを採用しているのでTHREEオブジェクトも活用することができます。

jThree本体より先にjQuery(v2.0.0でテストしています)を読み込む必要があります。
jThreeはjQueryと$オブジェクトに影響を与えません。

MMDの再生はMMDプラグインであるjThree.MMD.jsによって実現されています。
これは同分野での先行ライブラリである「mmd.three.js」の作者katwatさんのご協力のもと作成しております。
katwatさんのブログにコア技術の記事があります。：http://www20.atpages.jp/katwat/wp/
ご利用時には物理エンジンライブラリのammo.jsを先に読み込む必要があります。

MMD標準モデルで有名なあにまささんよりモデルデータをご提供いただきました。
あにまささんのツイッターアカウント：@animasasa　https://twitter.com/animasasa

スカイドーム（天球）用の青空画像はめめ太さんからご提供いただきました。
data/imgディレクトリにreadme.txtがありますのでご利用前に一読ください。
めめ太さんのツイッターアカウント：@mmdeola　https://twitter.com/mmdeola

モデルとカメラのモーションはpokkyさんからご提供いただきました。
data/vmdディレクトリに 読んでね.txtがありますのでご利用前に一読ください。
pokkyさんのツイッターアカウント：@pokky_2525　https://twitter.com/pokky_2525

家屋のモデルデータはお遊戯Pさんからご提供いただきました。
data/houseディレクトリに 読んでね.txtがありますのでご利用前に一読ください。

jThreeは大勢の優秀なプログラマーやクリエイターの努力と協力を得て開発者自身も感激するくらい素晴らしいライブラリになりました。
この場を借りて感謝申し上げます。

jQuery・three.jsをはじめとした最高のライブラリ開発者たちに敬意を表し、
jThreeもまたMITライセンスのオープンソースソフトウェアとして公開しております。


jThree開発者　松田光秀（jThree合同会社　代表）

不具合が見つかりましたら以下のいずれかにご連絡ください。
メールフォーム：http://jthree.jp/support/
企業ツイッター：@jThree_jp https://twitter.com/jThree_jp
開発者ツイッター：@m_mitsuhide https://twitter.com/m_mitsuhide

===========================================================================
jThree v2使い方のヒント

旧バージョン（v1.5.1）の解説はCodezineに連載記事があります。
http://codezine.jp/article/corner/522

jThree v2の使い方はsampleディレクトリの各HTMLファイルのコードを読んで想像してください。
どこかの媒体に新しい解説を掲載していただけるよう頑張っております。
v1.5.1からの主要な変更・追加は以下の通りです。
1)タグ名と属性名について、gmt⇒geo、mtr⇒mtlへ名称変更（旧式でも動作しますが次からサポートしません）
2)CSSにup,quaternion,qtAxisAngle（three.jsのQuaternion.setFromAxisAngleに相当）を追加
3)HTMLインラインへのGOML記述が可能に。（それに伴いGOMLのXML宣言が不要になりました。）
4)meshタグのgeo属性（旧gmt属性）の動的変更に対応。
5)geoタグ（旧gmtタグ）とmodelタグで外部データの読み込みに対応。（データ形式ごとにプラグインが必要です）
6)3Dオブジェクトタグのgeo,model,motion属性へのURL指定が可能に。
7)ブラウザのリサイズを伴わないフレーム要素のリサイズも検知してアスペクト比を自動調整。

なお、以下の課題が未解決です。
1)複数キャンバス間でのデータ共有
2)mtl属性の動的変更
3)MMD（pmxファイル）以外の外部データのボーンorモーフアニメーション対応
4)ShaderMaterial,MeshFaceMaterial対応
5)cameraをscene以外の子要素にすると描画されなくなる

※jThree v2に対応するjThree.Player.jsの公開は未定です。