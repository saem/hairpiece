declare module 'rx' {
  declare interface IDisposable {}

  declare interface IObservable<T> {
    subscribe(event: Function, error: ?Function, close: ?Function): IDisposable;
    delay(ms: number|Date): IObservable<T>;
    forEach(
      observer: IObserver<T>|(event: T) => void,
      onError: ?(exception: any) => void,
      onCompleted: ?() => void
    ): IDisposable;
  }

  declare class Observable {
    static just<T>(value: T): IObservable<T>;
  }

  declare interface IObserver<T> {
    onNext(value: T): void;
  }

  declare interface ISubject<T> extends IObservable<T>, IObserver<T> {}

  declare class Subject<T> extends ISubject<T> {}
}
