function set_cookie(name:string, value:string) {
    document.cookie = name +'='+ value +'; Path=/;';
}
function delete_cookie(name:string) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export {set_cookie , delete_cookie}