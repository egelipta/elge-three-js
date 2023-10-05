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

    // ============CONTENT===========

    // ========================RACK 1=======================
    const posLeftRightRack = 0
    const posTopBottomRack = 1890 / 2 // 1890 / 2
    const posFrontBackRack = 1200 / 2 + (1200 - 1200) / 2 // tadinya -600
    const warnaRack = 0x000000 // hitam

    const geometryRack = new THREE.BoxGeometry(600, 1890, 1200)
    const materialRack = new THREE.MeshBasicMaterial({
        color: warnaRack,
        transparent: true,
        opacity: 0.8,
    })

    const pintu = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0,
    })
    const materialsRack = [
        materialRack, // Right
        materialRack, // Left
        materialRack, // Top
        materialRack, // Bottom
        pintu, // Front
        pintu, // Back
    ]
    const cubeRack = new THREE.Mesh(geometryRack, materialsRack)
    cubeRack.position.set(posLeftRightRack, posTopBottomRack, posFrontBackRack)
    scene.add(cubeRack)

    // garis tepi (outline) untuk rack
    const edgesRack = new THREE.EdgesGeometry(geometryRack)
    const outlineMaterialRack = new THREE.LineBasicMaterial({
        color: 0x000000, // Warna hitam
        linewidth: 2,
    })
    const outlineRack = new THREE.LineSegments(edgesRack, outlineMaterialRack)

    cubeRack.add(outlineRack)
    // ===================================================

    // ========================RACK 2=======================
    const posLeftRightRack2 = 800 / 2 + 600 / 2
    const posTopBottomRack2 = (45 * 45) / 2 // tadinya 755
    const posFrontBackRack2 = 1200 / 2 + (1200 - 1000) / 2 // tadinya -600
    const warnaRack2 = 0x000000 // hitam

    const geometryRack2 = new THREE.BoxGeometry(800, 45 * 45, 1000)
    const materialRack2 = new THREE.MeshBasicMaterial({
        color: warnaRack2,
        transparent: true,
        opacity: 0.8,
    })

    const pintu2 = new THREE.MeshBasicMaterial({
        color: 0x0a0a0a,
        transparent: true,
        opacity: 0,
    })
    const materialsRack2 = [
        materialRack2, // Right
        materialRack2, // Left
        materialRack2, // Top
        materialRack2, // Bottom
        pintu, // Front
        pintu, // Back
    ]
    const cubeRack2 = new THREE.Mesh(geometryRack2, materialsRack2)
    cubeRack2.position.set(posLeftRightRack2, posTopBottomRack2, posFrontBackRack2)
    scene.add(cubeRack2)

    // garis tepi (outline) untuk rack2
    const edgesRack2 = new THREE.EdgesGeometry(geometryRack2)
    const outlineMaterialRack2 = new THREE.LineBasicMaterial({
        color: 0x000000, // Warna hitam
        linewidth: 2,
    })
    const outlineRack2 = new THREE.LineSegments(edgesRack2, outlineMaterialRack2)

    cubeRack2.add(outlineRack2)
    // ===================================================

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
