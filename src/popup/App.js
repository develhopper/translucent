import React, { createRef } from "react";
import langs from "../modules/languages";
import browser from "../modules/browser";

class App extends React.Component{

    constructor(){
      super();
      this.state = {
        enabled:true,
        primary:'en'
      }

      this.checkbox = createRef();
      this.select = createRef();

      browser.storage.all().then(data => {
        if(data){
          this.setState({enabled:data.enabled,primary:data.primary});
          this.checkbox.current.checked = data.enabled;
          this.select.current.value = data.primary;
        }
      });
    }

    onSwitchChange(e){
      browser.storage.write("enabled",e.target.checked).then(() => {
        this.setState({enabled:e.target.checked});
      });
      browser.messaging.toAllTabs({type:"SETTINGS_CHANGED"});
    }

    onSelect(e){
      browser.storage.write("primary",e.target.value).then(() => {
        this.setState({primary:e.target.value});
      });
      browser.messaging.toAllTabs({type:"SETTINGS_CHANGED"});
    }

    render(){
      let language_items = Object.keys(langs).map((key) => {
        return <option key={key} value={key}>{langs[key]}-{key}</option>
      });
        return (
          <div className="tw-flex tw-flex-col" id="panel_container">
            <div className="tw-flex tw-flex-row tw-justify-center tw-underline">Translucent</div>
            <div className="tw-flex tw-flex-row tw-justify-between tw-mt-5">
              <span className="text tw-text-sm">Enabled: </span>
              <label className="switch">
                  <input type="checkbox" onChange={this.onSwitchChange.bind(this)} ref={this.checkbox}/>
                  <span className="slider"></span>
              </label>
            </div>

            <div className="tw-flex tw-flex-row tw-justify-between tw-mt-14 tw-items-center">
              <span className="text tw-text-sm">Primary Language: </span>
              <select id="language_selector" onChange={this.onSelect.bind(this)} ref={this.select}>
                {language_items}
              </select>
            </div>
         </div>
        );
    }
}

export default App;