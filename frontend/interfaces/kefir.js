declare module 'kefir' {
  declare interface Observable<T> {}
  declare interface Emitter<T> {}

  declare type EmitterCallback<T> = (emitter: Emitter<T>) => Function|void

  declare var stream: (callback: EmitterCallback<T>) => Observable<T>
}
