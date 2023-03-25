AFRAME.registerComponent("bowling_ball", {
    init: function () {
      this.throwBall();
    },
    throwBall: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var ball = document.createElement("a-entity");
  
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.3,
          });
  
          ball.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          ball.setAttribute("velocity", direction.multiplyScalar(-10));
  
          //set the ball as dynamic entity
          ball.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:"0"
          })
  
          //add the collide event listener to the ball
          ball.addEventListener("collide",this.removeBall)
  
          var scene = document.querySelector("#scene");
  
          scene.appendChild(ball);
        }
      });
    },
  
    removeBall: function (e) {
      //Original entity (ball)
      console.log(e.detail.target.el);
  
      //Other entity, which ball touched.
      console.log(e.detail.body.el);
  
      //ball element
      var element = e.detail.target.el;
  
      //element which is hit
      var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("box")) 
        {
          //set material attribute
          elementHit.setAttribute("material",{
            opacity:0.6,
            transparent:true
          })
  
          //impulse and point vector
          var impulse = new Cannon.Vec3(-2,2,1)
          var worldPoint = new Cannon.Vec3().copy(elementHit.getAttribute("position"))
          elementHit.body.applyImpulse(impulse,worldPoint)
  
          //remove event listener
          element.removeEventListener("collide",this.shoot)
          var scene = document.querySelector("#scene")
          scene.removeChild(ball)
      }
    },
  });
  
  
  