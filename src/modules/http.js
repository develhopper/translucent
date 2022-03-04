var base_url = "https://translate.googleapis.com/translate_a/single?client=gtx&dt=t";

function build_query_params(params) {
    return Object.keys(params).map((key) => {
        return encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
    }).join('&');
}

export default module = {

    get(params){
        let url = base_url+build_query_params({
            client:"gtx",
            dt:"t",
            ...params
        });
        return fetch(url).then(response => response.json())
    }
}