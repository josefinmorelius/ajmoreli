var renderer, scene, camera 
function createscene() 
{
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( new THREE.Color(0xFFFFFF), 1.0 ); // set background color 
    document.getElementById('container').appendChild(renderer.domElement );

    const range = 75;

    camera_h_w = window.innerWidth / window.innerHeight;

    const near = 0.1;

    const far = 100;

    camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);

    camera.position.set( 0, 2, 3);
    camera.lookAt(0,0,0);

    var cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );

    //window.addEventListener('resize', updateAspectRatio );

    scene = new THREE.Scene();

    const depth = 1;
    const height = 1;
    const width = 1;

    //const figure = new THREE.BoxGeometry(width, height, depth);
    //const figure = new THREE.CircleGeometry();

    //const figure_material = new THREE.MeshBasicMaterial({color: 0x00ff0});

    //const box = new THREE.Mesh(figure, figure_material);
    //scene.add(box);

};

function update (){

};
function render(){
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}

function cube(){
    const malla = new THREE.BufferGeometry();
    const coordenadas = [
        1, -1, 1,  1, -1, -1,  1, 1, -1,  1, 1, 1,  -1, 1, 1,  -1, 1, -1,  -1, -1, -1,  -1, -1, 1];
    const colores = [
        1,0,0, 1,0,1, 1,1,1, 1,1,0, 0,1,0, 0,1,1, 0,0,1, 0,0,0];
    const indices = [
        0,3,7 ,7,3,4 ,0,1,2, 0,2,3, 4,3,2 , 4,3,2 ,4,2,5, 6,7,4, 6,4,5, 1,5,2, 1,6,5, 7,6,1, 7,1,0
    ];

    malla.setIndex(indices);
    malla.setAttribute('position', new THREE.Float32BufferAttribute(coordenadas, 3));
    malla.setAttribute('color', new THREE.Float32BufferAttribute(colores, 3));
    malla.computeVertexNormals();

    const material = new THREE.MeshBasicMaterial({ vertexColors: true});
    console.log(malla);

    cubo = new THREE.Mesh(malla, material);
    scene.add(cubo)
     
    }
    
createscene();
cube();
render();