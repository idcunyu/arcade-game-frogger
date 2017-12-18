/*
 *封装的方法
 */
// addClass-添加类
function addClass(ele, cls) {
  if (!ele.className.includes(cls)) {
    ele.className = ele.className == ''
      ? cls
      : ele.className + ' ' + cls;
  }
}
// removeClass-移除类
function removeClass(ele, cls) {
  if (ele.className.includes(cls)) {
    let thisClassName = ele.className.split('');
    if (ele.className.indexOf(cls) != 0) {
      thisClassName.splice(ele.className.indexOf(cls) - 1, cls.length + 1);
    } else {
      thisClassName.splice(ele.className.indexOf(cls), cls.length);
    }
    ele.className = thisClassName.join('');
  }
}

/*
 * 对于**玩家角色**：
 * 设定画布中横向每一格101px,竖向每一格83px。
 * 横向从左至右：0、101、202、303、404。——>x+0
 * 竖向从上到下：0、83、166、249、332、415。——>y-11
 *
 * 对于**敌人**：
 * 设定画布中横向每一格101px,竖向每一格83px。
 * 横向从左至右：0、101、202、303、404。——>x+20（使其在改变大小后显示居中）
 * 竖向从上到下：0、83、166、249、332、415。——>y+45（使其在改变大小后处于应该在的位置，并显示居中）
 */
let horNum = [0,101,202,303,404];
let verNum = [0,83,166,249,332,415];
let verNumEnemy = [83,166,249,332];

const victory = document.getElementsByClassName('victory');
const playAgain = document.getElementsByClassName('play-again');

/*
 * 敌人类
 */
var Enemy = function(x = 0, y = 83 ,speed = 1000) {
  // 要应用到每个敌人的实例的变量写在这里
  // 我们已经提供了一个来帮助你实现更多

  // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
  this.sprite = 'images/enemy-bug.png';

  // x,y
  this.x = x;
  this.y = y;

  this.speed = speed;
};

// 在屏幕上显示出敌人
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x-81, this.y+45,60,102);

};

// 更新敌人的位置（参数: dt ，表示时间间隙）
Enemy.prototype.update = function(dt) {
  // 应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的
  if(this.x<=606){
    this.x+=Math.round(this.speed*dt);
  }else{
    this.x=0;
    this.y=verNumEnemy[Math.floor((Math.random()*verNumEnemy.length))]-20;
    this.speed=60+Math.round(Math.random()*100);
  }
};


/*
 * 玩家类
 */
var Player = function(x = 202, y = 415) {
  // 玩家的图片或者雪碧图
  this.sprite = 'images/char-boy.png';

  this.x=x;
  this.y=y;
};

// 在屏幕上显示出玩家角色
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y-11);
};

// 更新玩家的位置（参数: dt ，表示时间间隙）
Player.prototype.update = function(dt) {
  // 应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上都是以同样的速度运行的

};

// 通过键盘的方向键输入来控制玩家的移动
Player.prototype.handleInput = function(keyNum) {
  if(keyNum==='left'||keyNum==='A'&&this.x!==0&&this.y>=83){
    this.x-=101;
  }else if(keyNum=='up'||keyNum==='W'&&this.y>=83){
    this.y-=83;
    // 到达河道，回到初始位置
    if(this.y<83){
      victory[0].style.top = "300px";
      addClass(victory[0],'finalShowUI');
      allEnemies.splice(0,allEnemies.length);
      playAgain[0].onclick=function(){
        removeClass(victory[0],'finalShowUI');
        addClass(victory[0],'finalShowOutUI');
        setTimeout(function() {
          removeClass(victory[0],'finalShowOutUI');
          victory[0].style.top = "-2000px";
          addEnemies(5);
          player.x=202;
          player.y=415;
        }, 1000);

      }
    }
  }else if(keyNum==='right'||keyNum==='D'&&this.x!==404&&this.y>=83){
    this.x+=101;
  }else if(keyNum==='down'||keyNum==='S'&&this.y!==415&&this.y>=83){
    this.y+=83;
  }
};

/*
 * 确认是否碰撞的方法checkCollision
 */
 Player.prototype.checkCollisions=function() {
   for(let i=0;i<allEnemies.length;i++){
     if(Math.round(this.y-allEnemies[i].y)<40&&Math.round(this.y-allEnemies[i].y>0)){
       if(Math.round(this.x-allEnemies[i].x)<-50&&Math.round(this.x-allEnemies[i].x)>-155){
         setTimeout(function(){
           player.y=415;
         },80);
       }
     }
   }
 }


/*
 * 实例化所需要的所有对象
 */
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];
// 向allEnemies数组中添加敌人，enemyNum是敌人数量（此处我设为5）
function addEnemies(enemyNum){
  for(let i=0;i<enemyNum;i++){
    allEnemies.push(new Enemy(0, verNumEnemy[Math.floor((Math.random()*verNumEnemy.length))]-20,60+Math.random()*100));
  }
}

addEnemies(5);
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();




/*
 * 这段代码监听游戏玩家的键盘点击事件，
 * 并且代表将按键的关键数字送到 Play.handleInput()方法里面。
 * 这段代码无需再做更改
 */
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    65: 'A',
    87: 'W',
    68: 'D',
    83: 'S'
  };

  player.handleInput(allowedKeys[e.keyCode]);

});
