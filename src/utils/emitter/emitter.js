import mitt from 'mitt';

const emitter = mitt();

export default {
  on(event, fn) {
    this.off(event, fn);
    emitter.on(event, fn);
  },
  emit(event, param) {
    emitter.emit(event, param);
  },
  off(event, fn) {
    emitter.off(event, fn);
  },
  clear() {
    emitter.all.clear();
  }
};
