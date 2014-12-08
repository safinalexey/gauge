gauge = new Gauge('gauge')
gauge.drawGauge()
gauge.drawPointer()
gauge.drawText(document.getElementById('gaugeRange'), document.getElementById('marksAmount'))