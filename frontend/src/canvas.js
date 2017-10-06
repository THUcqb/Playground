import 'easeljs';

function init(){
    var stage = new createjs.Stage("canvas");
    var shape = new createjs.Shape();
    shape.graphics.beginStroke("#000").beginFill("#ff0000").drawRect(0, 0, 100, 100);
    stage.addChild(shape);
	stage.update();
	alert('Fuck');
}

init();