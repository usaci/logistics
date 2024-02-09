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
                msgBox: false,
                msgBoxId: "",
            }
        },
        methods: {
            submitMsgBox() {
                this.$emit('onClick', this.msgBox, this.msgBoxId);
            }
        },
        mounted() {
            // 
            console.log(this.$el);
            this.w = window.innerWidth;
            this.h = window.innerHeight;
            // three.jsに関する記述
            console.log(this.w)
            const init = () => {
                const canvas = this.$el;

                /*========================

                イントロダクション

                ========================*/

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


                /*========================

                メインシーン

                ========================*/

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

                // iconGroup
                const iconGroup = new THREE.Group();
                iconGroup.name = "iconGroup";
                scene.add(iconGroup);

                // アイコンをcanvas上で描画する
                const iconGeometry = new THREE.PlaneGeometry(7.5, 10, 10);
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

                // iconをそれぞれ配置する
                // 1つ目
                const icon1 = new THREE.Mesh(iconGeometry, iconMaterial);
                icon1.position.set(0, 35, 0)
                icon1.name = "icon1";

                iconGroup.add(icon1);
                icon1.rotation.y = Math.PI/180 * 45;

                // 2つ目
                const icon2 = new THREE.Mesh(iconGeometry, iconMaterial);
                icon2.position.set(0, 35, 20)
                icon2.name = "icon2";

                iconGroup.add(icon2);
                icon2.rotation.y = Math.PI/180 * 45;

                

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

                // リサイズ処理

                // watch change of windowSize
                window.addEventListener('resize', () => {
                    this.w = window.innerWidth;
                    this.h = window.innerHeight;

                    // modify camera's aspect ratio
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
                const raycaster = new THREE.Raycaster();
                canvas.addEventListener('click', (e) => {
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(scene.children[3].children);
                    // アイコンがクリックされた時
                    iconGroup.children.map((mesh) => {
                        if(intersects.length > 0 && intersects[0].object === mesh) {
                            this.msgBox = !this.msgBox;
                            this.msgBoxId = mesh.name;
                            this.submitMsgBox();
                            document.body.style.cursor = "pointer";
                        }else {
                            document.body.style.cursor = "initial";
                        }
                    
                    })
                })

                // render
                const tick = () => {
                    // 導入部分のアニメーション

                    // メイン部分の挙動
                    requestAnimationFrame(tick);
                    controls.update();
                    raycaster.setFromCamera(mouse, camera)
                    renderer.render(scene, camera);
                    const intersects = raycaster.intersectObjects(scene.children[3].children);
                    // アイコンにマウスが重なった時の処理
                    iconGroup.children.map((mesh) => {
                        if(intersects.length > 0 && intersects[0].object === mesh) {
                            gsap.to(mesh.scale, {
                                duration: .4,
                                x: 1.2,
                                y: 1.2,
                                z: 1.2
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
    <canvas id="canvas"></canvas>
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
