export class Page {
  constructor(params) {
    this.params = params
  }

  getRoot() {
    throw new Error('getRoot() is must be realized for Page')
  }

  afterRender() {}

  destroy() {}
}
