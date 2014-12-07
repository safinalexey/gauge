var Gauge;

Gauge = (function() {
  function Gauge(gaugeId) {
    this.drawingCanvas = document.getElementById(gaugeId);
    this.pointer = this.drawingCanvas.getContext("2d");
  }

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
      startAngle = 1.1 * Math.PI;
    }
    if (endAngle == null) {
      endAngle = 1.9 * Math.PI;
    }
    gauge = this.drawingCanvas.getContext("2d");
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
    gauge.strokeStyle = 'black';
    return gauge.stroke();
  };

  Gauge.prototype.drawCircle = function(centerX, centerY, radius) {
    var circle, circleSettings;
    if (centerX == null) {
      centerX = this.drawingCanvas.width / 2;
    }
    if (centerY == null) {
      centerY = this.drawingCanvas.height / 2;
    }
    if (radius == null) {
      radius = 10;
    }
    circle = this.drawingCanvas.getContext("2d");
    circleSettings = {
      centerX: centerX,
      centerY: centerY,
      radius: radius
    };
    circle.beginPath();
    circle.arc(circleSettings.centerX, circleSettings.centerY, circleSettings.radius, 0, 2 * Math.PI, false);
    circle.fillStyle = "black";
    circle.fill();
    circle.lineWidth = 5;
    circle.strokeStyle = "black";
    return circle.stroke();
  };

  Gauge.prototype.drawPointer = function(to) {
    if (to == null) {
      to = [this.drawingCanvas.width / 2, 75];
    }
    this.pointer.beginPath();
    this.pointer.moveTo(this.drawingCanvas.width / 2 - 5, this.drawingCanvas.height / 2);
    this.pointer.lineTo(to[0], to[1]);
    this.pointer.lineTo(this.drawingCanvas.width / 2 + 5, this.drawingCanvas.height / 2);
    return this.pointer.fill();
  };

  Gauge.prototype.turnPointer = function() {
    return this.pointer.clearRect(this.drawingCanvas.width / 2 - 5, this.drawingCanvas.height / 2, 20, 20);
  };

  return Gauge;

})();
