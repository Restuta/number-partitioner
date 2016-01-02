import Immutable from 'immutable';


const SimpleObjectCache = {
  init() {
    let cache = {};

    return {
      set(key, value) {
        cache[key] = value;
      },
      get(key) {
        return cache[key];
      },
      has(key) {
        return !!cache[key];
      }
    }
  }
};

const ImmutableListCache = {

}




export default SimpleObjectCache;
