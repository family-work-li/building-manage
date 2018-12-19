export default function(str, id) {
    if(!str) {
        return '';
    }
    const _str = str.replace('?','');;
    const arr = _str.split('&').map(item => {
        return item.split('=');
    });
    const obj = {};
    arr.forEach(item => {
        obj[item[0]] = item[1];
    });

    return obj[id];
}