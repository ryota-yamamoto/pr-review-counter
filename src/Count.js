export default class Count {
  constructor(name) {
    this.name = name
    this.count = 0
    this.urls = []
  }

  increment() {
    this.count += 1
  }
}
