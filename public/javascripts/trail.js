var _viewModel;
var _supportsLocalStorage = false;
$(function(){
  if (typeof(Storage)!=="undefined") {
    _supportsLocalStorage = true;
  }

  _viewModel = new Trail();
  _viewModel.get();
  ko.applyBindings(_viewModel);
});

function Trail() {
  var self = this;
  self.data = ko.observable();
  self.started = ko.observable(false);
  self.focus = function() {
    $("#date-input").focus();
    self.resetTap();
  };

  self.index = ko.observable(getTrailStatus(_trailId).index || 0);
  self.done = ko.computed(function() {
    return self.data() && self.index() >= self.data().steps.length-1;
  });
  self.year = ko.observable("");
  self.year.subscribe(function(year) {
    var steps = self.data().steps;
    if (steps[self.index()].year) {
      if (self.year().length == 4) {
        if (self.year() == "0070") {
          $("#date-input").blur();
          self.index(0); // Secret code to reset to the beginning of the trail.
          self.started(false);
          self.year("");
          saveState();
        } else if (self.year() == steps[self.index()].year) { // Correct answer
          $("#success").fadeIn();
          setTimeout(function() {
            if (self.index() + 1 < steps.length) {
              self.index(self.index() + 1); // Success!  Next step.
            }
            saveState();
            self.year("");
            $("#success").fadeOut({duration: 100});
            $("#date-input").blur();
          }, 1500);
        } else { // Wrong answer
          $("#failure").fadeIn();
          setTimeout(function() {
            self.year("");
            $("#failure").fadeOut();
          }, 1500);
        }
      }
    }
  });

  function saveState() {
    var status = getTrailStatus(_trailId);
    status.index = self.index();
    setTrailStatus(_trailId, status);
  }

  self.get = function() {
    $.get("/api/trails/" + _trailId, function(data, status, jqXHR) {
      self.data(data);
    });
  };

  self.yearDigitImage = function(i) {
    if (self.year().length > i)
      return "/images/" + self.year()[i] + ".jpg";
    return null;
  };

  self.start = function() {
    self.started(true);
  };

  self.resetTapCount = 0;
  self.resetTap = function() {
    if (++self.resetTapCount == 20) {
      self.index(0);
      self.resetTapCount = 0;
      var status = getTrailStatus(_trailId);
      status.index = 0;
      setTrailStatus(_trailId, status)
    }
    setTimeout(function() { self.resetTapCount = 0; }, 30000);
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
