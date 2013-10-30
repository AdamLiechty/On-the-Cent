var _viewModel;
$(function(){
  _viewModel =  new Trail();
  _viewModel.get();
  ko.applyBindings(_viewModel);
});

function Trail() {
  var self = this;
  self.data = ko.observable();
  self.started = ko.observable(false);
  self.index = ko.observable(0);
  self.year = ko.observable("");

  self.get = function() {
    $.get("/api/trails/" + _trailId, function(data, status, jqXHR) {
      self.data(data);
    });
  };

  self.tap = function(n) {
    return function() {
      if (self.year().length < 4)
        self.year(self.year() + n);
    };
  };

  self.yearDigitImage = function(i) {
    if (self.year().length > i)
      return "images/" + self.year()[i] + ".jpg";
    return null;
  };

  self.start = function() {
    self.started(true);
  };
}
