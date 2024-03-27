let Base = require("./Base"),
    $ = require("jquery");

class DoubleHorizontal extends Base {
  renderImages() {
    this.images = [
      this._getImage(),
      this._getImage()
    ];

    $("<img/>", { class: "picture" })
      .attr("src", this.images[0])
      .attr("loading", "lazy")
      .css({ height: "50%" })
      .appendTo(this.$el);

    $("<img/>", { class: "picture" })
      .attr("src", this.images[1])
      .attr("loading", "lazy")
      .css({ 
        height: "50%",
        top: "50%"
      })
      .appendTo(this.$el);
  }
}

module.exports = DoubleHorizontal;
