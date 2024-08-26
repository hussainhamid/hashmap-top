class HashMap {
  constructor() {
    this.hashCode = 0;
    this.primeNumber = 31;
    this.buckets = new Array(16).fill(null).map(() => []);
    this.size = 0;
  }

  hash(key) {
    this.hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      this.hashCode = this.primeNumber * this.hashCode + key.charCodeAt(i);

      this.hashCode = this.hashCode % this.buckets.length;
    }

    return this.hashCode;
  }

  checkBucketSize(index) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }
  }

  set(key, value) {
    const index = this.hash(key);
    this.checkBucketSize(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (key === existingKey) {
        bucket[i] = [key, value];
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.buckets.length > 0.8) {
      this.growBucketsSize();
    }
  }

  growBucketsSize() {
    let capacity = this.buckets.length;
    let loadFactor = 0.8;

    if (this.size / capacity <= loadFactor) {
      return;
    }

    const newCapacity = capacity * 2;
    const newBuckets = new Array(newCapacity).fill(null).map(() => []);

    if (capacity > this.buckets.length) {
      this.buckets = newBuckets;

      for (let i = 0; i < this.buckets.length; i++) {
        this.buckets[i] = newBuckets[i];
      }
    }
  }

  get(key) {
    const index = this.hash(key);
    this.checkBucketSize(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey, existingValue] = bucket[i];

      if (key === existingKey) {
        return existingValue;
      } else {
        return null;
      }
    }
  }

  has(key) {
    const index = this.hash(key);
    this.checkBucketSize(index);

    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      if (key) {
        return true;
      }
      return false;
    }
  }

  remove(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    for (let i = 0; i < bucket.length; i++) {
      const [existingKey] = bucket[i];
      if (existingKey === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.buckets.length).fill(null).map(() => []);
    this.size = 0;

    return this.buckets;
  }

  keys() {
    const existingKeyArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        const [existingKey] = bucket[j];
        existingKeyArr.push(existingKey);
      }
    }
    return existingKeyArr;
  }

  values() {
    const existingValuesArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        const [, existingValue] = bucket[j];
        existingValuesArr.push(existingValue);
      }
    }
    return existingValuesArr;
  }

  entries() {
    const entriesArr = [];

    for (let i = 0; i < this.buckets.length; i++) {
      const bucket = this.buckets[i];

      for (let j = 0; j < bucket.length; j++) {
        entriesArr.push(bucket[j]);
      }
    }
    return entriesArr;
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");

console.log(test.remove("grape"));

console.log(test.buckets);
console.log(test.get("carrot"));
console.log(test.has("kite"));
console.log(test.length());
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
