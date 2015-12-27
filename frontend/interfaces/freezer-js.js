declare class Freezer {
  constructor( initialState: any ): void;
}

declare module 'freezer-js' {
  declare var exports: typeof Freezer
}
