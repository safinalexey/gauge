var gauge, options;

options = {
  'gaugeRange': document.getElementById('gaugeRange'),
  'marksAmount': document.getElementById('marksAmount')
};

gauge = new Gauge('gauge', options);

$('#draw').on('click', function() {
  var position;
  position = document.querySelector('input[name="valuesPosition"]').checked === true ? "in" : "out";
  options = {
    'gaugeRange': document.getElementById('gaugeRange'),
    'marksAmount': document.getElementById('marksAmount'),
    'valuesPosition': position
  };
  gauge.draw(options);
});
