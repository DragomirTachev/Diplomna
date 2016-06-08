var waterLine;
var waterLevel;
var waterOut;
var exit_valve;
var lastKnownPercent = lastKnownPercent || 0;;
var emptier;
var filling = false;
var desiredValue = 100;
var dataChechking = null;

$(document).ready(function () {

  makeContainerOfFluids();
  GetWaterLevel(dataChechking);
});

function makeContainerOfFluids() {

  var svg = d3.select('svg')

  svg.append('path')
  .attr('fill', 'darkgreen')
  .attr('d', 'M0,50 L500,50 Q570,50 600,120 L560,120 Q540,80 490,80 L0,80');

  svg.append('rect')
  .attr('x', 70)
  .attr('y', 45)
  .attr('width', 30)
  .attr('height', 40)
  .attr('fill', 'black');

  svg.append('rect')
  .attr('x', 250)
  .attr('y', 45)
  .attr('width', 30)
  .attr('height', 40)
  .attr('fill', 'black');

  svg.append('rect')
  .attr('x', 420)
  .attr('y', 45)
  .attr('width', 30)
  .attr('height', 40)
  .attr('fill', 'black');

  svg.append('rect')
  .attr('x', 450)
  .attr('y', 180)
  .attr('width', 20)
  .attr('height', 350)
  .attr('fill', 'rgb(20,40,50)');

  svg.append('rect')
  .attr('x', 700)
  .attr('y', 180)
  .attr('width', 20)
  .attr('height', 350)
  .attr('fill', 'rgb(20,40,50)');

  svg.append('rect')
  .attr('x', 450)
  .attr('y', 520)
  .attr('width', 270)
  .attr('height', 20)
  .attr('fill', 'rgb(20,40,50)');

  waterLine = svg.append('rect')
  .attr('fill', 'blue')
  .attr('x', 578)
  .attr('y', 120)
  .attr('width', 0)
  .attr('height', 400);

  waterLevel = svg.append('rect')
  .attr('fill', 'blue')
  .attr('x', 470)
  .attr('y', 520)
  .attr('width', 230)
  .attr('height', 0);

  svg.append('rect')
  .attr('width', 80)
  .attr('height', 20)
  .attr('x', 370)
  .attr('y', 490)
  .attr('fill', 'rgb(20,40,50)');

   svg.append('rect')
   .attr('width', 20)
   .attr('height', 40)
   .attr('x', 370)
   .attr('y', 490)
   .attr('fill', 'rgb(20,40,50)');

   waterOut = svg.append('rect')
   .attr('width', 0)
   .attr('height', 70)
   .attr('x', 380)
   .attr('y', 530)
   .attr('fill', 'blue');

   svg.append('line')
   .attr('fill','brown')
   .attr('stroke', 'brown')
   .attr('stroke-width', '3')
   .attr('x1', 400)
   .attr('y1', 470)
   .attr('x2', 400)
   .attr('y2', 490);

   exit_valve = svg.append('path')
   .attr('fill', 'brown')
   .attr('d','M390,460 L410,480 L410,460 L390,480Z');

   svg.append('rect')
   .attr('x',430)
   .attr('y',540)
   .attr('width',370)
   .attr('height',60)
   .attr('fill','black');

  svg.append('line')
  .attr('x1',720)
  .attr('y1',220)
  .attr('x2',800)
  .attr('y2',220)
  .attr('stroke','red')
  .attr('stroke-width','3')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',249.7)
  .attr('x2',790)
  .attr('y2',249.7)
  .attr('stroke','rgb(180,0,0)')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',279.4)
  .attr('x2',790)
  .attr('y2',279.4)
  .attr('stroke','rgb(130,0,0)')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',309.1)
  .attr('x2',790)
  .attr('y2',309.1)
  .attr('stroke','orange')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',338.8)
  .attr('x2',790)
  .attr('y2',338.8)
  .attr('stroke','orange')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',368.5)
  .attr('x2',790)
  .attr('y2',368.5)
  .attr('stroke','yellow')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',398.2)
  .attr('x2',790)
  .attr('y2',398.2)
  .attr('stroke','yellow')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',427.9)
  .attr('x2',790)
  .attr('y2',427.9)
  .attr('stroke','lightgreen')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',457.6)
  .attr('x2',790)
  .attr('y2',457.6)
  .attr('stroke','lightgreen')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',487.3)
  .attr('x2',790)
  .attr('y2',487.3)
  .attr('stroke','green')
  .attr('stroke-width','2')

  svg.append('line')
  .attr('x1',720)
  .attr('y1',517)
  .attr('x2',800)
  .attr('y2',517)
  .attr('stroke','darkgreen')
  .attr('stroke-width','3')

  //percent texts
  svg.append('text')
  .text('0%')
  .attr('x',810)
  .attr('y',522)
  .attr('fill','darkgreen')
  .attr('font-size',21)
  .attr('stroke','darkgreen')

  svg.append('text')
  .text('10%')
  .attr('x',810)
  .attr('y',494)
  .attr('fill','green')
  .attr('font-size',21)
  .attr('stroke','green')

  svg.append('text')
  .text('20%')
  .attr('x',810)
  .attr('y',464)
  .attr('fill','lightgreen')
  .attr('font-size',21)
  .attr('stroke','lightgreen')

  svg.append('text')
  .text('30%')
  .attr('x',810)
  .attr('y',434)
  .attr('fill','lightgreen')
  .attr('font-size',21)
  .attr('stroke','lightgreen')

  svg.append('text')
  .text('40%')
  .attr('x',810)
  .attr('y',404)
  .attr('fill','yellow')
  .attr('font-size',21)
  .attr('stroke','yellow')

  svg.append('text')
  .text('50%')
  .attr('x',810)
  .attr('y',374)
  .attr('fill','yellow')
  .attr('font-size',21)
  .attr('stroke','yellow')

  svg.append('text')
  .text('60%')
  .attr('x',810)
  .attr('y',344)
  .attr('fill','orange')
  .attr('font-size',21)
  .attr('stroke','orange')

  svg.append('text')
  .text('70%')
  .attr('x',810)
  .attr('y',314)
  .attr('fill','orange')
  .attr('font-size',21)
  .attr('stroke','orange')

  svg.append('text')
  .text('80%')
  .attr('x',810)
  .attr('y',284)
  .attr('fill','rgb(170,0,0)')
  .attr('font-size',21)
  .attr('stroke','rgb(170,0,0)')

  svg.append('text')
  .text('90%')
  .attr('x',810)
  .attr('y',254)
  .attr('fill','rgb(190,0,0)')
  .attr('font-size',21)
  .attr('stroke','rgb(190,0,0)')

  svg.append('text')
  .text('100%')
  .attr('x',810)
  .attr('y',224)
  .attr('fill','red')
  .attr('font-size',21)
  .attr('stroke','red')
}

function animateWaterLVL(desVal) {
  // clearIntervalWL(dataChechking);
  var speed = 0;

  if (desVal*1 == lastKnownPercent*1) {
    return;
  }
  else if (desVal*1 < lastKnownPercent*1) { //namalqvame
    startWaterExit();
    speed = 200;
  }
  else { //uvelichavame
    startWaterEntry();
    speed = 150;
  }

  waterLevel
  .transition()
  .delay(0)
  .duration((Math.abs(desVal - lastKnownPercent)) * speed)
  .attr('y', 520 - 300 * desVal / 100)
  .attr('height', desVal / 100 * 300)
  .each('end', function () {
    $('#value_of_input').attr('disabled',false);
    $('#desiredLevelBTN').attr('disabled',false);
    lastKnownPercent = desVal;
      stopWaterExit();
      stopWaterEntry();

   $('#valueCur').val('').focus();
   });
}

function stopWaterEntry() {
     waterLine
     .transition()
     .duration(500)
     .attr('x','578')
     .attr('width', '0');
   }

function startWaterEntry() {
     waterLine
     .transition()
     .duration(800)
     .attr('x','566')
     .attr('width', '24');
   }

function stopWaterExit() {
  exit_valve
  .transition()
  .duration(300)
  .attrTween("transform", function () {
       var i = d3.interpolate(180,0);
       return function (t) {
         return "rotate(" + i(t) + "," + 400 + ',' + 470 + ")";
       };
     })
     .each('end',function(){
       waterOut
       .transition()
       .duration(500)
       .attr('width', 0)
       .attr('x', 380);
     });
}

function startWaterExit() {
  exit_valve
  .transition()
  .duration(300)
  .attrTween("transform", function () {
       var i = d3.interpolate(0,180);
       return function (t) {
         return "rotate(" + i(t) + "," + 400 + ',' + 470 + ")";
       };
     })
     .each('end',function(){
       waterOut
       .transition()
       .duration(1100)
       .attr('width', 16)
       .attr('x', 372);
     })
}

function validator(num) {
  if (isNaN(num) || typeof(num)=='undefined' || num*1 < 0 || num*1 > 100 || num == '') {
    console.log('Desired water level inaccurate!');
    return false;
  }
  return true;
}

function GetWaterLevel(dataChechking) {
    $.getJSON( "./data.json", function( data ) {
      if(validator(parseFloat(data.level))) {
        $('#valueCur').text(parseFloat(data.level) + '%');
        animateWaterLVL(parseFloat(data.level));
      }
    });
}

// function clearIntervalWL(dataChechking){
//   clearInterval(dataChechking);
// }

function makeRequest(val){
  // clearIntervalWL(dataChechking);
  $('#value_of_input').attr('disabled',true);
  $('#desiredLevelBTN').attr('disabled',true);

  if(validator(parseFloat(val))) {

    $.ajax({
      type: "POST",
      url: "./saveData",
      data: {"level":val}
    });
    GetWaterLevel();
  }

}


$('body').on('click','#desiredLevelBTN',function () {

  if(validator(parseFloat($('#value_of_input').val()))){
    makeRequest(parseFloat($('#value_of_input').val()));
  }
  else {
    console.log('wrong data input');
  }
});

$('#value_of_input').on('keydown', function (ev) {
  if(ev.keyCode == 13) {
    if(validator(parseFloat($('#value_of_input').val()))){
      makeRequest(parseFloat($('#value_of_input').val()));
    }
    else {
      console.log('wrong data input');
    }
  }
});
