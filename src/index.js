'use strict';

import _ from 'lodash';
import $ from 'jquery';
import Quagga from 'quagga';

console.log('application start');

Quagga.onDetected(function(data) {
  const {code, format} = data.codeResult;

  let $node = null;
  const canvas = Quagga.canvas.dom.image;

  $('#thumbnail-value').attr('src', canvas.toDataURL());
  $('#code-value').html(code);
  $('#format-value').html(format);

  const points = data.line.reduce((prev, point, index) => {
    return prev + ` ${index} x:=${_.round(point.x, 2)} y:=${_.round(point.y, 2)}`;
  }, '');
  $('#line-value').html(points);
});

Quagga.onProcessed(function(result) {
  var drawingCtx = Quagga.canvas.ctx.overlay,
      drawingCanvas = Quagga.canvas.dom.overlay;

  if (result) {
      if (result.boxes) {
          drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
          result.boxes.filter(function (box) {
              return box !== result.box;
          }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
          });
      }

      if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
      }

      if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
      }
  }
});

Quagga.init({
    inputStream : {
      name : 'Live',
      type : 'LiveStream',
      constraints: {
        width: 640,
        height: 480,
      },
      target: document.querySelector('#video-player')
    },
    debug: true,
    decoder : {
      readers : ['code_128_reader', 'ean_reader', 'ean_8_reader'],
      debug: {
        drawBoundingBox: true,
        showFrequency: true,
        drawScanline: true,
        showPattern: true
      }
    },
    // locator: {
    //     patchSize: "medium",
    //     halfSample: true
    // },
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
  });