veloc = 7; 
amplitude = 90; 
decay = .7; 
t = time - inPoint;

amplitude*Math.cos(veloc*t)/Math.exp(decay*t);
