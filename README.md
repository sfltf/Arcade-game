
前端纳米学位街机游戏克隆项目
===============================

学生应该用这个[评审标准](https://review.udacity.com/#!/rubrics/499/view))来自我检查自己提交的代码。 确认自己写的函数要是**面向对象的** -  要么是类函数（就像函数 Player 和 Enemy）要么是类的原型链上的函数比如 Enemy.prototype.checkCollisions ， 在类函数里面或者类的原型链函数里面适当的使用关键词 'this' 来引用调用该函数的对象实例。最后保证你的**readme.md**文件要写明关于如何运行和如何玩你的街机游戏的指引。

关于如何开始这个项目的更详细的指导，可以查阅这份[指南](https://gdgdocs.org/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true)。

## 青蛙过河
这是一个简单的游戏，玩家通过在键盘上按动↑→↓←来控制人物进行上右下左的移动，当人物穿过虫子所行走的道路后，并到达河的位置，表示游戏通过

### 安装

```
1. git clone https://github.com/sfltf/Arcade-game.git            
2. cd ~/document/index.html
```
###游戏相关介绍
到达指定的目录后，打开index.html文件，游戏即可运行。在运行过程中，一旦人物碰到小虫子，则立刻重置回到原来的起点。人物触碰到宝石，宝石则会重新随机出现在石块上。在通关后，会出现画面，恭喜你，通关。并且有3颗星星，小虫子也会停止移动。
