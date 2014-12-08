class Gauge
  constructor: (gaugeId) ->
    @drawingCanvas = document.getElementById gaugeId
    @ctx = @drawingCanvas.getContext "2d"
    @centerX = @drawingCanvas.width / 2
    @centerY = @drawingCanvas.height / 2
#    @drawingCanvas.addEventListener "mousemove", ((evt) =>
#      mousePos = @getMousePos(@drawingCanvas, evt)
#      message = "Mouse position: " + mousePos.x + "," + mousePos.y
#      @writeMessage @drawingCanvas, message
#      return
#    ), false

  writeMessage : (canvas, message) ->
    context = @ctx
    context.clearRect 0, 0, canvas.width, canvas.height
    context.font = "18pt Calibri"
    context.fillStyle = "black"
    context.fillText message, 10, 25
    return

  getMousePos : (canvas, evt) ->
    rect = canvas.getBoundingClientRect()
    x: evt.clientX - rect.left
    y: evt.clientY - rect.top

  drawGauge: (x = @drawingCanvas.width / 2,
              y = @drawingCanvas.height / 2,
              radius = 175,
              startAngle = .9 * Math.PI,
              endAngle = 2.1 * Math.PI) ->

    gauge = @ctx

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
    gauge.strokeStyle = '#666'

    gauge.stroke()

  drawPointer: (centerX = @centerX, centerY = @centerY, radius = 10) ->

    pointer = @ctx

    circleSettings =
      centerX : centerX
      centerY : centerY
      radius : radius

    x = Math.round(centerX + 75 * Math.cos(10))
    y = Math.round(centerY + 75 * Math.sin(10))

    pointer.lineWidth = 5
    pointer.fillStyle = "#1e98e4"

    pointer.beginPath()
    pointer.arc circleSettings.centerX, circleSettings.centerY, circleSettings.radius, 0, 2 * Math.PI, false
    pointer.fill()

    pointer.beginPath()
    pointer.moveTo centerX - 5, centerY
    pointer.lineTo x, y
    pointer.lineTo centerX + 5, centerY
    pointer.fill()

  drawText : (range, marks, position = "out")->

    context = @ctx
    context.font = '14pt Tahoma';
    context.fillStyle = "#000"
    positionFactor = if position is "out" then 200 else 150

    range = parseInt(range.value)
    marks = parseInt(marks.value)
    step  = range / marks
    angleTerm = 1.2 / range

    i = 0
    while i <= range
      x = Math.round(@centerY + positionFactor * Math.cos((0.9+angleTerm*i)*Math.PI))
      y = Math.round(@centerX + positionFactor * Math.sin((0.9+angleTerm*i)*Math.PI))
      context.fillText(i, x, y);
      i += step