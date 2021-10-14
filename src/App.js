import GameBox from "./components/GameBox";
import HistoryBox from "./components/HistoryBox";

class App {
    constructor(targ){
        this.ROOT = targ;
        this.ROOT.classList.add('App');

        this.render();
    }

    gameFinished = (score)=>{

    }

    render = ()=>{
        this.HistoryBox = new HistoryBox({
            targ: this.ROOT
        });
        this.GameBox = new GameBox({
            targ: this.ROOT,
            gameFinished: this.gameFinished
        });
    }
}

export default App;