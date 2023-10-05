import * as THREE from 'three'

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

let container
let camera, scene, renderer
let transformControl

init()

function init() {
    container = document.getElementById('container')

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000) // 50000 = jarak pandang
    camera.position.set(8000, 8000, 10000)
    scene.add(camera)
    scene.add(new THREE.AmbientLight(0xf0f0f0, 3))

    // ==============CONTENT=========

    // ==============================

    // =============GRID=============
    const helper = new THREE.GridHelper(10000, 60)
    helper.position.y = 0
    helper.material.opacity = 0.5 // sebelumnya 0.25
    helper.material.transparent = true
    scene.add(helper)

    // ==============================

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)

    //GUI
    const gui = new GUI()
    gui.open()

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)

    controls.addEventListener('change', render)

    transformControl = new TransformControls(camera, renderer.domElement)
    transformControl.addEventListener('change', render)
    transformControl.addEventListener('dragging-changed', function (event) {
        controls.enabled = !event.value
    })
    scene.add(transformControl)

    render()
}

function render() {
    renderer.render(scene, camera)
}
