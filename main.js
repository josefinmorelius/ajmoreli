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

    const far = 10000;

    camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);


    camera.position.set(34,13,0);

    var cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );


    scene = new THREE.Scene();

    const depth = 1;
    const height = 1;
    const width = 1;
};

function update (){
    
// upload the movement for key events http://stemkoski.github.io/Three.js/#keyboard-events

};

var fish = fish
var fish_2 = fish_2
function render(){
    requestAnimationFrame(render);
    positionY += 0.02 * direction;
    
    if (positionY >= 2) {
        direction = -2;
    } else if (positionY <= -2) {
        direction = 2;
    };
 
    fish.position.setY(positionY);
    fish_2.position.setY(positionY);
    detect_collision();
   
    update();
    renderer.render(scene, camera);
}

function plane(){

const plane = new THREE.PlaneGeometry(50,50);
const material = new THREE.MeshBasicMaterial({color: 'blue', side: THREE.DoubleSide});
const create_plane = new THREE.Mesh(plane, material);
create_plane.rotateX(-Math.PI/2);
const grid = new THREE.GridHelper(50,50);
scene.add(grid);
scene.add(create_plane);

}
function spheres(){
    const globe1 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    const material = new THREE.MeshBasicMaterial({color: 'brown'});
    cubo1 = new THREE.Mesh(globe1, material);

    const globe2 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo2 = new THREE.Mesh(globe2, material);
    const globe3 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo3 = new THREE.Mesh(globe3, material);
    const globe4 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo4 = new THREE.Mesh(globe4, material);
    const globe5 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo5 = new THREE.Mesh(globe5, material);
    const globe6 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo6 = new THREE.Mesh(globe6, material);
    
    scene.add(cubo1);
    window.cubo1 = cubo1;
    scene.add(cubo2); // the one in the middle
    window.cubo2 = cubo2;
    scene.add(cubo3);
    window.cubo3 = cubo3;
    scene.add(cubo4);
    window.cubo4 = cubo4;
    scene.add(cubo5);
    window.cubo5 = cubo5;
    scene.add(cubo6);
    window.cubo6 = cubo6;
    cubo1.position.x = 5;
    cubo1.position.z = -5;
    cubo1.position.x = 15;
    cubo3.position.z = 12;
    cubo4.position.x = -15;
    cubo5.position.z = 20;
    cubo5.position.x = 15;
    cubo6.position.x = -20;
    cubo6.position.z = -10;
    };

// create skybox
function create_skybox(){
    let skybox_array = [];
    let skybox_loader_back = new THREE.TextureLoader().load('images/DaylightBox_Back.png');
    let skybox_loader_bottom = new THREE.TextureLoader().load('images/DaylightBox_Bottom.png');
    let skybox_loader_front = new THREE.TextureLoader().load('images/DaylightBox_Front.png');
    let skybox_loader_left = new THREE.TextureLoader().load('images/DaylightBox_Left.png');
    let skybox_loader_right = new THREE.TextureLoader().load('images/DaylightBox_Right.png');
    let skybox_loader_top = new THREE.TextureLoader().load('images/DaylightBoxTop.png');
   
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_front, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_back, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_top, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_bottom, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_left, side: THREE.BackSide }));
    skybox_array.push(new THREE.MeshBasicMaterial({map:skybox_loader_right, side: THREE.BackSide}));
    console.log(skybox_array);

    let skybox_box = new THREE.BoxGeometry(100, 100, 100);
    let skybox = new THREE.Mesh(skybox_box, skybox_array);
    scene.add(skybox);

}

const loader_OBJ = new THREE.OBJLoader();
const loader_material = new THREE.TextureLoader();


// load a resource
loader_OBJ.load(
	// resource URL
	'models/boat.obj',
  
	// called when resource is loaded
	function ( boat ) {

		scene.add( boat );
        boat.scale.x = boat.scale.y = boat.scale.z = 0.005;
        boat.rotateX(-1.55);

        boat.position.set(7,-1,0);    
        window.boat = boat;      
	},
	function ( error ) {
		console.log('Error');
	} 
);
let positionY = 0;
let direction = 1;

loader_OBJ.load(
	// resource URL
	'models/Mesh_Goldfish.obj',
  
	// called when resource is loaded
	function ( fish ) {

	
        fish.scale.x = fish.scale.y = fish.scale.z = 0.05;
        fish.rotateX(-1)
        fish.position.set(10, positionY, 5);
        scene.add(fish);
        globalThis.fish = fish;
        fish_2 = fish.clone();
        fish_2.position.set(-20, positionY, 10);
        scene.add(fish_2);
	},
	function ( error ) {
		console.log('Error');
	} 
);

/*loader_material.load(
    'models/Tex_Goldfish.png',
  
	// called when resource is loaded
	function ( fish_texture ) {
        var material = new THREE.MeshBasicMaterial({ map: fish_texture});
        console.log(material);
        const fish_with_texture = new THREE.Mesh(window.fish, material);
        console.log("hello", fish_with_texture);
        scene.add(fish_with_texture);
		    
	},
	function ( error ) {
		console.log('Error fish');
	} 
);*/


/*loader_material.load(
	// resource URL
	'models/boat-threejsboat_d.jpg',
  
	// called when resource is loaded
	function ( texture ) {

		var material = new THREE.MeshBasicMaterial({map: texture});
        window.material = material;
	},
	function ( error ) {
		console.log('Error');
	} 
);

boat_material = new THREE.Mesh(window.boat, window.material);
scene.add(boat_material);*/
 
document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        boat.position.x -=1;
        //boat.position.sub(boatPosition); 
        break;
      case 'ArrowDown':
        boat.position.x +=1;
        //boat.position.add(boatPosition); 
        break;
      case 'ArrowLeft':
        boat.position.z += 1;
        //boat.rotateZ(Math.PI/2); 
        //boatPosition.applyAxixAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        //rotation.z -= Math.PI / 2;
        break;
      case 'ArrowRight':
        boat.position.z -= 1;
        //boat.rotateZ(-Math.PI/2); 
        //boatPosition.applyAxixAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
        //rotation.z += Math.PI / 2;
        break;
    }
  });

  function detect_collision (){

    var boat_bb = new THREE.Box3().setFromObject(window.boat);
    var island_b1 = new THREE.Box3().setFromObject(window.cubo1);
    var island_b2 = new THREE.Box3().setFromObject(window.cubo2);
    var island_b3 = new THREE.Box3().setFromObject(window.cubo3);
    var island_b4 = new THREE.Box3().setFromObject(window.cubo4);
    var island_b5 = new THREE.Box3().setFromObject(window.cubo5);
    var island_b6 = new THREE.Box3().setFromObject(window.cubo6);


    //const sphere = new THREE.Sphere().setFromObject(window.cubo2);

    //sphere.setFromPoints(window.cubo2.thetaLength);
    

    //const boundingSphere = new THREE.Sphere();
    //boundingSphere.setFromPoints(window.boat.attributes.position.array);


    //var collision1 = boat_bb.intersectsBox(island_b1);
    var collision2 = boat_bb.intersectsBox(island_b2);
    var collision3 = boat_bb.intersectsBox(island_b3);
    var collision4 = boat_bb.intersectsBox(island_b4);
    var collision5 = boat_bb.intersectsBox(island_b5);
    var collision6 = boat_bb.intersectsBox(island_b6);
    var collision1 = boat_bb.intersectsSphere(island_b1);

   
    if (collision2 === true){
        window.open("https://www.w3schools.com");
    }

};
/*
function buildWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const water = new THREE.Water(
      waterGeometry,
      {
        textureWidth: 512,
        textureHeight: 512,
        waterNormals: new THREE.TextureLoader().load('', function ( texture ) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }),
        alpha: 1.0,
        sunDirection: new THREE.Vector3(),
        sunColor: 0xffffff,
        waterColor: 0x001e0f,
        distortionScale: 3.7,
        fog: scene.fog !== undefined
      }
    );
    water.rotation.x =- Math.PI / 2;
    scene.add(water);
    
    const waterUniforms = water.material.uniforms;
    return water;
  }
const water = buildWater();  

this.update = function() {
    // Animates our water
    water.material.uniforms[ 'time' ].value += 1.0 / 60.0;
  
      // Reposition our sphere to appear to float up and down
    const time = performance.now() * 0.001;
    sphere.position.y = Math.sin( time ) * 2;
    sphere.rotation.x = time * 0.3;
    sphere.rotation.z = time * 0.3;
      
      // Finally, render our scene
    renderer.render(scene, camera);
  }
  */

createscene();
create_skybox();
//plane();
spheres();
render();






