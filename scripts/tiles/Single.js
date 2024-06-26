let Base = require("./Base"),
    $ = require("jquery/dist/jquery.slim.js");

class Single extends Base {
  renderImages() {
    this.images = [
      this._getImage()
    ];

    $("<img/>", { class: "picture" })
      .attr("src", this.images[0])
      .attr("loading", "lazy")
      .appendTo(this.$el);
  }
}

module.exports = Single;
