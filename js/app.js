"use strict";
// 这是我们的玩家要躲避的敌人 
var Enemy = function(i, j) {
    // 要应用到每个敌人的实例的变量写在这里
    // 我们已经提供了一个来帮助你实现更多
    this.x = -10;
    this.y = 58 + 83 * i;
    this.speed = Math.floor(Math.random() * j + 2);
    // 敌人的图片或者雪碧图，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};


    // 此为游戏必须的函数，用来更新敌人的位置
    // 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed;
    //让小虫子不停地从出发点出发
    if (this.x > 550) {
        this.x = -10;
        this.speed = Math.floor(Math.random() * 5 + 3);
    }
    //如果玩家到达对岸，则小虫子停止移动
    if (player.y < 0) {
        this.speed = 0;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//实例化多个小虫子
var allEnemies = [];
for (var i = 0; i < 3; i++) {
    var enemy = new Enemy(i, 3);
    allEnemies.push(enemy);
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数

//player所拥有的属性
var Player = function() {
    this.sprite = "images/char-boy.png";
    this.x = 300;
    this.y = 400;
};

Player.prototype.update = function(dt) {
    //碰撞检测机制
    for (var i = 0; i < allEnemies.length; i++) {
        if (Math.abs(this.x - allEnemies[i].x) < 55) {
            if ((Math.abs(this.y - allEnemies[i].y)) < 40) {
                this.x = 300;
                this.y = 400;
            }
        }
    }
    //让人物超过canvas的部分消失
    if (this.y < 0) {
        ctx.globalCompositeOperation = 'source-atop';
    }
};

//重构，让Player继承Enemy.prototype.render
Player.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

//两个目的，1.让人物可以移动，2，让人物不能超出画面
Player.prototype.handleInput = function(move) {
    switch (move) {
        case "left":
        this.x = (this.x < 30) ? 3 : this.x - 101;
        break;
        case "right":
        this.x = (this.x > 400) ? 401 : this.x + 101;
        break;
        case "up":
        this.y = (this.y < -10) ? -15 : this.y - 83;
        break;
        case "down":
        this.y = (this.y > 399) ? 400 : this.y + 83;
        break;
    }
};

//当玩家到达对岸后，出现相应通关的画面
var wins = function() {
    if (player.y < 0) {
        ctx.globalCompositeOperation = 'source-over';
        document.removeEventListener('keyup', handle, false);//当玩家到达河岸后，取消事件监听器，人物无法移动
        var image = [
            'images/Star.png',
            'images/Star.png',
            'images/Star.png'
        ];
        ctx.font = "bold 40px Arial";
        ctx.strokeText("恭喜你，通关！", 150, 280);
        ctx.fillText("恭喜你，通关！", 150, 280);
        for (var i = 0; i < image.length; i++) {
            ctx.drawImage(Resources.get(image[i]), 140 + i * 80, 240);
        }
    }
};
//实例化玩家
var player = new Player();

// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面

//宝石拥有属性
var Gem = function(x, y) {
    this.sprite = 'images/Gem Orange.png';
    this.x = x;
    this.y = y;
};

//创建3个实例宝石，并且随机化宝石位置（只能在有石头的地方）
var gemOrange = [];
for (var j = 0; j < 3; j++) {
    var gem = new Gem(Math.floor(Math.random() * 5) * 101, Math.floor(Math.random() * 3) * 83 + 58);
    gemOrange.push(gem);
}

//绘制宝石
Gem.prototype.render = function() {
    Enemy.prototype.render.call(this);
};

//碰撞检测，并且将重新随机放置碰撞后的宝石位置
Gem.prototype.update = function(dt) {
    for (var j = 0; j < gemOrange.length; j++) {
        if (Math.abs(player.x - gemOrange[j].x) < 55) {
            if ((Math.abs(player.y - gemOrange[j].y)) < 40) {
                gemOrange[j].x = Math.floor(Math.random() * 5) * 101;
                gemOrange[j].y = Math.floor(Math.random() * 3) * 83 + 58;
            }
        }
    }
};
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Play.handleInput()
// 方法里面。你不需要再更改这段代码了。
var handle = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};

document.addEventListener('keyup', handle, false);
