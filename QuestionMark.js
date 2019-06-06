//position
veloc = 15;
amplitude = 160;
decay = 1.0; 
x = amplitude*Math.sin(veloc*time)/Math.exp(decay*time);
y = amplitude*Math.cos(veloc*time)/Math.exp(decay*time);
value + [x,y]


//scale
easeOut(time,0,0.3,[0,0],[100,100])
