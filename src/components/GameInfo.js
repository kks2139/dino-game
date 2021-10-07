class GameInfo {
    constructor({targ, onClickButton}){
        this.data = {
            score: 0
        }
        this.onClickButton = onClickButton;
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('GameInfo');
        targ.appendChild(this.ROOT);

        this.render();
    }

    setData = (newData)=>{
        this.data = newData;
        this.score.textContent = this.data.score;
    }

    render = ()=>{
        this.ROOT.innerHTML = `
            <div class='menu-box'>
                <div class='score'>Score : <span>${this.data.score}</span></div>
                <div class='buttons'>
                    <div class='btn' data-type='reset'>처음부터</div>
                    <div class='btn' data-type='stop'>멈추기</div>
                </div>
            </div>
        `;
        const btnBox = this.ROOT.querySelector('div.menu-box');
        btnBox.onclick = this.onClickButton;
        this.score = this.ROOT.querySelector('div.score > span');
    }
}

export default GameInfo;