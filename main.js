

function main(){
    /** @type {HTMLCanvasElement} */
    var canvas = document.getElementById('myCanvas');
    /** @type {WebGLRenderingContext} */
   var gl = canvas.getContext('webgl');
  //tampak atas
   var vertices = []; 
   var vertCount = 5;
   // kecepatan untuk benda sebelah kanan
   let change = 0;
   let speed = 0.0153;
      //outer
    var segitigaTengah1=[
        -0.815,-0.195,0.800, 0.400, 0.400,
        -0.815,0.185,0.800, 0.400, 0.400,
        -0.24,-0.195,0.800, 0.400, 0.400,
    ];
    var segitigaTengah2=[
        -0.24,0.185,0.800, 0.400, 0.400,
        -0.815,0.185,0.800, 0.400, 0.400,
        -0.24,-0.195,0.800, 0.400, 0.400,
    ];
    vertices=vertices.concat(segitigaTengah1);
    vertices=vertices.concat(segitigaTengah2);
    //bag. corner
    //kiri atas
    vertices=vertices.concat(make_bevel(90,-0.815,0.185,0.075,270,0.800, 0.400, 0.400 ));
    //kiri bawah
    vertices=vertices.concat(make_bevel(90,-0.815,-0.195,0.075,180,0.800, 0.400, 0.400 ));
    //kanan atas
    vertices=vertices.concat(make_bevel(90,-0.24,0.185,0.075,0,0.800, 0.400, 0.400 ));
    //kanan bawah
    vertices=vertices.concat(make_bevel(90,-0.24,-0.195,0.075,90,0.800, 0.400, 0.400 ));
    var segitigaKiri1=[
        -0.815-0.075,-0.195,0.800, 0.400, 0.400,
        -0.815,-0.195,0.800, 0.400, 0.400,
        -0.815-0.075,0.185,0.800, 0.400, 0.400,
    ];
    var segitigaKiri2=[
        -0.815,0.185,0.800, 0.400, 0.400,
        -0.815-0.075,0.185,0.800, 0.400, 0.400,
        -0.815,-0.195,0.800, 0.400, 0.400,
    ];
    var segitigaAtas1=[
        -0.815,0.185,0.800, 0.400, 0.400,
        -0.815,0.185+0.075,0.800, 0.400, 0.400,
        -0.24,0.185,0.800, 0.400, 0.400,
    ];
    var segitigaAtas2=[
        -0.24,0.185+0.075,0.800, 0.400, 0.400,
        -0.815,0.185+0.075,0.800, 0.400, 0.400,
        -0.24,0.185,0.800, 0.400, 0.400,
    ];
    var segitigaKanan1=[
        -0.24,-0.195,0.800, 0.400, 0.400,
        -0.24+0.075,-0.195,0.800, 0.400, 0.400,
        -0.24,0.185,0.800, 0.400, 0.400,
    ];
    var segitigaKanan2=[
        -0.24+0.075,0.185,0.800, 0.400, 0.400,
        -0.24+0.075,-0.195,0.800, 0.400, 0.400,
        -0.24,0.185,0.800, 0.400, 0.400,
    ];
    var segitigaBawah1=[
        -0.815,-0.195-0.075,0.800, 0.400, 0.400,
        -0.815,-0.195,0.800, 0.400, 0.400,
        -0.24,-0.195-0.075,0.800, 0.400, 0.400,
    ];
    var segitigaBawah2=[
        -0.24,-0.195,0.800, 0.400, 0.400,
        -0.815,-0.195,0.800, 0.400, 0.400,
        -0.24,-0.195-0.075,0.800, 0.400, 0.400,
    ];
    vertices=vertices.concat(segitigaKiri1);
    vertices=vertices.concat(segitigaKiri2);
    vertices=vertices.concat(segitigaAtas1);
    vertices=vertices.concat(segitigaAtas2);
    vertices=vertices.concat(segitigaKanan1);
    vertices=vertices.concat(segitigaKanan2);
    vertices=vertices.concat(segitigaBawah1);
    vertices=vertices.concat(segitigaBawah2);

    //inner1
    // var vertices3=[];
    var inner_ta1=[
        -0.815,-0.195,0.730, 0.197, 0.197,
        -0.815,0.185,0.730, 0.197, 0.197,
        -0.235,-0.195,0.730, 0.197, 0.197
    ];
    var inner_ta2=[
        -0.235,0.185,0.730, 0.197, 0.197,
        -0.815,0.185,0.730, 0.197, 0.197,
        -0.235,-0.195,0.730, 0.197, 0.197
    ];
    vertices=vertices.concat(inner_ta1);
    vertices=vertices.concat(inner_ta2);
    vertices=vertices.concat(make_bevel(90,-0.815,0.185,0.05,270,0.730, 0.197, 0.197 ));
    //kiri bawah
    vertices=vertices.concat(make_bevel(90,-0.815,-0.195,0.05,180,0.730, 0.197, 0.197 ));
    //kanan atas
    vertices=vertices.concat(make_bevel(90,-0.235,0.185,0.05,0,0.730, 0.197, 0.197 ));
    //kanan bawah
    vertices=vertices.concat(make_bevel(90,-0.235,-0.195,0.05,90,0.730, 0.197, 0.197 ));
    var inner_ta1_atas=[
        -0.815,0.185,0.730, 0.197, 0.197,
        -0.815,0.185+0.05,0.730, 0.197, 0.197,
        -0.235,0.185,0.730, 0.197, 0.197
    ];
    var inner_ta2_atas=[
        -0.235,0.185+0.05,0.730, 0.197, 0.197,
        -0.815,0.185+0.05,0.730, 0.197, 0.197,
        -0.235,0.185,0.730, 0.197, 0.197
    ];
    var inner_ta1_kanan=[
        -0.235,-0.195,0.730, 0.197, 0.197,
        -0.235,0.185,0.730, 0.197, 0.197,
        -0.235+0.05,-0.195,0.730, 0.197, 0.197,
    ];
    var inner_ta2_kanan=[
        -0.235+0.05,0.185,0.730, 0.197, 0.197,
        -0.235,0.185,0.730, 0.197, 0.197,
        -0.235+0.05,-0.195,0.730, 0.197, 0.197,
    ];
    var inner_ta1_bwh=[
        -0.815,-0.195-0.05,0.730, 0.197, 0.197,
        -0.815,-0.195,0.730, 0.197, 0.197,
        -0.235,-0.195-0.05,0.730, 0.197, 0.197
    ];
    var inner_ta2_bwh=[
        -0.235,-0.195,0.730, 0.197, 0.197,
        -0.815,-0.195,0.730, 0.197, 0.197,
        -0.235,-0.195-0.05,0.730, 0.197, 0.197
    ];
    var inner_ta1_ki=[
        -0.815-0.05,-0.195,0.730, 0.197, 0.197,
        -0.815-0.05,0.185,0.730, 0.197, 0.197,
        -0.815,-0.195,0.730, 0.197, 0.197,
    ];
    var inner_ta2_ki=[
        -0.815,0.185,0.730, 0.197, 0.197,
        -0.815-0.05,0.185,0.730, 0.197, 0.197,
        -0.815,-0.195,0.730, 0.197, 0.197,
    ];
    vertices=vertices.concat(inner_ta1_atas);
    vertices=vertices.concat(inner_ta2_atas);
    vertices=vertices.concat(inner_ta1_kanan);
    vertices=vertices.concat(inner_ta2_kanan);
    vertices=vertices.concat(inner_ta1_bwh);
    vertices=vertices.concat(inner_ta2_bwh);
    vertices=vertices.concat(inner_ta1_ki);
    vertices=vertices.concat(inner_ta2_ki);
    //core
    var core_ta1=[
        -0.785,-0.175,0.600, 0.138, 0.138,
        -0.785,0.165,0.600, 0.138, 0.138,
        -0.265,-0.175,0.600, 0.138, 0.138
    ];
    var core_ta2=[
        -0.265,0.165,0.600, 0.138, 0.138,
        -0.785,0.165,0.600, 0.138, 0.138,
        -0.265,-0.175,0.600, 0.138, 0.138
    ];
    vertices=vertices.concat(core_ta1);
    vertices=vertices.concat(core_ta2);
    vertices=vertices.concat(make_bevel(90,-0.785,0.155,0.035,270,0.600, 0.138, 0.138 ));
    //kiri bawah
    vertices=vertices.concat(make_bevel(90,-0.785,-0.175,0.035,180,0.600, 0.138, 0.138));
    //kanan atas
    vertices=vertices.concat(make_bevel(90,-0.265,0.155,0.035,0,0.600, 0.138, 0.138));
    //kanan bawah
    vertices=vertices.concat(make_bevel(90, -0.265,-0.175,0.035,90,0.600, 0.138, 0.138 ));
    var core_ta1_atas=[
        -0.785,0.155,0.600, 0.138, 0.138,
        -0.785,0.155+0.035,0.600, 0.138, 0.138,
        -0.265,0.155,0.600, 0.138, 0.138
    ];
    var core_ta2_atas=[
        -0.265,0.155+0.035,0.600, 0.138, 0.138,
        -0.785,0.155+0.035,0.600, 0.138, 0.138,
        -0.265,0.155,0.600, 0.138, 0.138
    ];
    var core_ta1_ka=[
        -0.265,-0.175,0.600, 0.138, 0.138,
        -0.265,0.165,0.600, 0.138, 0.138,
        -0.265+0.035,-0.175,0.600, 0.138, 0.138
    ];
    var core_ta2_ka=[
        -0.265+0.035,0.165,0.600, 0.138, 0.138,
        -0.265,0.165,0.600, 0.138, 0.138,
        -0.265+0.035,-0.175,0.600, 0.138, 0.138
    ];
    var core_ta1_bwh=[
        -0.785,-0.175-0.035,0.600, 0.138, 0.138,
        -0.785,-0.175,0.600, 0.138, 0.138,
        -0.265,-0.175-0.035,0.600, 0.138, 0.138
    ];
    var core_ta2_bwh=[
        -0.265,-0.175,0.600, 0.138, 0.138,
        -0.785,-0.175,0.600, 0.138, 0.138,
        -0.265,-0.175-0.035,0.600, 0.138, 0.138
    ];
    var core_ta1_ki=[
        -0.785-0.035,-0.175,0.600, 0.138, 0.138,
        -0.785-0.035,0.165,0.600, 0.138, 0.138,
        -0.785,-0.175,0.600, 0.138, 0.138,
    ];
    var core_ta2_ki=[
        -0.265,0.165,0.600, 0.138, 0.138,
        -0.785-0.035,0.165,0.600, 0.138, 0.138,
        -0.785,-0.175,0.600, 0.138, 0.138,
    ];
    vertices=vertices.concat(core_ta1_atas);
    vertices=vertices.concat(core_ta2_atas);
    vertices=vertices.concat(core_ta1_ka);
    vertices=vertices.concat(core_ta2_ka);
    vertices=vertices.concat(core_ta1_bwh);
    vertices=vertices.concat(core_ta2_bwh);
    vertices=vertices.concat(core_ta1_ki);
    vertices=vertices.concat(core_ta2_ki);

    //vertices2 tampak samping
    var vertices2=[];
    // color code : 0.690, 0.0690, 0.0690
    var vert1=[
        0.08, -0.6, 0.600, 0.138, 0.138, 
        0.05, -0.4,  0.600, 0.138, 0.138,
        0.2, -0.6,  0.600, 0.138, 0.138,
        0.9, -0.4,0.600, 0.138, 0.138,
        0.87, -0.6,0.600, 0.138, 0.138,
    ];
    var vert2=[
        -0.012, -0.4,  0.600, 0.138, 0.138,
        -0.012, -0.35, 0.530, 0.154, 0.154, //1
        0.5, -0.5,  0.600, 0.138, 0.138,
        0.963, -0.35,0.530, 0.154, 0.154, //3
        0.963, -0.4,0.600, 0.138, 0.138,
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
       gl.drawArrays(gl.TRIANGLES, 0, n);       
       gl.uniformMatrix4fv(u_matrix, false, object2);
       gl.drawArrays(gl.TRIANGLE_STRIP, n, n2);
   
       requestAnimationFrame(drawScene);
   }

   drawScene();
  
   

}
//membuat lingkaran
function make_bevel(degree, px = 0, py = 0 , radius = 1, start_degree = 0, r, g, b){
    let points = []

    for(let i = 0; i <= degree; i++){
        let j = (i + start_degree) * Math.PI / 180;
        let k = (i + start_degree + 1) * Math.PI / 180;
    
        let vert1 = [
            Math.sin(j) * radius + px, Math.cos(j) * radius + py, r, g, b
        ]
    
        let vert2 = [
            px, py, r, g, b
        ]
        let vert3 = [
            Math.sin(k) * radius + px, Math.cos(k) * radius + py, r, g, b
        ]
    
        points = points.concat(vert1);
        points = points.concat(vert2);
        points = points.concat(vert3);
    }

    return points;
}
