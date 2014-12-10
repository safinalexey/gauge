options =
  'gaugeRange': document.getElementById('gaugeRange')
  'marksAmount': document.getElementById('marksAmount')
gauge = new Gauge('gauge', options)

$('#draw').on 'click', ->
  position = if document.querySelector('input[name="valuesPosition"]').checked is true then "in" else "out"
  options =
    'gaugeRange': document.getElementById('gaugeRange')
    'marksAmount': document.getElementById('marksAmount')
    'valuesPosition' : position
  gauge.draw(options)
  return