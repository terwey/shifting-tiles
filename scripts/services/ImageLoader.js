let $ = require("jquery/dist/jquery.slim.js");

module.exports = (url) => {
  let deferred = $.Deferred(),
      $img = $("<img/>", { src: url });
  $img.on("load", deferred.resolve);
  $img.on("error", deferred.reject);
  return deferred;
}
