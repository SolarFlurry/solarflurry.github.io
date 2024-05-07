var canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const gl = canvas.getContext('webgl');
canvas.width = 800;
canvas.height = 600;

gl.clearColor(0,0,0);
gl.clear(gl.COLOR_BUFFET_BIT);
