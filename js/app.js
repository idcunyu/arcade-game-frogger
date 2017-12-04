/*
 * 敌人类
 */
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // console.log("敌人位置移动");
    // 应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上显示出敌人
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // console.log("显示出一个敌人");
};


/*
 * 玩家类
 */
var Player=function(){
  // 玩家的图片或者雪碧图
  this.sprite = 'images/char-boy.png';
};

// 此为游戏必须的函数，用来更新玩家的位置
// 参数: dt ，表示时间间隙
Player.prototype.update = function(dt) {
    // console.log("玩家位置移动");
    // 应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
};

// 此为游戏必须的函数，用来在屏幕上显示出玩家角色
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 202,0);
    // console.log("显示出玩家！");
};

// 此为游戏必须的函数，通过键盘的方向键输入来控制玩家的移动前后左右移动
Player.prototype.handleInput = function(){

};


/*
 * 现在实例化所需要的所有对象
 * 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
 * 把玩家对象放进一个叫 player 的变量里面
 */
var e1=new Enemy();
var e2=new Enemy();
var e3=new Enemy();
var allEnemies=[e1,e2,e3];
var player=new Player();


/*
 * 这段代码监听游戏玩家的键盘点击事件，
 * 并且代表将按键的关键数字送到 Play.handleInput()方法里面。
 *
 * 不需要再更改这段代码了。
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
