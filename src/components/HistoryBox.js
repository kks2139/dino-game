class HistoryBox {
    constructor({targ}){
        this.data = {
            topScore: 0,
            histList: []
        };

        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('HistoryBox');
        targ.appendChild(this.ROOT);
        this.refresh();
    }

    onClickClear = ()=>{
        sessionStorage.clear();
        this.refresh();
    }

    refresh = ()=>{
        const keyList = Object.keys(sessionStorage).filter(key => key.indexOf('dino_') > -1);
        this.data.histList = keyList.map(key => sessionStorage.getItem(key));

        const temp = this.data.histList.slice();
        const top = temp.sort((a, b)=> {
            const score1 = a.split('/')[0];
            const score2 = b.split('/')[0];
            return Number(score1) - Number(score2);
        }).pop();
        this.data.topScore = top ? top.split('/').join(' ') : 0;
        
        this.render();
    }

    render = ()=>{
        this.ROOT.innerHTML = `
            <div class='top'>
                최고점수 : ${this.data.topScore}
            </div>
            <div class='slider'>
                ${this.data.histList.map(s => (`
                    <div class='content'>
                        <div class='score'>${s.split('/')[0]}</div>
                        <div>${s.split('/')[1]}</div>
                    </div>
                `)).join('')}
            </div>
            ${this.data.histList.length > 0 ? `<div class='btn-clear' data-name='clear'>초기화</div>` : ''}
        `;
        this.ROOT.querySelector('[data-name=clear]').onclick = this.onClickClear;
    }
}

export default HistoryBox;