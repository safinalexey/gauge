class Gauge
  constructor: (gaugeId) ->
    @drawingCanvas = document.getElementById gaugeId
    @pointer = @drawingCanvas.getContext "2d"

  drawGauge: (x = @drawingCanvas.width / 2,
              y = @drawingCanvas.height / 2,
              radius = 175,
              startAngle = 1.1 * Math.PI,
              endAngle = 1.9 * Math.PI) ->

    gauge = @drawingCanvas.getContext "2d"

    gaugeSettings =
      x : x
      y : y
      radius : radius
      startAngle : startAngle
      endAngle : endAngle
      counterClockwise : false

    gauge.beginPath()
    gauge.arc(gaugeSettings.x, gaugeSettings.y, gaugeSettings.radius, gaugeSettings.startAngle, gaugeSettings.endAngle, gaugeSettings.counterClockwise)

    gauge.lineWidth = 3
    gauge.strokeStyle = 'black'

    gauge.stroke()

  drawCircle: (centerX = @drawingCanvas.width / 2, centerY = @drawingCanvas.height / 2, radius = 10) ->

    circle = @drawingCanvas.getContext "2d"

    circleSettings =
      centerX : centerX
      centerY : centerY
      radius : radius

    circle.beginPath()
    circle.arc circleSettings.centerX, circleSettings.centerY, circleSettings.radius, 0, 2 * Math.PI, false
    circle.fillStyle = "black"
    circle.fill()

    circle.lineWidth = 5
    circle.strokeStyle = "black"

    circle.stroke()

  drawPointer : (to = [@drawingCanvas.width / 2, 75]) ->

    @pointer.beginPath()
    @pointer.moveTo @drawingCanvas.width / 2 - 5, @drawingCanvas.height / 2
    @pointer.lineTo to[0], to[1]
    @pointer.lineTo @drawingCanvas.width / 2 + 5, @drawingCanvas.height / 2
    @pointer.fill()

  turnPointer : ->
    @pointer.clearRect(@drawingCanvas.width / 2 - 5, @drawingCanvas.height / 2, 20, 20)