class ConfirmBox {
    constructor({msg='', ok, no}){
        this.msg = msg;
        this.ok = ok;
        this.no = no;
    }

    show = ()=>{
        this.render();
    }

    hide = ()=>{
        const confirmBox = document.body.querySelector('.ConfirmBox');
        if(confirmBox){
            document.body.removeChild(confirmBox);
        }
    }

    okCallback = ()=>{
       this.hide(); 
       this.ok();
    }

    noCallback = ()=>{
        this.hide();
        this.no();
    }

    callback = (e)=>{
        this.hide();
        const type = e.currentTarget.dataset.type;
        if(type === 'y'){
            if(this.ok && typeof this.ok === 'function'){
                this.ok();
            }
        }else{
            if(this.no && typeof this.no === 'function'){
                this.no();
            }
        }
    }

    render = ()=>{
        this.hide();
        this.box = document.createElement('div');
        this.box.classList.add('ConfirmBox');
        this.box.innerHTML = `
            <div class='msg-box'>
                <div class='msg'>${this.msg}</div>
                <div class='btns'>
                    <div class='y' data-type='y'>넵</div>
                    <div class='n' data-type='n'>아니유</div>
                </div>
            </div>
        `;
        this.box.querySelector('.btns .y').onclick = this.callback;
        this.box.querySelector('.btns .n').onclick = this.callback;
        document.body.appendChild(this.box);
    }
}

export default ConfirmBox;