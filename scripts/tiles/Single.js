let $ = require("jquery"),
    imageList = require("../services/ImageList");

class Single {
  constructor(options) {
    options = options || {};

    this.width = options.width;
    this.height = options.height;
    this.left = options.left;
    this.top = options.top;
  }

  render() {
    this.$el = $("<div/>", { class: "tile" })
      .css({
        height: this.height,
        width: this.width,
        top: this.top,
        left: this.left
      });

    this.images = [imageList.get()];

    $("<div/>", { class: "image" })
      .css({ "background-image": `url('${this.images[0]}')` })
      .appendTo(this.$el);

    return this.$el;
  }

  updateView(options) {
    this.$el.css(options || {});
  }

  remove() {
    const self = this;

    self.$el.css({ "z-index": 1 });
    this.images.forEach((url) => imageList.restore(url));
    setTimeout(() => { self.$el.remove(); }, 1000);
  }

  clone(options) {
    return new Single($.extend({
      width: this.width,
      height: this.height,
      left: this.left,
      top: this.top
    }, options));
  }
}

module.exports = Single;
