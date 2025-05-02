export default class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
      this.loadFactor = loadFactor;
      this.capacity = capacity;
      this.buckets = Array(this.capacity).fill(null);
      this.size = 0;
    }
  
    errorBucket(index) {
        if (index < 0 || index >= this.buckets.length) {
          throw new Error("Trying to access index out of bounds");
        }
      }
    
    hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
      }
      return hashCode;
    }
  
    set(key, value) {
      const index = this.hash(key);
      this.errorBucket(index);
      let bucket = this.buckets[index];
  
      if (!bucket) {
        this.buckets[index] = [{ key, value }];
        this.size++;
      } else {
        let found = false;
        for (const entry of bucket) {
          if (entry.key === key) {
            entry.value = value;
            found = true;
            break;
          }
        }
        if (!found) {
          bucket.push({ key, value });
          this.size++;
        }
      }
  
      if (this.size / this.capacity >= this.loadFactor) {
        this.resize();
      }
    }
  
    get(key) {
      const index = this.hash(key);
      
      this.errorBucket(index);
      const bucket = this.buckets[index];
  
      if (bucket) {
        for (const entry of bucket) {
          if (entry.key === key) return entry.value;
        }
      }
  
      return null;
    }
  
    has(key) {
      const index = this.hash(key);
      this.errorBucket(index);
      const bucket = this.buckets[index];
  
      if (bucket) {
        for (const entry of bucket) {
          if (entry.key === key) return true;
        }
      }
  
      return false;
    }
  
    remove(key) {
      const index = this.hash(key);
      this.errorBucket(index);
      const bucket = this.buckets[index];
  
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].key === key) {
            bucket.splice(i, 1);
            this.size--;
            return true;
          }
        }
      }
  
      return false;
    }
  
    length() {
      return this.size;
    }
  
    clear() {
      this.buckets = Array(this.capacity).fill(null);
      this.size = 0;
    }
  
    keys() {
      const keysArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) keysArray.push(entry.key);
        }
      }
      return keysArray;
    }
  
    values() {
      const valuesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) valuesArray.push(entry.value);
        }
      }
      return valuesArray;
    }
  
    entries() {
      const entriesArray = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const entry of bucket) entriesArray.push([entry.key, entry.value]);
        }
      }
      return entriesArray;
    }
  
    resize() {
      const oldBuckets = this.buckets;
      this.capacity *= 2;
      this.buckets = Array(this.capacity).fill(null);
      this.size = 0;
  
      for (const bucket of oldBuckets) {
        if (bucket) {
          for (const entry of bucket) {
            this.set(entry.key, entry.value);
          }
        }
      }
    }
  }