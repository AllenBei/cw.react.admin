export const setLocal = (key,value) =>{
    window.localStorage.setItem(key,value);
}
export const getLocal = (key) =>{
    return window.localStorage.getItem(key);
}