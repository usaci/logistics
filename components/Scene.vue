<script>
    import * as THREE from 'three';
    import { gsap } from "gsap";
    import { MapControls } from 'three/addons/controls/MapControls.js';
    import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

    export default {
        data() {
            return {
                w: "",
                h: "",
                posRangeX: 50,
                cameraZoom: .17,
                mouseX: 0,
                mouseY: 0,
            }
        },
        mounted() {
            // 
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            // three.jsに関する記述
            console.log(this.w)
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

                // light
                const light = new THREE.DirectionalLight(0xffffff, 1.5);
                scene.add(light);
                light.position.set(100, 100, 0);

                // lightHelper
                const lightHelper = new THREE.DirectionalLightHelper( light, 5 );
                // scene.add(lightHelper);

                // ambient
                const ambient = new THREE.AmbientLight(0xffffff, 2.5);
                scene.add(ambient);

                /*========================

                icon

                ========================*/

                // iconGroup
                const iconGroup = new THREE.Group();
                scene.add(iconGroup);

                // アイコンをcanvas上で描画する
                const iconGeometry = new THREE.PlaneGeometry(11, 15, 15);
                const textureLoader = new THREE.TextureLoader();
                const iconTexture = textureLoader.load('icons/alert.png')
                iconTexture.encoding = THREE.sRGBEncoding;
                const iconMaterial = new THREE.MeshBasicMaterial({
                    map: iconTexture,
                    side: THREE.DoubleSide,
                    opacity: 1,
                    transparent: true,
                    lightMapIntensity: 0,

                })
                const icon = new THREE.Mesh(iconGeometry, iconMaterial);
                icon.position.set(0, 40, 0)
                icon.name = "icon";

                iconGroup.add(icon);
                icon.rotation.y = Math.PI/180 * 45;

                // マウス座標取得
                const mouse = new THREE.Vector2();
                const getMousePosition = (event) => {
                    const element = event.currentTarget;
                    // canvas要素上のXY座標
                    const x = event.clientX - element.offsetLeft;
                    const y = event.clientY - element.offsetTop;
                    // canvas要素の幅・高さ
                    const w = element.offsetWidth;
                    const h = element.offsetHeight;

                    // -1〜+1の範囲で現在のマウス座標を登録する
                    mouse.x = ( x / w ) * 2 - 1;
                    mouse.y = -( y / h ) * 2 + 1;

                }

                canvas.addEventListener('mousemove', getMousePosition)

                /*========================

                resize

                ========================*/

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

                // MapControls

                const controls = new MapControls( camera, renderer.domElement );
                controls.enableDamping = true;

                // rayCaster
                const raycaster = new THREE.Raycaster()

                // render
                const tick = () => {
                    requestAnimationFrame(tick);
                    controls.update();
                    raycaster.setFromCamera(mouse, camera)
                    renderer.render(scene, camera);
                    const intersects = raycaster.intersectObjects(scene.children[3].children);

                    iconGroup.children.map((mesh) => {
                        if(intersects.length > 0 && intersects[0].object === mesh) {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: 1.2,
                                y: 1.2,
                                z: 1.2
                            })
                            canvas.addEventListener('click', (e)=> {
                                console.log('link');
                            })
                            document.body.style.cursor = "pointer";
                        }else {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: 1.0,
                                y: 1.0,
                                z: 1.0
                            })
                            document.body.style.cursor = "initial";
                        }
                    })

                }
                tick();

            }
            init(); // execute
        }
    }
</script>
<template>
        <canvas id="canvas">
        </canvas>
</template>
<style>
    * {
        margin: 0;
        padding: 0;
    }


    .icon {
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
