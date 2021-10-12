class Pause{
    constructor({targ}){
        this.target = targ;
    }
    
    show = (bool)=>{
        if(bool) this.render();
        else {
            if(this.ROOT){
                this.target.removeChild(this.ROOT);
                this.ROOT = null;
            }
        };
    }
    
    render = ()=>{
        this.ROOT = document.createElement('div');
        this.ROOT.classList.add('Pause');
        this.target.appendChild(this.ROOT);
        this.ROOT.innerHTML = `
            <div class='bars'>
                <div></div>
                <div></div>
            </div>
        `;
    }
}

export default Pause;