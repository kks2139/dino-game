import GameBox from "./components/GameBox";

class App {
    constructor(targ){
        this.ROOT = targ;
        this.ROOT.classList.add('App');

        this.render();
    }

    render = ()=>{
        this.GameBox = new GameBox({
            targ: this.ROOT
        });
    }
}

export default App;