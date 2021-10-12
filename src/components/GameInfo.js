class GameInfo {
    constructor({targ, onClickButton}){
        this.data = {
            score: 0,
            btn1: '처음부터',
            btn2: '멈추기'
        }
        this.onClickButton = onClickButton;
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('GameInfo');
        targ.appendChild(this.ROOT);

        this.render();
    }

    setData = (newData)=>{
        Object.assign(this.data, newData);
        this.score.textContent = this.data.score;
        this.btn1.textContent = this.data.btn1;
        this.btn2.textContent = this.data.btn2;
    }

    render = ()=>{
        this.ROOT.innerHTML = `
            <div class='menu-box'>
                <div class='score'>Score : <span>${this.data.score}</span></div>
                <div class='buttons'>
                    <div class='btn' data-type='reset'>${this.data.btn1}</div>
                    <div class='btn' data-type='stop'>${this.data.btn2}</div>
                </div>
            </div>
        `;
        const btnBox = this.ROOT.querySelector('div.menu-box');
        btnBox.onclick = this.onClickButton;

        this.score = this.ROOT.querySelector('div.score > span');
        this.btn1 = this.ROOT.querySelector('[data-type=reset]');
        this.btn2 = this.ROOT.querySelector('[data-type=stop]');
    }
}

export default GameInfo;