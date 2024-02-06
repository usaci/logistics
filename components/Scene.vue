<script>
    import * as THREE from 'three';
    import { gsap } from "gsap";
    import { OrbitControls } from "three/addons/controls/OrbitControls.js";
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    import { RGBELoader } from "three/addons/loaders/RGBELoader";
    export default {
        data() {
            return {
                w: window.innerWidth,
                h: window.innerHeight,
                cameraZoom: .17
            }
        },
        mounted() {
            // three.jsに関する記述
            const init = () => {
                const canvas = this.$el;

                // renderer
                const renderer = new THREE.WebGLRenderer({
                    canvas: canvas,
                    antialias: true
                })

                const width = this.w;
                const height = this.h;

                renderer.setPixelRatio(window.devicePixelRatio);
                renderer.setSize(width, height);
                renderer.setClearColor(0x2CBEFF);

                // scene
                const scene = new THREE.Scene();


                // デフォルトの数値
                const cameraOffset = this.cameraZoom;
                const deg = 100;
                const camera = new THREE.OrthographicCamera( (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset, -1000, 1000, 1000);
                scene.add( camera );
                camera.position.set(deg, deg * .75, deg);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
                camera.aspect = width / height;

                // loader
                const loader = new GLTFLoader();
                loader.load('stage.glb', (glb) => {
                    const stage = glb.scene;
                    scene.add(stage);
                    stage.position.set(0, 0, 0);
                }, undefined, (error) => {
                    console.error( error );
                })

                // // controls
                // const controls = new OrbitControls(camera, renderer.domElement);

                // geometry 
                const boxGeometry = new THREE.BoxGeometry(10, 10, 10);

                // material 
                const boxMaterial = new THREE.MeshPhongMaterial({color: 0xff0000})
                const box = new THREE.Mesh(boxGeometry, boxMaterial);
                // scene.add(box);

                // light
                const light = new THREE.DirectionalLight(0xffffff, 1.5);
                scene.add(light);
                light.position.set(100, 100, 0);

                // lightHelper
                const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
                scene.add(lightHelper);

                // ambient
                const ambient = new THREE.AmbientLight(0xffffff, 2.5);
                scene.add(ambient);

                // helpers


                // watch change of windowSize
                window.addEventListener('resize', () => {
                    this.w = window.innerWidth;
                    this.h = window.innerHeight;

                    // modify camera's aspect ratio
                    // (this.w / - 2) * cameraOffset, (this.w / 2) * cameraOffset, (this.h / 2) * cameraOffset, (this.h / - 2) * cameraOffset
                    renderer.setSize(this.w, this.h);
                    renderer.setPixelRatio(window.devicePixelRatio);

                    camera.left = (this.w / - 2) * cameraOffset;
                    camera.right = (this.w / 2) * cameraOffset;
                    camera.top = (this.h / 2) * cameraOffset;
                    camera.bottom = (this.h / - 2) * cameraOffset;
                    camera.updateProjectionMatrix();
                })

                // マウス座標を取得
                // default: 100
                let currentX;
                let targetX;
                let offsetX = 0;

                let currentY;
                let targetY;
                let offsetY = 0;

                // render
                const tick = () => {
                    requestAnimationFrame(tick);
                    // camera

                    // カメラを動かす
                    const moveCamera = (e) => {
                        targetX = (e.offsetX / this.w );
                        offsetX = -(targetX - currentX);
                        
                        targetY = ( e.offsetY / this.h );
                        offsetY = ( targetY - currentY ) * 1;

                        // x軸の制御
                        if(camera.position.x < 150 && camera.position.x > -50){
                            camera.position.x += offsetX;
                        }else if(camera.position.x >= 150 && offsetX < 0) {
                            camera.position.x += offsetX;
                        }else if(camera.position.x <= -50 && offsetX > 0) {
                            camera.position.x += offsetX;
                        }

                        // y軸の制御
                        if(camera.position.y < 100 && camera.position.y > 25){
                            camera.position.y += offsetY;
                        }else if(camera.position.y >= 100 && offsetY < 0) {
                            camera.position.y += offsetY;
                        }else if(camera.position.y <= 25 && offsetY > 0) {
                        camera.position.y += offsetY;
                        }

                    }

                    // ズーム制御
                    const cameraZoom = (e) => {
                        if(this.cameraZoom < 0.5 && this.cameraZoom > 0.01) {
                        
                            this.cameraZoom -= (e.deltaY / this.h) * .01;
                            console.log(this.cameraZoom);
                            const cameraOffset = this.cameraZoom;
                            camera.left = (this.w / - 2) * cameraOffset;
                            camera.right = (this.w / 2) * cameraOffset;
                            camera.top = (this.h / 2) * cameraOffset;
                            camera.bottom = (this.h / - 2) * cameraOffset;
                            camera.updateProjectionMatrix();

                        } else if(this.cameraZoom <= 0.01 && deltaY < 0) {
                            
                            this.cameraZoom -= (e.deltaY / this.h) * .01;
                            console.log(this.cameraZoom);
                            const cameraOffset = this.cameraZoom;
                            camera.left = (this.w / - 2) * cameraOffset;
                            camera.right = (this.w / 2) * cameraOffset;
                            camera.top = (this.h / 2) * cameraOffset;
                            camera.bottom = (this.h / - 2) * cameraOffset;
                            camera.updateProjectionMatrix();
                        }
                    }

                    document.addEventListener('wheel', cameraZoom);

                    // 位置を計算する
                    const calcPos = (e) => {
                        document.body.style.cursor = "grab";
                        currentX = (e.offsetX / this.w );
                        currentY = (e.offsetY / this.h );
                        document.addEventListener('mousemove', moveCamera)

                    }

                    document.addEventListener('mousedown', calcPos);
                    document.addEventListener('mouseup', ()=> {
                        document.body.style.cursor = "initial";
                        document.removeEventListener('mousedown', calcPos);
                        document.removeEventListener('mousemove', moveCamera);
                    });
                    renderer.render(scene, camera);
                }
                tick();

                // when you use PC


                // canvas.addEventListener('mousedown', (e) => {
                //     prevX = (e.clientX / this.w - 0.5 );
                //     prevY = - ( (e.clientY/ this.h - 0.5 ));
                //     console.log(e);
                //     canvas.style.cursor = "grab";
                // })
                // canvas.addEventListener('mousemove', (e) => {
                //     console.log( -(e.clientY / this.h - 0.5) * 2);
                // })
                // canvas.addEventListener('mouseup', (e) => {
                //     currentX = - ( (e.clientX / this.w - 0.5 ) - prevX );
                //     currentY = -( (e.clientY / this.h - 0.5 ) - prevY );
                //     gsap.to(camera.position, {
                //         duration: .4,
                //         x: currentX * 300,
                //         z: currentY * 200
                //     })
                //     canvas.style.cursor = "initial";
                // })


                // when you use SP or tablet
            }

            
            init(); // execute
        }
    }
</script>
<template>
    <canvas id="canvas" draggable></canvas>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
    }
</style>
