// 观察者模式

class EventEmitter {
    constructor() {
        this._event = {};
    }
    on(name, cb) {
        if (!this._event[name]) this._event[name] = [];
        this._event[name].push(cb);
    }

    emit(name, ...args) {
        if (!this._event[name]) return;
        for (const fn of this._event[name]) {
            fn.apply(null, args);
        }
    }

    off(name, cb) {
        if (!this._event[name]) {
            return;
        }
        const index = this._event[name].findIndex(evt => evt === cb);
        if (index >= 0) {
            this._event[name] = this._event[name].splice(index, 1);
        }
    }
}