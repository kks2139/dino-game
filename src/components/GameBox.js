import GameInfo from "./GameInfo.js";

class GameBox {
    constructor({targ}){
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('GameBox');
        targ.appendChild(this.ROOT);
        this.score = 0;

        this.render();
        this.drawGame();
    }

    keyInput = (e)=>{
        if(e.code === 'Space'){

        }
    }

    drawGame = ()=>{
        // 기본값tpxl
        this.base = 250;
        this.canvas = this.ROOT.querySelector('#canvas');
        this.ctx = this.canvas.getContext('2d');
        this.dino = new Dino(this);
        this.timer = 0;
        this.cactusList = [];
        this.frameId = null;
        this.doFrame();
    }

    doFrame = ()=>{
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // 캔버스 전체 영역을 지워줌.
        this.dino.draw();
        this.timer++;

        if(this.timer % 20 === 0){
            this.GameInfo.setData({
                score: this.GameInfo.data.score + 1 
            });
        }
        if(this.timer % 100 === 0){
            const cactus = new Cactus(this);
            this.cactusList.push(cactus);
        }
        this.cactusList.forEach((c, i, arr)=>{
            c.x -= 3;
            if(c.x < -30){
                arr.splice(i, 1);
            }
            c.draw();
        });

        this.frameId = requestAnimationFrame(this.doFrame);
    }

    onClickButton = (e)=>{
        const el = e.target;
        const type = el.dataset.type;

        if(type === 'reset'){
            cancelAnimationFrame(this.frameId);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.GameInfo.setData({
                score: 0 
            });
            this.drawGame();
        }else if(type === 'stop'){
            if(this.frameId){
                el.textContent = '재시작';
                cancelAnimationFrame(this.frameId);
                this.frameId = null;
            }else{
                el.textContent = '멈추기';
                this.doFrame();
            }
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
        this.width = 40;
        this.height = 60;
        this.x = 700;
        this.y = base - this.height;
    }
    draw = ()=>{
        this.ctx.fillStyle = 'lime';
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

export default GameBox;