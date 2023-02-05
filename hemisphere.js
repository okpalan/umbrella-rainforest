'use strict';
import Vector from "./lib/vector.js";

function HemiSphere(radius, detail = 0) {
    this.radius = radius; //    radius
    this.detail = detail; // detail level
    this.vertices = []; // vertex positions
    this.faces = []; // face indices
    this.uvs = []; // texture coordinates
    this.normals = []; // vertex normals
    this.init();
}

HemiSphere.prototype.init = function () {
    this.vertices = [];
    this.faces = [];
    this.uvs = [];
    this.normals = [];
    var v = new Vector.Vec3(0, 0, 0);
    var u = new Vector.Vec3(0, 0, 0);
    var n = new Vector.Vec3(0, 0, 0);
    var i, j, k, l, m, p, q, r, s;
    var x, y, z, w;
    var a, b, c, d;
    var phiStart = 0;
    var phiLength = Math.PI;
    var thetaStart = 0;
    var thetaLength = Math.PI * 2;
    var thetaEnd = Math.min(thetaStart + thetaLength, Math.PI);
    var ix, iy;
    var index = 0;
    var grid = [];
    var vertex = new Vector.Vec3();
    var normal = new Vector.Vec3();
    var uv = new Vector.Vec3();
    // buffers
    var indices = [];
    var vertices = [];
    var normals = [];
    var uvs = [];
    // generate vertices, normals and uvs
    for (iy = 0; iy <= this.detail; iy++) {
        var verticesRow = [];
        var v = iy / this.detail;
        // special case for the poles
        var uOffset = 0;
        if (iy == 0 && phiStart == 0) {
            uOffset = 0.5 / this.detail;
        } else if (iy == this.detail && phiLength == Math.PI) {
            uOffset = -0.5 / this.detail;
        }
        for (ix = 0; ix <= this.detail; ix++) {
            var u = ix / this.detail;
            // vertex
            vertex.x = -this.radius * Math.cos(phiStart + v * phiLength) * Math.sin(thetaStart + u * thetaLength);
            vertex.y = this.radius * Math.sin(phiStart + v * phiLength);
            vertex.z = this.radius * Math.cos(phiStart + v * phiLength) * Math.cos(thetaStart + u * thetaLength);
            vertices.push(vertex.x, vertex.y, vertex.z);
            // normal
            normal.copy(vertex).norm();
            normals.push(normal.x, normal.y, normal.z);
        }
        grid.push(verticesRow);

    }
    // indices
    for (iy = 0; iy < this.detail; iy++) {
        for (ix = 0; ix < this.detail; ix++) {
            var a = ix + this.detail + 1;
            var b = ix + this.detail;
            var c = ix;
            var d = ix + 1;
            // faces
            indices.push(a, b, d);
            indices.push(b, c, d);
        }
    }
    // build geometry
    this.vertices = vertices;
    this.faces = indices;
    this.normals = normals;
    this.uvs = uvs;
}

HemiSphere.prototype.getVertices = function () {
    return this.vertices;
}

HemiSphere.prototype.getFaces = function () {
    return this.faces;
}

HemiSphere.prototype.getNormals = function () {
    return this.normals;
}

HemiSphere.prototype.getUvs = function () {
    return this.uvs;
}

HemiSphere.prototype.getRadius = function () {
    return this.radius;
}

HemiSphere.prototype.setRadius = function (radius) {
    this.radius = radius;
    this.init();
}

HemiSphere.prototype.draw = function (ctx) {
    var vertices = this.getVertices();
    var faces = this.getFaces();
    var normals = this.getNormals();
    var uvs = this.getUvs();
    var i, j, k, l, m, p, q, r, s;
    var x, y, z, w;
    var a, b, c, d;
    var n = new Vector.Vec3(0, 0, 0);
    var v = new Vector.Vec3(0, 0, 0);
    var u = new Vector.Vec3(0, 0, 0);
    // draw faces
    

    ctx.beginPath();
    ctx.strokeStyle = "red";
    for (i = 0; i < faces.length; i += 3) {
        a = faces[i] * 3;
        b = faces[i + 1] * 3;
        c = faces[i + 2] * 3;
        v.x = vertices[a];
        v.y = vertices[a + 1];
        v.z = vertices[a + 2];
        u.x = vertices[b];
        u.y = vertices[b + 1];
        u.z = vertices[b + 2];
        n.x = vertices[c];
        n.y = vertices[c + 1];
        n.z = vertices[c + 2];
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(u.x, u.y);
        ctx.lineTo(n.x, n.y);
        ctx.lineTo(v.x, v.y);

    }

    ctx.stroke();
    ctx.closePath();
}

export default HemiSphere;
