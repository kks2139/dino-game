class HistoryBox {
    constructor({targ}){
        this.data = {
            topScore: 0,
            scoreList: []
        };

        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('HistoryBox');
        targ.appendChild(this.ROOT);
    }

    refresh = ()=>{
        this.data.scoreList = Object.keys(sessionStorage).filter(key => key.indexOf('dino_') > -1);
        const temp = this.data.scoreList.slice();
        this.data.topScore = temp.sort((a, b)=> Number(a) - Number(b)).pop();
    }

    render = ()=>{
        

        this.ROOT.innerHTML = `
            <div class='top'>
                최고점수 ${this.topScore}
            </div>
            <div class='slider'>
                ${this.data.scoreList.map(s => (`
                    <div>${s}</div>
                `)).join('')}
            </div>
        `;
    }
}

export default HistoryBox;