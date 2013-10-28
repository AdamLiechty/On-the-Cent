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

  self.get = function() {
    $.get("/api/trails/" + _trailId, function(data, status, jqXHR) {
      self.data(data);
    });
  };

  self.start = function() {
    self.started(true);
  };
}
