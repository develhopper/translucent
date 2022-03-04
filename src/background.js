import http from "./modules/http";
import browser from "./modules/browser";

browser.messaging.listener(function(request, sender){
    if(request.type == "FETCH" && request.id == 1000){
        http.get(request.params).then(data => {
            browser.messaging.sendTo(sender.tab.id,{type:"FETCH_RESULT", id:request.id , data: data});
        });
    }
});