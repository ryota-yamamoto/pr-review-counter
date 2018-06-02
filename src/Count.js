export default class Count {
  construct(name) {
    this.name = name
    this.count = 0
    this.urls = []
  }

  increment() {
    this.count += 1
  }
}
