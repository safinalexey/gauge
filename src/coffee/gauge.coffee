class Gauge
  constructor: (gaugeId, @options) ->
    @drawingCanvas = document.getElementById gaugeId
    @ctx = @drawingCanvas.getContext "2d"
    @centerX = @drawingCanvas.width / 2
    @centerY = @drawingCanvas.height / 2

    @draw(@options)

  draw : (@options) ->
    @ctx.clearRect(0, 0, @drawingCanvas.width, @drawingCanvas.height);
    @drawGauge()
    @drawPointer()
    @drawMarks(@options.gaugeRange, @options.marksAmount, @options.valuesPosition)

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

    pointerRadius = if @options.valuesPosition is "in" then 125 else 195
    x = Math.round(centerX + pointerRadius * Math.cos(1.7*Math.PI))
    y = Math.round(centerY + pointerRadius * Math.sin(1.7*Math.PI))

    pointer.lineWidth = 5
    pointer.fillStyle = "#1e98e4"

    pointer.beginPath()
    pointer.arc circleSettings.centerX, circleSettings.centerY, circleSettings.radius, 0, 2 * Math.PI, false
    pointer.fill()

    #TODO: сделать поворот основания
    pointer.beginPath()
    pointer.moveTo centerX - 5, centerY
    pointer.lineTo x, y
    pointer.lineTo centerX + 5, centerY
    pointer.fill()

  drawMarks : (range, marks, position = "out")->

    context = @ctx
    context.font = '14pt Tahoma';
    context.fillStyle = "#000"
    positionFactor = if position is "out" then 215 else 150

    range = parseInt(range.value)
    marks = parseInt(marks.value)
    step  = range / marks
    angleTerm = 1.2 / range

    i = 0
    while i <= range
      x = Math.round(@centerY + positionFactor * Math.cos((0.9+angleTerm*i)*Math.PI)) - 5
      y = Math.round(@centerX + positionFactor * Math.sin((0.9+angleTerm*i)*Math.PI)) + 5
      context.fillText(i.toFixed(0), x, y);
      i += step

    @drawSerif(range, marks, position)

  drawSerif : (range, marks, position = "out") ->

    context = @ctx
    context.lineWidth = 1
    context.strokeStyle = '#666'
    positionFactor = if position is "out" then 200 else 130

    step  = range / marks
    angleTerm = 1.2 / range

    i = 0
    while i <= range
      x1 = Math.round(@centerY + (positionFactor-5) * Math.cos((0.9+angleTerm*i)*Math.PI))
      y1 = Math.round(@centerX + (positionFactor-5) * Math.sin((0.9+angleTerm*i)*Math.PI))
      x2 = Math.round(@centerY + positionFactor * Math.cos((0.9+angleTerm*i)*Math.PI))
      y2 = Math.round(@centerX + positionFactor * Math.sin((0.9+angleTerm*i)*Math.PI))

      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();

      i += step