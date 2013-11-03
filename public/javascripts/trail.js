var _viewModel;
var _supportsLocalStorage = false;
$(function(){
  if (typeof(Storage)!=="undefined") {
    _supportsLocalStorage = true;
  }

  _viewModel =  new Trail();
  _viewModel.get();
  ko.applyBindings(_viewModel);
});

function Trail() {
  var self = this;
  self.data = ko.observable();
  self.started = ko.observable(false);
  self.done = ko.observable(false)
  self.index = ko.observable(getTrailStatus(_trailId).index || 0);
  self.year = ko.observable("");

  self.get = function() {
    $.get("/api/trails/" + _trailId, function(data, status, jqXHR) {
      self.data(data);
    });
  };

  self.tap = function(n) {
    return function() {
      var steps = self.data().steps;
      if (steps[self.index()].year) {
        if (self.year().length < 4)
          self.year(self.year() + n);

        if (self.year().length == 4) {
          setTimeout(function() {
            if (self.year() == "0070") {
              self.index(0); // Secret code to reset to the beginning of the trail.
            } else if (self.year() == steps[self.index()].year) {
              if (self.index() + 1 < steps.length) {
                self.index(self.index() + 1); // Success!  Next step.
              } else {
                self.done(true);
              }

              var status = getTrailStatus(_trailId);
              status.index = self.index();
              setTrailStatus(_trailId, status);
            }

            self.year("");
          }, 1500);
        }
      }
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

function getTrailStatus(trailId) {
  if (_supportsLocalStorage) {
    var status = localStorage.status ? JSON.parse(localStorage.status) : {};
    if (!status[trailId]) status[trailId] = {};
    return status[trailId];
  }

  return {};
}

function setTrailStatus(trailId, newStatus) {
  if (_supportsLocalStorage) {
    var status = localStorage.status ? JSON.parse(localStorage.status) : {};
    status[trailId] = newStatus;
    localStorage.status = JSON.stringify(status);
  }
}