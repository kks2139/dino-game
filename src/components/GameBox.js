class GameBox {
    constructor(targ){
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('.GameBox');
        targ.appendChild(this.ROOT);

        this.render();
    }

    render = ()=>{

    }
}

export default GameBox;