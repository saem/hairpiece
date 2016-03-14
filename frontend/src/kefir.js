import { Kefir as originalKefir } from 'kefir';

originalKefir.emitter = () => {
  let emitter;
  const stream = Kefir.stream(_emitter => {
    emitter = _emitter;
    return () => emitter = null;
  });

  stream.emit = x => {
    emitter && emitter.emit(x);
    return stream;
  }

  // TODO: other methods .error, .end, .emitEvent if needed

  return stream;
};

export const Kefir = originalKefir;
