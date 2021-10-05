import GameBox from "./components/GameBox";

class App {
    constructor(targ){
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('App');
        targ.appendChild(this.ROOT);

        this.render();
    }

    render = ()=>{
        this.GameBox = new GameBox({
            targ: this.ROOT
        });
    }
}

export default App;