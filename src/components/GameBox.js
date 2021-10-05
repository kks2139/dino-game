class GameBox {
    constructor({targ}){
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('.GameBox');
        targ.appendChild(this.ROOT);

        this.render();
    }

    drawGame = ()=>{
        const canvas = this.ROOT.querySelector('#canvas');
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(10, 100, 100, 50);
    }

    render = ()=>{
        this.ROOT.innerHTML = `
            <canvas id='canvas' width='500' height='300'></canvas>
        `;
        this.drawGame();
    }
}

export default GameBox;