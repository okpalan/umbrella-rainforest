import HemiSphere from "./src/hemisphere.js";
import Vector from "./src/lib/vector.js";

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
var sphere = new HemiSphere(1000, 130, 10,);
var center = new Vector.Vec2(width / 2, height / 2);

var render = function () {
    ctx.clearRect(0, 0, width, height);
    sphere.draw(ctx, center);
    requestAnimationFrame(render);
}

render();