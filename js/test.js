/**
 * 
 */

COM = {};
COM.KIORROS = {};
COM.KIORROS.webglfun = {};

COM.KIORROS.webglfun = function() {

	var width = 400,
		height = 300;
	
	var viewAngle = 45,
		aspect = width / height,
		near = 0.1,
		far = 10000;
	
	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(viewAngle, aspect, near, far);
	var scene = new THREE.Scene();
	
	return  {
		init : function($renderTarget) {
			
			scene.add(camera);
			camera.position.z = 300;
			renderer.setSize(width, height);
			
			$renderTarget.append(renderer.domElement);
			
			var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
			
			var radius = 50,
				segments = 16,
				rings = 16;
			var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius, segments, rings), sphereMaterial);
			
			scene.add(sphere);
			
			var pointLight = new THREE.PointLight(0xFFFFFF);
			pointLight.position = {x: 10, y: 50, z:130};
			scene.add(pointLight);
			
			window.requestAnimationFrame(this.render);
		},
		
		render : function() {
			renderer.render(scene, camera);
		}
	};

}();