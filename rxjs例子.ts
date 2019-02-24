class DataSource {
  constructor() {
    let i = 0;
    this._id = setInterval(() => this.emit(i++), 200); // 创建定时器
  }
  
  emit(n) {
    const limit = 10;  // 设置数据上限值
    if (this.ondata) {
      this.ondata(n);
    }
    if (n === limit) {
      if (this.oncomplete) {
        this.oncomplete();
      }
      this.destroy();
    }
  }
  
  destroy() { // 清除定时器
    clearInterval(this._id);
  }
}


function myObservable(observer) {
    let datasource = new DataSource(); // 创建数据源
    datasource.ondata = (e) => observer.next(e); // 处理数据流
    datasource.onerror = (err) => observer.error(err); // 处理异常
    datasource.oncomplete = () => observer.complete(); // 处理数据流终止
    return () => { // 返回一个函数用于，销毁数据源
        datasource.destroy();
    };
}

const unsub = myObservable({
  next(x) { console.log(x); },
  error(err) { console.error(err); },
  complete() { console.log('done')}
});


// sync
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Semlinker'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Lolo');
    });
    
console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');

//async
var observable = Rx.Observable
    .create(function(observer) {
        observer.next('Semlinker'); // RxJS 4.x 以前的版本用 onNext
        observer.next('Lolo');
        
        setTimeout(() => {
            observer.next('RxJS Observable');
        }, 300);
    })
    
console.log('start');
observable.subscribe(function(value) {
    console.log(value);
});
console.log('end');


//Creation
// create
// of
var source = Rx.Observable.of('Semlinker', 'Lolo');
// from
var arr = [1, 2, 3];
var source = Rx.Observable.from(arr); // 也支持字符串，如 "Angular 2 修仙之路"
// fromEvent
Rx.Observable.fromEvent(document.querySelector('button'), 'click');
// fromPromise
var source = Rx.Observable
  .fromPromise(new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello RxJS!');
    },3000)
}));
// empty
//empty 操作符返回一个空的 Observable 对象，如果我们订阅该对象，它会立即返回 complete 信息。
var source = Rx.Observable.empty();

// never
// never 操作符会返回一个无穷的 Observable，当我们订阅它后，什么事情都不会发生，它是一个一直存在却什么都不做的 Observable 对象。
var source = Rx.Observable.never();

// throw
// throw 操作如，只做一件事就是抛出异常。
var source = Rx.Observable.throw('Oop!');

// interval
var source = Rx.Observable.interval(1000);
// 0 1 2 ...
// interval 操作符支持一个数值类型的参数，用于表示定时的间隔。上面代码表示每隔 1s，会输出一个递增的值，初始值从 0 开始。


// timer
var source = Rx.Observable.timer(1000, 5000);
// 0 # 1s后
// 1 # 5s后
// 2 # 5s后
// ...
// timer 操作符支持两个参数，第一个参数用于设定发送第一个值需等待的时间，第二个参数表示第一次发送后，发送其它值的间隔时间。此外，timer 操作符也可以只传递一个参数，具体如下：
var source = Rx.Observable.timer(1000);
// 0
// complete!