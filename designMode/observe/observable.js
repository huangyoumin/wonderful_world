// 发布订阅模式

class Observable {
    constructor(subscriber) {
        this._subscriber = subscriber;
    }

    subscriber(observer) {
        if ('object' !== typeof observer || observer === null) {
            observer = {
                next: observer
            }
        }
        return new Subscription(observer, this._subscriber);
    }
}

class Subscription {
    constructor(observer, subscriber) {
        this._observer = observer;
        const subscriptionObserver = new Subscription();
        subscriber.call(null, subscriptionObserver);
    }
}

class SubscriptionObserver {
    constructor(subscription) {
        this._subscription = subscription;
    }
    next(value) {
        notify(this._subscription, 'next', value);
    }
}

function notify(subscription, type, ...args) {
    if (subscription._observer[type]) {
        subscription._observer[type].apply(null, args);
    }
}