Thank you for downloading the "jThree v2". 

jThree is an inline WebGL library to be moved by jQuery to write a tag.
You can also exploit THREE object because it uses a three.js to the core. 

you need to load it (it was tested with v2.0.0) jQuery before jThree body. 
jThree does not affect jQuery and the $ object. 

Playback of the MMD has been realized by jThree.MMD.js is a plug-in MMD. 
This has been based on creating the cooperation of the author katwat who is a leading library in the same field of "mmd.three.js". 
has an article of the core technology blog katwat's. : Http: //www20.atpages.jp/katwat/wp/ 
You need to read one of ammo.js physics engine library to use when. 

Courtesy the model data than AniMasa's famous MMD standard model. 
animasasa https://twitter.com/animasasa: Twitter account of AniMasa's 

Courtesy from the blue sky image Memeta's Sky Dome (celestial sphere) for. 
Please read it before using because there is a readme.txt in the data / img directory. 
mmdeola https://twitter.com/mmdeola: Twitter account of Me-meFutoshi's 

Motion of the camera and the model was courtesy from pokky's. 
Please read it before using because there is .txt I read in data / vmd directory. 
@ pokky_2525 https://twitter.com/pokky_2525: Twitter account of pokky's 

Courtesy from OyuugiP's data model of a house. 
Please read it before using because there is .txt I read in data / house directory. 

jThree became great library developers themselves also enough to thrilled with the cooperation and efforts of creators and excellent programmers of many. 
We would like to thank to take this opportunity. 

The honor of the library developers the best beginning with the jQuery and three.js, 
It has been released as open source software of the MIT license also jThree. 


Matsuda Mitsuhide jThree developers

Please contact one of the following, if fault found. 
E-mail form: http: //jthree.jp/support/ 
Corporate Twitter:jThree_jp https://twitter.com/jThree_jp 
Developers Twitter:m_mitsuhide https://twitter.com/m_mitsuhide 

================================================== ========================= 
Tips v2 use jThree 

There is a series of articles in Codezine commentary old version of (v1.5.1). 
http://codezine.jp/article/corner/522 

Please imagine reading the code of each HTML file in the sample directory of how to use jThree v2.
We work hard so that you are able to post new commentary on a medium somewhere. 
major changes and additions from v1.5.1 are as follows.
1)For attribute name and tag name, rename gmtÅÀgeo, to mtrÅÀmtl (also works with older, but does not support the following)
2)Add (equivalent to Quaternion.setFromAxisAngle of three.js) up, quaternion, qtAxisAngle to CSS
3)Possible to GOML description to HTML inline. (The. An XML declaration of GOML became unnecessary along with it)
4)It corresponds to the dynamic changes of the mesh attributes geo tag (formerly gmt attribute).
5)corresponds to the reading of the external data in the model tag (formerly gmt tag) geo tag. (Requires plug-in to each data format)
6)Possible to specify URL of geo 3D object tag, model, to the motion attributes.
7)It automatically adjusts the aspect ratio of the frame resize elements without resizing the browser be detected.

In addition, the following problems are unresolved.
1)data shared across multiple canvas between
2)dynamic change of mtl attribute
3)bone or morph animation corresponding external data of MMD (pmx file) other than
4)ShaderMaterial, MeshFaceMaterial corresponding
5)It will not be drawn to the child element of the scene other than the camera

Å¶ publication of jThree.Player.js corresponding to jThree v2 is undecided.