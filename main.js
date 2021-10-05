function main(){
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById('myCanvas');
    /** @type {WebGLRenderingContext} */
   var gl = canvas.getContext('webgl');
   //curve
//    const radian= Math.PI / 180;
   var vertices = []; //tampak atas
   var vertCount = 5;
   // kecepatan untuk benda sebelah kanan
   let change = 0;
   let speed = 0.0153;
   //vertices tampak atas
   for(var i = 0; i<=90; i+=1){ //rounded corner kiri atas
       var j = (i + 270) * Math.PI / 180; //atas
       var k = (i+271) * Math.PI / 180; // bawah
       var vert1 = [
           Math.sin(j) * 0.2 -0.7 , Math.cos(j) * 0.2 + 0.2, 0.530, 0.154, 0.154,
       ];
 
       var vert2 = [
           -0.7, 0.2,  0.690, 0.0690, 0.0690,
       ];
 
       var vert3 = [
           Math.sin(k) * 0.2 -0.7, Math.cos(k) * 0.2 + 0.2, 0.530, 0.25, 0.154,
       ];
       var vert4=[
        -0.7, 0.2, 0.530, 0.154, 0.154, //kiri bawah
         -0.7, Math.cos(k) * 0.2 + 0.2, 0.530, 0.154, 0.154, //kiri atas
         -0.4, 0.2, 0.530, 0.154, 0.154, //kanan atas
         -0.4, 0.2, 0.530, 0.154, 0.154,
         -0.7, Math.cos(k) * 0.2 + 0.2, 0.530, 0.154, 0.154,
         -0.37, Math.cos(k) * 0.2 + 0.2, 0.530, 0.25, 0.154,
       ];
       var vert5=[
        // Math.sin(j) * 0.2 -0.7, -0.3, 0.690, 0.0690, 0.0690, //kiri bawah
        // Math.sin(j) * 0.2 -0.7, -0.2, 0.690, 0.0690, 0.0690, //kiri atas
        // -0.4, -0.3, 0.690, 0.0690, 0.0690, //kanan bawah
        // -0.4, -0.3, 0.690, 0.0690, 0.0690, 
        Math.sin(j) * 0.2 -0.7, -0.2,0.530, 0.25, 0.154,
        -0.4, -0.2,0.530, 0.25, 0.154,
  
      ];
 
       vertices = vertices.concat(vert1);
       vertices = vertices.concat(vert2);
       vertices = vertices.concat(vert3);
       vertices = vertices.concat(vert4);
       vertices = vertices.concat(vert5);
    }
    //rounded corner bawah
      for(var i = 90; i<=180; i+=1){
       var j = (i + 90) * Math.PI / 180;
       var k = (i+91) * Math.PI / 180;
       var vert1 = [
           Math.sin(j) * 0.2 - 0.7 , Math.cos(j) * 0.2 -0.2, 0.530, 0.25, 0.154,
       ];
 
       var vert2 = [
         - 0.7, -0.2, 0.530, 0.25, 0.154,
       ];
 
       var vert3 = [
           Math.sin(k) * 0.2  - 0.7 , Math.cos(k) * 0.2 -0.2,  0.690, 0.0690, 0.0690,
       ];
       var vert4=[
        - 0.7, -0.4, 0.530, 0.25, 0.154, //kiri bawah
         -0.4, -0.4, 0.530, 0.25, 0.154, //kiri atas
         -0.4, Math.cos(j) * 0.2 ,0.530, 0.25, 0.154, //kanan atas
        //  -0.5, -0.1, 0.690, 0.0690, 0.0690,
        //  -0.1,Math.cos(j) * 0.2 -0.1, 0.690, 0.0690, 0.0690,
        //  -0.1, Math.cos(k) * 0.2 + 0.4, 0.690, 0.0690, 0.0690, 
        ];
 
       vertices = vertices.concat(vert1);
       vertices = vertices.concat(vert2);
    //    vertices = vertices.concat(vert3);
       vertices = vertices.concat(vert4);
   }
   //rounded corner kanan atas
   for(var i = 180; i<=270; i+=1){
        var j = (i + 180) * Math.PI / 180; //atas
        var k = (i+181) * Math.PI / 180; // bawah
    var vert1 = [
        Math.sin(j) * 0.2 - 0.4 , Math.cos(j) * 0.2 +0.2,0.530, 0.25, 0.154,
    ];

    var vert2 = [
      - 0.4, 0.2, 0.530, 0.25, 0.154,
    ];

    var vert3 = [
        Math.sin(k) * 0.2  - 0.4 , Math.cos(k) * 0.2 +0.2, 0.530, 0.25, 0.154,
    ];

    vertices = vertices.concat(vert1);
    vertices = vertices.concat(vert2);
    vertices = vertices.concat(vert3);
   
    }
    //rounded corner kanan bawah
    for(var i = 270; i<=360; i+=1){
        var j = (i + 180) * Math.PI / 180;
        var k = (i+250) * Math.PI / 180;
        var vert1 = [
            Math.sin(j) * 0.2 - 0.4 , Math.cos(j) * 0.2 -0.2, 0.530, 0.25, 0.154,
        ];
  
        var vert2 = [
          - 0.4, 0.2, 0.530,0.25, 0.154,
        ];
  
        var vert3 = [
            Math.sin(k) * 0.2  - 0.4 , Math.cos(k) * 0.2 -0.2, 0.530, 0.25, 0.154,
        ];
        var vert4=[
         - 0.7, -0.4,0.530, 0.25, 0.154, //kiri bawah
          -0.4, -0.4, 0.530, 0.25, 0.154, //kiri atas
          -0.5, Math.cos(j) * 0.2 -0.4, 0.530, 0.25, 0.154, //kanan atas
         //  -0.5, -0.1, 0.690, 0.0690, 0.0690,
         //  -0.1,Math.cos(j) * 0.2 -0.1, 0.690, 0.0690, 0.0690,
         //  -0.1, Math.cos(k) * 0.2 + 0.4, 0.690, 0.0690, 0.0690, 
         ];
  
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
        // vertices = vertices.concat(vert3);
    //     vertices = vertices.concat(vert4);
    }
   //vertices2 tampak samping
    var vertices2=[];
    // color code : 0.690, 0.0690, 0.0690
    var vert1=[
        0.1, -0.6, 0.690, 0.0690, 0.0690,
        0.05, -0.4,  0.690, 0.0690, 0.0690 ,
        0.5, -0.6,  0.690, 0.0690, 0.0690 ,
        0.85, -0.4,0.690, 0.0690, 0.0690,
        0.8, -0.6,0.690, 0.0690, 0.0690 ,
    ];
    var vert2=[
        0.0, -0.4,  0.690, 0.0690, 0.0690 ,
        0, -0.35, 0.530, 0.154, 0.154, //1
        0.5, -0.5,  0.690, 0.0690, 0.0690 ,
        0.9, -0.35,0.680, 0.177, 0.177 , //3
        0.9, -0.4,0.690, 0.0690, 0.0690 ,
    ];
    vertices2= vertices2.concat(vert1);
    vertices2= vertices2.concat(vert2);

   var n = vertices.length / vertCount;
   var n2 = vertices2.length / vertCount;
   var ver_comb = [...vertices, ...vertices2]
      
   var vertexBuffer = gl.createBuffer();
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(ver_comb), gl.STATIC_DRAW);
   
   var vertexShaderCode = document.getElementById("vertexShaderCode").text;
   var vertexShader = gl.createShader(gl.VERTEX_SHADER);
   gl.shaderSource(vertexShader, vertexShaderCode);
   gl.compileShader(vertexShader);
   
   if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
       console.log(gl.getShaderInfoLog(vertexShader));
   }
   
   var fragmentShaderCode = document.getElementById("fragmentShaderCode").text;
   var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
   gl.shaderSource(fragmentShader, fragmentShaderCode);
   gl.compileShader(fragmentShader);

   var shaderProgram = gl.createProgram();
   gl.attachShader(shaderProgram, vertexShader);
   gl.attachShader(shaderProgram, fragmentShader);
   gl.linkProgram(shaderProgram);
 
   if ( !gl.getProgramParameter( shaderProgram, gl.LINK_STATUS) ) {
       var info = gl.getProgramInfoLog(shaderProgram);
       throw new Error('Could not compile WebGL program. nn' + info);
     }
  
     gl.useProgram(shaderProgram);
 
   
   //untuk menggambar titik dan warna berbeda
   gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
   var aPosition = gl.getAttribLocation(shaderProgram, `aPosition`);
   gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 0);
   gl.enableVertexAttribArray(aPosition);
   
   var aColor = gl.getAttribLocation(shaderProgram, `aColor`);
   gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 5*Float32Array.BYTES_PER_ELEMENT, 2*Float32Array.BYTES_PER_ELEMENT);
   gl.enableVertexAttribArray(aColor);
   
   if (n < 0) {
       console.log('Failed to set the positions of the vertices');
       return;
   }
   
   // gl.viewport(100, 50, canvas.width, canvas.height)
   
   function drawScene() {
       if(change >= 1.2 || change <=-0.3) speed = -speed;
       change += speed;
       
       gl.useProgram(shaderProgram);
       //objek 1 : kiri, diam
       const object1 = [
           1.0, 0.0, 0.0, 0.0,
           0.0, 1.0, 0.0, 0.0,
           0.0, 0.0, 1.0, 0.0,
           0.0, 0.0, 0.0, 1.0,
       ]
       //objek 2 : kanan, bergerak memantul ke atas dan bawah dengan speed 0.0153
       const object2 = [
           1.0, 0.0, 0.0, 0.0,
           0.0, 1.0, 0.0, 0.0,
           0.0, 0.0, 1.0, 0.0,
           0.0, change, 0.0, 1.0,
       ]
       
       gl.clearColor(0.940, 0.899, 0.865, 1);
       gl.clear(gl.COLOR_BUFFER_BIT);
   
       // Draw a line
       const u_matrix = gl.getUniformLocation(shaderProgram, 'u_matrix');
       gl.uniformMatrix4fv(u_matrix, false, object1);
       gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);       
       gl.uniformMatrix4fv(u_matrix, false, object2);
       gl.drawArrays(gl.TRIANGLE_STRIP, n, n2);
   
       requestAnimationFrame(drawScene);
   }

   drawScene();
  
   

}
