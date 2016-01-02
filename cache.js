import Immutable from 'immutable';


const SimpleObjectCache = {
  init() {
    let cache = {};

    return {
      hits: 0,
      set(key, value) {
        cache[key] = value;
      },
      get(key) {
        this.hits++;
        return cache[key];
      },
      has(key) {
        return !!cache[key];
      }
    }
  }
};



const ImmutableListCache = {
  init() {
    let map = Immutable.Map();

    return {
      hits: 0,
      set(key, value) {
        map = map.set(key, value);
      },
      get(key) {
        this.hits++;
        return map.get(key);
      },
      has(key) {
        return map.has(key);
      }
    }
  }
}



//export default SimpleObjectCache;
export default ImmutableListCache;
