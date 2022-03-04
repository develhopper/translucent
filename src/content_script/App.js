import React, { createRef } from "react";
import langs from "../modules/languages";
import browser from "../modules/browser";

class App extends React.Component{
    constructor(){
        super();
        let timer;

        this.state ={
            show:false,
            translation:'',
            sourceLang:'',
            targetLang:'',
            enabled:false
        }

        this.reloadSettings = this.reloadSettings.bind(this);

        this.reloadSettings();

        this.container = createRef();

        
        document.body.onclick = (e) => {
            if(e.detail === 1){
                timer = setTimeout(() => {
                    this.translate(e);
                },200);
            }
            if(e.detail === 2){
                clearTimeout(timer);
                this.translate(e);
            }
        }

        browser.messaging.listener((request) => {
            if(request.type == "FETCH_RESULT" && request.id == 1000){
                this.setState({
                    show:true,
                    translation:request.data[0][0][0],
                    sourceLang:request.data[2]
                });
            }
            if(request.type == "SETTINGS_CHANGED"){
                this.reloadSettings();
            }
        });
    }

    reloadSettings(){
        browser.storage.all().then(data => {
            if(data){
                this.setState({
                    targetLang:data.primary,
                    enabled:data.enabled
                });
            }
        });
    }

    translate(e){
        let selection = window.getSelection().toString();

        if(selection && this.state.enabled){
            browser.messaging.broadcast({type:"FETCH",id:1000,params:{sl:"auto",tl:this.state.targetLang,q:selection}})
            this.container.current.style.top = (e.pageY - 160)+"px";
            this.container.current.style.left = e.clientX+"px";
        }else{
            this.setState({show:false});
        }
    }

    render(){
        return(
            <div className={`tw-flex tw-flex-col ${this.state.show?'':'tw-hidden'}`} id="translucent-popup" ref={this.container}>
                <div className="tw-flex tw-flex-row tw-justify-around">
                  <span className="translucent__langs">{langs[this.state.sourceLang]}</span>
                  <span className="translucent__langs__seperator">To</span>
                  <span className="translucent__langs">{langs[this.state.targetLang]}</span>
                </div>
          
                <div className="tw-mt-4 translucent__translation tw-flex">
                  {this.state.translation}
                </div>
          </div>
        );
    }
}

export default App;