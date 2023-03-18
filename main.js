var renderer, scene, camera;

var boat_ob, fish, fish_2, cubo1, cubo2, cubo3, cubo4, cubo5, cubo6;

var loader_OBJ = new THREE.OBJLoader();
var loader_material = new THREE.TextureLoader();
var loader = new THREE.FontLoader();


function createscene() 
{
    renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( new THREE.Color('white'), 1.0 ); // set background color 
    document.getElementById('container').appendChild(renderer.domElement );
    const light = new THREE.DirectionalLight({color: 'red'});
    const light_a = new THREE.AmbientLight(0xfffff,0.1);

    light.shadow.camera.left = -20;
    light.shadow.camera.right = 20;
    light.shadow.camera.top = 20;
    light.shadow.camera.bottom = -20;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 50;
    
    light.castShadow = true;
    light.shadow.mapSize.width = 1000; 
    light.shadow.mapSize.height = 1000; 
    light.position.set(0, 30, 20);
    const range = 75;

    camera_h_w = window.innerWidth / window.innerHeight;

    const near = 0.1;

    const far = 10000;

    camera = new THREE.PerspectiveCamera(range, camera_h_w, near, far);

    camera.position.set(34,13,0);

    var cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
    cameraControls.target.set( 0, 0, 0 );
    cameraControls.minDistance = 10;
    cameraControls.maxDistance = 50;

    scene = new THREE.Scene();
    scene.add(light);
    scene.add(light_a);
    

    light.shadow.camera.near = 0.01;
    light.shadow.camera.far = 5000;
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);
};


let positionY = 0;
let direction = 1;

function render(){
    requestAnimationFrame(render);
    positionY += 0.02 * direction;
    
    if (positionY >= 2) {
        direction = -2;
    } else if (positionY <= -2) {
        direction = 2;
    };
  
    if (fish == undefined) {
        console.log("loading")
    }
    else{

    fish.position.setY(positionY);
    fish_2.position.setY(positionY);
    
    if (cubo1 == undefined || boat_ob == undefined) {
        console.log("loading")
    }
    else{
    detect_collision(); }

    renderer.render(scene, camera);}
    
      
}

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


    let skybox_box = new THREE.BoxGeometry(1000, 1000, 1000);
    let skybox = new THREE.Mesh(skybox_box, skybox_array);
    scene.add(skybox);

}

function boat(){
    loader_OBJ.load(

        'models/boat.obj',
    
        function ( boat_ob_fun ) {
            boat_ob_fun.scale.x = boat_ob_fun.scale.y = boat_ob_fun.scale.z = 0.005;
            boat_ob_fun.rotateX(-1.55);
            boat_ob_fun.position.set(7,-1,0);  
            /*boat_ob_fun.traverse(function(node) {
                if(node.isMesh)
                node.castShadow = true;
            })*/
            boat_ob_fun.castShadow = true; 
            boat_ob_fun.traverse( function( object ) { if ( object instanceof THREE.Mesh ) { object.castShadow = true; } } );
            boat_ob = boat_ob_fun;

            boat_ob.castShadow = true;
            console.log(boat_ob_fun);
            scene.add( boat_ob );  
            
        },
        function ( error ) {
            console.log('Error');
        } 
    );
    
    }



function islands(){
loader_material.load(

	'images/sand.jpg',
  
	function ( sand ) {
    var material = new THREE.MeshStandardMaterial( { map: sand,});

	const globe1 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo1 = new THREE.Mesh(globe1, material);
    cubo1.castShadow = true;
    cubo1.receiveShadow = true;
    const globe2 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo2 = new THREE.Mesh(globe2, material);
    cubo2.castShadow = true;
    cubo2.receiveShadow = true;
    const globe3 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo3 = new THREE.Mesh(globe3, material);
    cubo3.castShadow = true;
    cubo3.receiveShadow = true;
    const globe4 = new THREE.SphereGeometry(1, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo4 = new THREE.Mesh(globe4, material);
    cubo4.castShadow = true;
    cubo4.receiveShadow = true;
    const globe5 = new THREE.SphereGeometry(2, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo5 = new THREE.Mesh(globe5, material);
    cubo5.castShadow = true;
    cubo5.receiveShadow = true;
    const globe6 = new THREE.SphereGeometry(1.5, 100, 100, Math.PI/2, Math.PI*2, 0, Math.PI/2 );
    cubo6 = new THREE.Mesh(globe6, material);
    cubo6.castShadow = true;
    cubo6.receiveShadow = true;
    
    scene.add(cubo1);
    //window.cubo1 = cubo1;
    scene.add(cubo2); // the one in the middle
    //window.cubo2 = cubo2;
    scene.add(cubo3);
    //window.cubo3 = cubo3;
    scene.add(cubo4);
    //window.cubo4 = cubo4;
    scene.add(cubo5);
    //window.cubo5 = cubo5;
    scene.add(cubo6);
    //window.cubo6 = cubo6;
    cubo1.position.x = 5;
    cubo1.position.z = -5;
    cubo1.position.x = 15;
    cubo3.position.z = 12;
    cubo4.position.x = -15;
    cubo5.position.z = 20;
    cubo5.position.x = 15;
    cubo6.position.x = -20;
    cubo6.position.z = -10;  

    
	},
	function ( error ) {
		console.log('');
    }
),

loader.load('fonts/helvetiker_regular.typeface.json', function(font){
    var text_git = new THREE.TextGeometry( 'GitHub', {
            font: font,
            size: 0.6,
            height: 0.5,
        } );

        var text_material = new THREE.MeshPhongMaterial({color: 'pink'});
        var text_mesh = new THREE.Mesh(text_git, text_material);
        text_mesh.rotateX = 0.2;
        text_mesh.position.y = 5;
        text_mesh.castShadow = true;

        if (cubo1 == undefined) {
            console.log("loading")
        }
        else{
        cubo1.add(text_mesh);  
         };

    var text_facebook= new THREE.TextGeometry( 'Facebook', {
            font: font,
            size: 0.6,
            height: 0.5,
        } );
        var text_material = new THREE.MeshPhongMaterial({color: 'pink'});
        var text_mesh = new THREE.Mesh(text_facebook, text_material);
        text_mesh.position.z = 0.2;
        text_mesh.position.y = 5;
        text_mesh.castShadow = true;

        if (cubo4== undefined) {
            console.log("loading")
        }
        else{
        cubo4.add(text_mesh);  
         };
        
    
        var text_instagram = new THREE.TextGeometry( 'Instagram', {
            font: font,
            size: 0.6,
            height: 0.5,
        } );

        var text_material = new THREE.MeshPhongMaterial({color: 'pink'});
        var text_mesh = new THREE.Mesh(text_instagram, text_material);
        text_mesh.rotateX = 0.2;
        text_mesh.position.y = 5;
        text_mesh.castShadow = true;
    
        
        if (cubo5 == undefined) {
            console.log("loading")
        }
        else{
        cubo5.add(text_mesh);  
         };

    var text_linkedin= new THREE.TextGeometry( 'LinkedIn', {
            font: font,
            size: 0.6,
            height: 0.5,
        } );
        var text_material = new THREE.MeshPhongMaterial({color: 'pink'});
        var text_mesh = new THREE.Mesh(text_linkedin, text_material);
        text_mesh.position.z = 0.2;
        text_mesh.position.y = 5;
        text_mesh.castShadow = true;

        if (cubo6 == undefined) {
            console.log("loading")
        }
        else{
            cubo6.add(text_mesh);  
         };
       ;}
        );
 
};
function plane(){

loader_material.load(
	// resource URL
	'images/water3.jpg',
  
	// called when resource is loaded
	function ( water ) {
    var plane = new THREE.PlaneGeometry(1000,1000);
    var material = new THREE.MeshStandardMaterial( { map: water , vertexColors: THREE.NoColors});
    var create_plane = new THREE.Mesh(plane, material);
    create_plane.receiveShadow = true;
    create_plane.rotateX(-Math.PI/2);
   
    scene.add(create_plane);

    },
	
);
};
function fish_func(){
loader_OBJ.load(

	'models/Mesh_Goldfish.obj',
  
	function ( fish_ob ) {
        fish_ob.scale.x = fish_ob.scale.y = fish_ob.scale.z = 0.05;
        fish_ob.rotateX(-1);
        fish_ob.position.set(10, positionY, 5);
        fish = fish_ob;
        fish.traverse( function( object ) { if ( object instanceof THREE.Mesh ) { object.castShadow = true; } } );
        
        fish.castShadow = true;
        
        fish_2 = fish_ob.clone();
        fish_2.traverse( function( object ) { if ( object instanceof THREE.Mesh ) { object.castShadow = true; } } );
        
        fish_2.castShadow = true;
        fish_2.position.set(-20, positionY, 10);
        

	},
);

};

document.addEventListener('keydown', (event) => {
    switch (event.code) {
      case 'ArrowUp':
        boat_ob.position.x -=1;
        //boat.position.sub(boatPosition); 
        break;
      case 'ArrowDown':
        boat_ob.position.x +=1;
        //boat.position.add(boatPosition); 
        break;
      case 'ArrowLeft':
        boat_ob.position.z += 1;
        //boat.rotateZ(Math.PI/2); 
        //boatPosition.applyAxixAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2);
        //rotation.z -= Math.PI / 2;
        break;
      case 'ArrowRight':
        boat_ob.position.z -= 1;
        //boat.rotateZ(-Math.PI/2); 
        //boatPosition.applyAxixAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2);
        //rotation.z += Math.PI / 2;
        break;
    }
  });

  function detect_collision (){

    var boat_bb = new THREE.Box3().setFromObject(boat_ob);
    var island_b1 = new THREE.Box3().setFromObject(cubo1);
    var island_b2 = new THREE.Box3().setFromObject(cubo2);
    var island_b3 = new THREE.Box3().setFromObject(cubo3);
    var island_b4 = new THREE.Box3().setFromObject(cubo4);
    var island_b5 = new THREE.Box3().setFromObject(cubo5);
    var island_b6 = new THREE.Box3().setFromObject(cubo6);


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

createscene();
create_skybox();
plane();
boat();
islands();
fish_func();
render();
