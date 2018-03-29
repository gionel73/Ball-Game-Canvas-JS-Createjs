class GameEngine {
    constructor() {
        this.fps = 70;
        this.stage = null;
        this.scoreT = 0;
        this.end = false;
        this.keyActiveLeft = false;
        this.keyActiveRight = false;
        this.hit = 0;
        this.winScore = 30;
        document.addEventListener('keydown', this.onKeyDown);
        document.addEventListener('keyup', this.onKeyUp);
    }

    load() {
        this.stage = new createjs.Stage("game");
        this.cw = this.stage.canvas.width;
        this.ch = this.stage.canvas.height;
        let bounds = new createjs.Shape();
        bounds.graphics.beginFill("#2f2f2f")
            .drawRect(0, 0, this.cw, this.ch);
        this.stage.addChild(bounds);

        // SOUND
        const sounds = [
            {
                id: "start",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522231132/game_start2.wav"
            },
            {
                id: "paddle",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522232578/hit_good_2.wav"
            },
            {
                id: "lose",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522231251/Game_lose_or_die.wav"
            },
            {
                id: "hitBad",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522232578/hit_bad_2.wav"
            },
            {
                id: "win",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522232578/Winner1.wav"
            },
            {
                id: "hitGood",
                src: "http://res.cloudinary.com/gionel73/video/upload/v1522232578/paddel_hit3.mp3"
            }
        ];
        createjs.Sound.registerSounds(sounds);
        createjs.Sound.on("fileload", this.start);

        // Top

        this.top1 = new createjs.Shape();
        this.top1.graphics.beginFill("#b30000").drawRect(0, 0, 100, 20);
        this.stage.addChild(this.top1);

        this.text1 = new createjs.Text("-5", "16px Arial", "yellow");
        this.text1.set({
            x: 45,
            y: 2
        });
        this.stage.addChild(this.text1);

        this.top5 = new createjs.Shape();
        this.top5.graphics.beginFill("#b30000").drawRect(800, 0, 100, 20);
        this.stage.addChild(this.top5);

        this.text2 = new createjs.Text("-5", "16px Arial", "yellow");
        this.text2.set({
            x: 845,
            y: 2
        });
        this.stage.addChild(this.text2);

        this.top2 = new createjs.Shape();
        this.top2.graphics.beginFill("#0080ff").drawRect(100, 0, 200, 20);
        this.stage.addChild(this.top2);

        this.text3 = new createjs.Text("+5", "16px Arial", "yellow");
        this.text3.set({
            x: 195,
            y: 2
        });
        this.stage.addChild(this.text3);

        this.top4 = new createjs.Shape();
        this.top4.graphics.beginFill("#0080ff").drawRect(600, 0, 200, 20);
        this.stage.addChild(this.top4);

        this.text4 = new createjs.Text("+5", "16px Arial", "yellow");
        this.text4.set({
            x: 695,
            y: 2
        });
        this.stage.addChild(this.text4);

        this.top3 = new createjs.Shape();
        this.top3.graphics.beginFill("green").drawRect(300, 0, 300, 20);
        this.stage.addChild(this.top3);

        this.text5 = new createjs.Text("+10", "16px Arial", "yellow");
        this.text5.set({
            x: 440,
            y: 2
        });
        this.stage.addChild(this.text5);

        // Bottom

        this.bottom1 = new createjs.Shape();
        this.bottom1.graphics.beginFill("#b30000").drawRect(0, this.ch - 20, 300, 20);
        this.stage.addChild(this.bottom1);

        this.text6 = new createjs.Text("-10", "16px Arial", "yellow");
        this.text6.set({
            x: 140,
            y: this.ch - 18
        });
        this.stage.addChild(this.text6);

        this.bottom3 = new createjs.Shape();
        this.bottom3.graphics.beginFill("#b30000").drawRect(600, this.ch - 20, 300, 20);
        this.stage.addChild(this.bottom3);

        this.text7 = new createjs.Text("-10", "16px Arial", "yellow");
        this.text7.set({
            x: 740,
            y: this.ch - 18
        });
        this.stage.addChild(this.text7);

        this.bottom2 = new createjs.Shape();
        this.bottom2.graphics.beginFill("#F95100").drawRect(300, this.ch - 20, 300, 20);
        this.stage.addChild(this.bottom2);

        this.text8 = new createjs.Text("-30", "16px Arial", "yellow");
        this.text8.set({
            x: 440,
            y: this.ch - 18
        });
        this.stage.addChild(this.text8);

        // Paddle

        this.paddle = new createjs.Shape().set({
            name: "paddle"
        });
        this.paddle.graphics.beginFill("#00FF33").drawRect(this.paddle.x, this.paddle.y, 100, 5);
        this.paddle.x = 400;
        this.paddle.y = 625;
        this.paddle.dir = 'idle';
        this.paddle.step = 7;
        this.stage.addChild(this.paddle);

        // Ball

        this.ball = new createjs.Shape().set({
            name: "ball"
        });
        this.ball.graphics.beginFill("#fff").drawCircle(this.ball.x, this.ball.y, 12);
        this.ball.x = 450;
        this.ball.y = this.ch - 51;
        this.ball.stepX = 2;
        this.ball.stepY = 6;
        this.ball.dirX = 1;
        this.ball.dirY = -1;
        this.stage.addChild(this.ball);

        // Score

        this.scoreText = new createjs.Text("Score: ", "25px Arial", "Yellow");
        this.scoreText.x = 10;
        this.scoreText.y = 30;
        this.stage.addChild(this.scoreText);

        this.score = new createjs.Text(this.scoreT, "25px Arial", "yellow").set({
            name: "score"
        });
        this.score.x = 88;
        this.score.y = 30;
        this.stage.addChild(this.score);

        // Game Over text

        this.textOver = new createjs.Text("", "68px Arial", "yellow").set({
            name: "textOver"
        });
        this.textOver.x = 250;
        this.textOver.y = 300;
        this.stage.addChild(this.textOver);

        this.setup();
    }

    // Game Logic

    setup() {
        if (!createjs.Ticker.hasEventListener('tick')) {
            createjs.Ticker.addEventListener('tick', gGameEngine.update);
            createjs.Ticker.setFPS(this.fps);
        }
    }
    
    start() {
        createjs.Sound.play("start");
    }

    onKeyDown(e) {
        e.preventDefault();
        if (!gGameEngine.keyActiveLeft) {
            if (e.keyCode == 37) {
                gGameEngine.paddle.dir = 'left';
                gGameEngine.keyActiveLeft = true;
                gGameEngine.keyActiveRight = false;
            }
        }
        if (!gGameEngine.keyActiveRight) {
            if (e.keyCode == 39) {
                gGameEngine.paddle.dir = 'right';
                gGameEngine.keyActiveRight = true;
                gGameEngine.keyActiveLeft = false;
            }
        }
    }

    onKeyUp(e) {
        if (e.keyCode == 37) {
            gGameEngine.keyActiveLeft = false;
        }
        if (e.keyCode == 39) {
            gGameEngine.keyActiveRight = false;
        }

        if (!gGameEngine.keyActiveLeft && !gGameEngine.keyActiveRight) {
            gGameEngine.paddle.dir = 'idle';
        }
    }

    collision(px, py, r, sx, sy, dx, dy) {
        // Circle(px, py, r), stepX, stepY, dirX, dirY

        // Collision left + right
        if (dx < 0) {
            if (px - r + sx * dx <= 0) {
                gGameEngine.ball.dirX = -dx;
            }
        }
        if (dx > 0) {
            if (px + r + sx * dx >= gGameEngine.cw) {
                gGameEngine.ball.dirX = -dx;
            }
        }

        // Collision top
        if (dy < 0) {
            if (py - r + sy * dy <= 20) {
                gGameEngine.ball.dirY = -dy;
                if (px < 100) {
                    gGameEngine.scoreT -= 5;
                    createjs.Sound.play("hitBad", {
                        volume: 0.6
                    });
                    gGameEngine.hit = 2;
                } else if (px < 300) {
                    gGameEngine.scoreT += 5;
                    createjs.Sound.play("hitGood", {
                        volume: 0.4
                    });
                    gGameEngine.hit = 1;
                } else if (px < 600) {
                    gGameEngine.scoreT += 10;
                    createjs.Sound.play("hitGood", {
                        volume: 0.4
                    });
                    gGameEngine.hit = 1;
                } else if (px < 800) {
                    gGameEngine.scoreT += 5;
                    createjs.Sound.play("hitGood", {
                        volume: 0.4
                    });
                    gGameEngine.hit = 1;
                } else {
                    gGameEngine.scoreT -= 5;
                    createjs.Sound.play("hitBad", {
                        volume: 0.6
                    });
                    gGameEngine.hit = 2;
                }
            }
        }

        // Collision Bottom
        if (dy > 0) {
            if (py + r + sy * dy >= gGameEngine.ch - 20) {
                gGameEngine.ball.dirY = -dy;
                if (px < 300) {
                    gGameEngine.scoreT -= 10;
                } else if (px < 600) {
                    gGameEngine.scoreT -= 30;
                } else {
                    gGameEngine.scoreT -= 10;
                }
                createjs.Sound.play("hitBad", {
                    volume: 0.6
                });
                gGameEngine.hit = 2;
            }
        }

        // Collision with paddle
        let pdX = gGameEngine.paddle.x;
        let pdY = gGameEngine.paddle.y;
        if (px + r >= pdX &&
            px - r <= pdX + 100 &&
            py + r >= 625 &&
            dy > 0) {
            createjs.Sound.play("paddle", {
                volume: 0.9
            });
            gGameEngine.ball.dirY = -dy;
            switch (gGameEngine.paddle.dir) {
                case 'left':
                    if (gGameEngine.ball.dirX > -3) {
                        gGameEngine.ball.dirX--;
                    }
                    break;
                case 'right':
                    if (gGameEngine.ball.dirX < 3) {
                        gGameEngine.ball.dirX++;
                    }
                    break;
                case 'idle':
                    if (!gGameEngine.ball.dirX) {
                        let c = Math.floor(Math.random() * 2);
                        if (c) {
                            gGameEngine.ball.dirX++;
                        } else {
                            gGameEngine.ball.dirX--;
                        }
                    }
                    break;
            }
        }
        // Show score
        gGameEngine.score.text = gGameEngine.scoreT;

        if (gGameEngine.scoreT < 0) {
            gGameEngine.gameOver("GAME OVER");
            createjs.Sound.play("lose");
        }
        if (gGameEngine.scoreT >= gGameEngine.winScore) {
            gGameEngine.gameOver("WINNER");
            gGameEngine.textOver.x = 300;
            createjs.Sound.play("win");
        }
    }

    gameOver(txt) {
        gGameEngine.end = true;
        gGameEngine.textOver.text = txt;
        gGameEngine.title(0, 9);
        document.getElementById('reset').textContent = "Start";
    }

    changeColor(color) {
        gGameEngine.score.color = color;
        setTimeout(() => {
            gGameEngine.score.color = "yellow";
        }, 150);
        setTimeout(() => {
            gGameEngine.score.color = color;
        }, 250);
        setTimeout(() => {
            gGameEngine.score.color = "yellow";
        }, 400);
        setTimeout(() => {
            gGameEngine.score.color = color;
        }, 500);
        setTimeout(() => {
            gGameEngine.score.color = "yellow";
        }, 650);

        gGameEngine.hit = 0;
    }

    title(cnt, max) {
        
        gGameEngine.textOver.color = "red";
        setTimeout(() => {
            gGameEngine.textOver.color = "yellow";
        }, 150);
        setTimeout(() => {
            gGameEngine.textOver.color = "red";
        }, 250);
        setTimeout(() => {
            gGameEngine.textOver.color = "yellow";
        }, 400);
        setTimeout(() => {
            gGameEngine.textOver.color = "red";
        }, 500);
        setTimeout(() => {
            gGameEngine.textOver.color = "yellow";
        }, 650);
        setTimeout(() => {
            gGameEngine.textOver.color = "red";
        }, 750);
        setTimeout(() => {
            gGameEngine.textOver.color = "yellow";
        }, 800);
    }

    // Animation score
    animationScore() {
        if (gGameEngine.hit == 1) {
            gGameEngine.changeColor("#64DC35");
        }
        if (gGameEngine.hit == 2) {
            gGameEngine.changeColor("#EE5A5A");
        }
    }

    update() {

        if (gGameEngine.end) {
            gGameEngine.stage.removeChild(gGameEngine.paddle);
            gGameEngine.stage.removeChild(gGameEngine.ball);
            gGameEngine.stage.getChildByName("textOver");
        } else {
            if (!gGameEngine.collision(gGameEngine.stage.getChildByName("ball").x, gGameEngine.stage.getChildByName("ball").y, 15, gGameEngine.ball.stepX, gGameEngine.ball.stepY, gGameEngine.ball.dirX, gGameEngine.ball.dirY)) {
                gGameEngine.stage.getChildByName("ball").x += gGameEngine.ball.stepX * gGameEngine.ball.dirX;
                gGameEngine.stage.getChildByName("ball").y += gGameEngine.ball.stepY * gGameEngine.ball.dirY;
            }

            gGameEngine.stage.getChildByName("paddle");
            gGameEngine.stage.getChildByName("score");
        }

        // Paddle Control
        if (gGameEngine.keyActiveLeft) {
            if (gGameEngine.paddle.dir == 'left') {
                if (gGameEngine.paddle.x > gGameEngine.paddle.step) {
                    gGameEngine.paddle.x -= gGameEngine.paddle.step;
                }
            }
        }
        if (gGameEngine.keyActiveRight) {
            if (gGameEngine.paddle.dir == 'right') {
                if (gGameEngine.cw - gGameEngine.paddle.x > 100 + gGameEngine.paddle.step) {
                    gGameEngine.paddle.x += gGameEngine.paddle.step;
                }
            }
        }
        gGameEngine.animationScore();
        gGameEngine.stage.update();
    }
}

const gGameEngine = new GameEngine();
window.init = () => {
    gGameEngine.load();
    document.getElementById('reset').addEventListener('click', () => {
        location.reload();
    });
}
