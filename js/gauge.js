var Gauge;

Gauge = (function() {
  function Gauge(gaugeId, options) {
    this.options = options;
    this.drawingCanvas = document.getElementById(gaugeId);
    this.ctx = this.drawingCanvas.getContext("2d");
    this.centerX = this.drawingCanvas.width / 2;
    this.centerY = this.drawingCanvas.height / 2;
    this.draw(this.options);
  }

  Gauge.prototype.draw = function(options) {
    this.options = options;
    this.ctx.clearRect(0, 0, this.drawingCanvas.width, this.drawingCanvas.height);
    this.drawGauge();
    this.drawPointer();
    return this.drawMarks(this.options.gaugeRange, this.options.marksAmount, this.options.valuesPosition);
  };

  Gauge.prototype.writeMessage = function(canvas, message) {
    var context;
    context = this.ctx;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "18pt Calibri";
    context.fillStyle = "black";
    context.fillText(message, 10, 25);
  };

  Gauge.prototype.getMousePos = function(canvas, evt) {
    var rect;
    rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  };

  Gauge.prototype.drawGauge = function(x, y, radius, startAngle, endAngle) {
    var gauge, gaugeSettings;
    if (x == null) {
      x = this.drawingCanvas.width / 2;
    }
    if (y == null) {
      y = this.drawingCanvas.height / 2;
    }
    if (radius == null) {
      radius = 175;
    }
    if (startAngle == null) {
      startAngle = .9 * Math.PI;
    }
    if (endAngle == null) {
      endAngle = 2.1 * Math.PI;
    }
    gauge = this.ctx;
    gaugeSettings = {
      x: x,
      y: y,
      radius: radius,
      startAngle: startAngle,
      endAngle: endAngle,
      counterClockwise: false
    };
    gauge.beginPath();
    gauge.arc(gaugeSettings.x, gaugeSettings.y, gaugeSettings.radius, gaugeSettings.startAngle, gaugeSettings.endAngle, gaugeSettings.counterClockwise);
    gauge.lineWidth = 3;
    gauge.strokeStyle = '#666';
    return gauge.stroke();
  };

  Gauge.prototype.drawPointer = function(centerX, centerY, radius) {
    var circleSettings, pointer, pointerRadius, x, y;
    if (centerX == null) {
      centerX = this.centerX;
    }
    if (centerY == null) {
      centerY = this.centerY;
    }
    if (radius == null) {
      radius = 10;
    }
    pointer = this.ctx;
    circleSettings = {
      centerX: centerX,
      centerY: centerY,
      radius: radius
    };
    pointerRadius = this.options.valuesPosition === "in" ? 125 : 195;
    x = Math.round(centerX + pointerRadius * Math.cos(1.7 * Math.PI));
    y = Math.round(centerY + pointerRadius * Math.sin(1.7 * Math.PI));
    pointer.lineWidth = 5;
    pointer.fillStyle = "#1e98e4";
    pointer.beginPath();
    pointer.arc(circleSettings.centerX, circleSettings.centerY, circleSettings.radius, 0, 2 * Math.PI, false);
    pointer.fill();
    pointer.beginPath();
    pointer.moveTo(centerX - 5, centerY);
    pointer.lineTo(x, y);
    pointer.lineTo(centerX + 5, centerY);
    return pointer.fill();
  };

  Gauge.prototype.drawMarks = function(range, marks, position) {
    var angleTerm, context, i, positionFactor, step, x, y;
    if (position == null) {
      position = "out";
    }
    context = this.ctx;
    context.font = '14pt Tahoma';
    context.fillStyle = "#000";
    positionFactor = position === "out" ? 215 : 150;
    range = parseInt(range.value);
    marks = parseInt(marks.value);
    step = range / marks;
    angleTerm = 1.2 / range;
    i = 0;
    while (i <= range) {
      x = Math.round(this.centerY + positionFactor * Math.cos((0.9 + angleTerm * i) * Math.PI)) - 5;
      y = Math.round(this.centerX + positionFactor * Math.sin((0.9 + angleTerm * i) * Math.PI)) + 5;
      context.fillText(i.toFixed(0), x, y);
      i += step;
    }
    return this.drawSerif(range, marks, position);
  };

  Gauge.prototype.drawSerif = function(range, marks, position) {
    var angleTerm, context, i, positionFactor, step, x1, x2, y1, y2, _results;
    if (position == null) {
      position = "out";
    }
    context = this.ctx;
    context.lineWidth = 1;
    context.strokeStyle = '#666';
    positionFactor = position === "out" ? 200 : 130;
    step = range / marks;
    angleTerm = 1.2 / range;
    i = 0;
    _results = [];
    while (i <= range) {
      x1 = Math.round(this.centerY + (positionFactor - 5) * Math.cos((0.9 + angleTerm * i) * Math.PI));
      y1 = Math.round(this.centerX + (positionFactor - 5) * Math.sin((0.9 + angleTerm * i) * Math.PI));
      x2 = Math.round(this.centerY + positionFactor * Math.cos((0.9 + angleTerm * i) * Math.PI));
      y2 = Math.round(this.centerX + positionFactor * Math.sin((0.9 + angleTerm * i) * Math.PI));
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      _results.push(i += step);
    }
    return _results;
  };

  return Gauge;

})();
