export default class sessionStorage {
    static getItem(key) {
        try {
            return JSON.parse(window.sessionStorage.getItem(key));
        } catch(e) {
            return null;
        }
    }
    static setItem(key, val) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    }
    static clear() {
        window.sessionStorage.clear();
    }
    static keys() {
        return window.sessionStorage.keys();
    }
    static removeItem(key) {
        window.sessionStorage.removeItem(key);
    }
}