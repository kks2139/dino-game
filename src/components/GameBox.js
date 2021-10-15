import GameInfo from "./GameInfo.js";
import Pause from "./Pause.js";
import ConfirmBox from "./ConfirmBox.js";
import UT from '../utils/util.js';

class GameBox {
    constructor({targ, gameFinished}){
        this.gameFinished = gameFinished;
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('GameBox');
        targ.appendChild(this.ROOT);
        this.ConfirmBox = new ConfirmBox({
            msg: '다시 시작할까요?',
            ok: this.restart 
        });

        this.render();
        this.drawGame();
    }

    drawGame = ()=>{
        // 기본값 세팅
        this.base = 250;
        this.canvas = this.ROOT.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dino = new Dino(this);
        this.timer = 0;
        this.cactusList = [];
        this.frameId = null;
        this.jumpTop = 70;
        this.isJumping = false;
        this.isTop = false;
        this.doFrame();
    }

    doFrame = ()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 전체 영역을 지워줌.
        this.dino.draw();
        this.timer++;

        // 점수 카운팅
        if(this.timer % 20 === 0){
            this.GameInfo.setData({
                score: this.GameInfo.data.score + 1 
            });
        }
        // 점프 처리
        if(this.isJumping){
            this.distance = this.dino.y - this.jumpTop;
            if(!this.isTop){
                this.dino.y -= this.calculateJumpSpeed('up');
                if(this.dino.y < this.jumpTop){
                    this.isTop = true;
                }
            }else{
                this.dino.y += this.calculateJumpSpeed('down');
                if(this.dino.y >= this.base - this.dino.height){
                    this.dino.y = this.base - this.dino.height;
                    this.isJumping = false;
                    this.isTop = false;
                }
            }
        }
        // 선인장 생성
        if(UT.rand(80) === 1){
            const cactus = new Cactus(this);
            this.cactusList.push(cactus);
        }
        // 선인장 이동
        let collision = false;
        this.cactusList.forEach((c, i, arr)=>{
            c.draw();
            c.x -= 5;
            if(c.x < -350){
                arr.splice(i, 1);
            }
            // 충돌 체크
            if(this.isCollision(c)){
                this.stop();
                this.ConfirmBox.show();
                collision = true;
            }
        });

        if(!collision){
            this.frameId = requestAnimationFrame(this.doFrame);
        }else{
            // 충돌.. 게임끝
            this.gameFinished(this.GameInfo.getScore());
        }
    }

    isCollision = (object)=>{
        const dinoX = this.dino.x + (this.dino.width / 2);
        const dinoY = this.dino.y + (this.dino.height / 2);
        return (
            dinoX > object.x && dinoX < object.x + object.width &&
            dinoY > object.y && dinoY < object.y + object.height
        );
    }

    calculateJumpSpeed = (type)=>{
        if(type === 'up'){
            return Math.floor(this.distance / 6) || 1;
        }else{
            const res = Math.abs(this.distance) + 1;
            if(res > 7) return 7;
            else return res;
        }
    }

    stop = ()=>{
        cancelAnimationFrame(this.frameId);
        this.frameId = null;
    }

    restart = ()=>{
        this.stop();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawGame();
        this.Pause.show(false);
        this.GameInfo.setData({
            score: 0,
            btn1: '처음부터',
             btn2: '멈추기'
        });
    }

    onClickButton = (e)=>{
        const el = e.target;
        const type = el.dataset.type;

        if(type === 'reset'){
            this.restart();
        }else if(type === 'stop'){
            if(this.frameId){
                this.Pause.show(true);
                this.GameInfo.setData({btn2 : '재시작'});
                this.stop();
            }else{
                this.Pause.show(false);
                this.GameInfo.setData({btn2 : '멈추기'});
                this.doFrame();
            }
        }
    }

    keyInput = (e)=>{
        if(e.code === 'Space' || e.code === 'ArrowUp'){
            if(!this.isJumping){
                this.isJumping = true;
            }
        }else if(e.code === 'ArrowDown'){
            // 엎드리기 
        }
    }
    
    render = ()=>{
        this.GameInfo = new GameInfo({
            targ: this.ROOT,
            onClickButton: this.onClickButton
        });
        const canvasBox = document.createElement('div');
        canvasBox.className = 'canvas-box';
        canvasBox.innerHTML = `
            <div class='canvas-box'>
                <canvas id='canvas' width='800' height='300'></canvas>
            </div>
        `;
        this.ROOT.appendChild(canvasBox);
        this.Pause = new Pause({
            targ: canvasBox
        });
        if(!document.body.onkeydown){
            document.body.onkeydown = this.keyInput;
        }
    }
}

class Dino {
    constructor({ctx, base}){
        this.ctx = ctx;
        this.width = 50;
        this.height = 50;
        this.x = 30;
        this.y = base - this.height;
    }
    draw = ()=>{
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor({ctx, base}){
        this.ctx = ctx;
        this.width = 30;
        this.height = 60;
        this.x = 800;
        this.y = base - this.height;
    }
    draw = ()=>{
        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default GameBox;