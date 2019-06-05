//Apply to position
delay = 5;
d = delay*thisComp.frameDuration*(index - 1);
thisComp.layer(1).position.valueAtTime(time - d)

//Apply to opacity
opacityFactor = .75;
Math.pow(opacityFactor,index - 1)*100
