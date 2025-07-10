/*
project.json文件注释：http://www.cocos2d-x.org/docs/manual/framework/html5/v3/project-json/zh

屏幕适配说明：
cc.ResolutionPolicy = {
	EXACT_FIT:0,
	NO_BORDER:1,
	SHOW_ALL:2,
	FIXED_HEIGHT:3,
	FIXED_WIDTH:4,
	UNKNOWN:5
};
EXACT_FIT会拉伸游戏，充满整个屏幕，最简单最粗暴；
SHOW_ALL保持游戏原比例，让一边占满屏幕，另外一侧黑边；
NO_BORDER跟SHOW_ALL类似，但让短边占满屏幕，另外一侧超出屏幕，不显示黑边，一部分画面在屏幕外，无法显示；
FIXED_WIDTH和FIXED_HEIGHT都是NO_BORDER的升级版，指定那一侧充满屏幕，另外一侧超出屏幕。

cc.game说明：http://www.cocos2d-x.org/docs/manual/framework/html5/v3/cc-game/zh
事件分发说明：http://cocos2d-x.org/docs/manual/framework/html5/v3/eventManager/zh
create说明：http://cocos2d-x.org/docs/manual/framework/html5/v3/create-api/zh


cocos2d/core/sprites/CCSpriteFrameCache.js中，_getFrameConfig时，去掉cc.loader.release(url); 防止plist二次加载
frameworks\cocos2d-html5\extensions\cocostudio\armature\CCArmatureCanvasRenderCmd.js中增加125-136行，解决骨骼动画滤色失效
*/

var globalWindow = this;

cc.game.onStart = function(){
	var fs = cc.view.getFrameSize();
	var dw = fs.width;
	var dh = fs.height;
    //cc.view.enableRetina(true);
    cc.view.adjustViewPort(true);
	globalWindow.onGameStart && globalWindow.onGameStart();

	var lengthWidthRatio = (dw<dh ? dh/dw : dw/dh);
	console.log('屏幕比='+ lengthWidthRatio);

	if(lengthWidthRatio>=2){
		//超高屏，如ipx等，三星s8等
		//if(cc.sys.os == cc.sys.OS_IOS){
			//iphoneX 维持极限为640*1280，OC层上下加图片
			cc.view.setDesignResolutionSize(640,640*2-42, cc.ResolutionPolicy.SHOW_ALL);
		//}else{
			//MIX2，s8等直接全屏
		//	cc.view.setDesignResolutionSize(640,1136, cc.ResolutionPolicy.FIXED_WIDTH);
		//}
	}else if(lengthWidthRatio >= 1.7){
		//正常手机，定宽640px，高度自适应
		cc.view.setDesignResolutionSize(640,1136, cc.ResolutionPolicy.FIXED_WIDTH);
	}else{
		//pad之类的超宽设备，维持比例全显示，左右留黑边
		cc.view.setDesignResolutionSize(640,1136,cc.ResolutionPolicy.SHOW_ALL);
	}

    cc.view.resizeWithBrowserSize(true);
	console.log('屏幕尺寸='+ JSON.stringify(dw));

	if(cc.sys.os == cc.sys.OS_IOS){
		var scene = new UnZip();
		scene.run();
	}else{
		var scene = new AssetsManager();
		scene.run();

	}
};

cc.game.run();