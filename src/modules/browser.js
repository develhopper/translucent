let browser = chrome; 

export default module ={
    injectContainer(){
        let container = document.createElement("div");
        container.id = "translucent_ext";
        
        const styles = document.createElement("link");
        styles.href = module.asset("assets/css/app.css?"+Math.random()*10);
        styles.rel = "stylesheet"; 

        document.body.append(container);
        (document.head||document.documentElement).appendChild(styles);
    },

    asset(name){
        return browser.runtime.getURL(name);
    },

    messaging:{
        listener: (callback) =>{
            browser.runtime.onMessage.addListener(callback);
        },
        broadcast: (message, callback) =>{
            browser.runtime.sendMessage(message, callback);
        },
        sendTo : (tab_id,message,callback) =>{
            browser.tabs.sendMessage(tab_id,message,callback);
        },
        toAllTabs(message){
            browser.tabs.query({}, (tabs) => tabs.forEach( tab => browser.tabs.sendMessage(tab.id, message) ) );
        }
    },
    storage: {
        read: (key) => {
            return new Promise((resolve,reject) => {
                browser.storage.local.get([key], function(result){
                    if(browser.runtime.lastError){
                        return resolve(null);
                    } 
                    resolve(result[key]);
                });
            });
        },

        write: (key, value) => {
            return new Promise((resolve,reject) => {
                browser.storage.local.set({[key]:value},function(){
                    if(browser.runtime.lastError){
                        return resolve(false);
                    } 
                    resolve(true);
                });
            });
        },

        all: () => {
            return new Promise((resolve,reject) => {
                browser.storage.local.get(null, function(result){
                    if(browser.runtime.lastError){
                        return resolve(null);
                    }
                    resolve(result);
                });
            });
        }
    }
};