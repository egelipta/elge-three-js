import * as THREE from 'three'
import * as dat from 'dat.gui'

// import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'

let container
let camera, scene, renderer
let transformControl

const onUpPosition = new THREE.Vector2()
const onDownPosition = new THREE.Vector2()

init()

function init() {
    container = document.getElementById('container')

    scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf0f0f0)

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 50000) // 50000 = jarak pandang
    camera.position.set(8000, 8000, 10000)

    // scene.add(new THREE.AmbientLight(0xf0f0f0, 3))
    // const light = new THREE.SpotLight(0xffffff, 4.5)
    // light.position.set(0, 1500, 200)
    // light.angle = Math.PI * 0.2
    // light.decay = 0
    // light.castShadow = true
    // light.shadow.camera.near = 200
    // light.shadow.camera.far = 2000
    // light.shadow.bias = -0.000222
    // light.shadow.mapSize.width = 1024
    // light.shadow.mapSize.height = 1024
    // scene.add(light)

    // ==========RACK 1==========
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
    // ==========================

    // ==========RACK 2==========
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
    // ==========================

    // ==========DEVICE==========
    const textureLoader = new THREE.TextureLoader()
    const warnaDevice = 0x424242 // Warna abu-abu
    const satuanU = 45

    const tinggi1U = 1
    const tinggi2U = 2
    const tinggi4U = 4

    const panjangDevice = 1000 //562
    const lebarDevice = 482

    const posU = [0]
    for (let i = 1; i <= 45; i++) {
        posU.push(i)
    }

    const mouse = new THREE.Vector2()
    const raycaster = new THREE.Raycaster()
    const cubes = []

    // Membuat array data dengan konfigurasi untuk 5 cubeDevice
    const dataDevice = [
        {
            id: 1,
            name: `Device1 U${posU[2]} Rack1`,
            instansi: 'Dinas Kesehatan',
            geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
            posLeftRightDev: 0,
            posTopBottomDev: posU[2] * satuanU - (tinggi2U * satuanU) / 2,
            posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            texturePath: 'images/server1.png',
        },
        {
            id: 2,
            name: `Device2 U${posU[3]} Rack1`,
            instansi: 'Dinas Sosial',
            geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
            posLeftRightDev: 0, //800 / 2 + 600 / 2,
            // (occupied + tinggiU) * satuanU + (satuanU/2)
            posTopBottomDev: posU[3] * satuanU - (tinggi1U * satuanU) / 2,
            posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            texturePath: 'images/server4.jpg',
        },
        {
            id: 3,
            name: `Devie3 U${posU[2]} Rack 2`,
            instansi: 'Dinas Sosial',
            geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi2U, panjangDevice),
            posLeftRightDev: 800 / 2 + 600 / 2,
            // (occupied + tinggiU) * satuanU + (satuanU/2)
            posTopBottomDev: posU[2] * satuanU - (tinggi2U * satuanU) / 2,
            posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            texturePath: 'images/server2.jpg',
        },
        {
            id: 4,
            name: `Device4 U${posU[42]} Rack1`,
            instansi: 'Dinas Sosial',
            geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
            posLeftRightDev: 0, //800 / 2 + 600 / 2,
            // (occupied + tinggiU) * satuanU + (satuanU/2)
            posTopBottomDev: posU[42] * satuanU - (tinggi1U * satuanU) / 2,
            posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            texturePath: 'images/server5.jpg',
        },
        {
            id: 5,
            name: `Device5 U${posU[10]} Rack2`,
            instansi: 'Dinas Sosial',
            geometryDevice: new THREE.BoxGeometry(lebarDevice, satuanU * tinggi1U, panjangDevice),
            posLeftRightDev: 800 / 2 + 600 / 2,
            // (occupied + tinggiU) * satuanU + (satuanU/2)
            posTopBottomDev: posU[10] * satuanU - (tinggi1U * satuanU) / 2,
            posFrontBackDev: 1200 / 2 + (1200 - panjangDevice) / 2,
            texturePath: 'images/server4.jpg',
        },
    ]

    dataDevice.forEach((config) => {
        const texture = textureLoader.load(config.texturePath)
        const materialFront = new THREE.MeshBasicMaterial({ map: texture })
        const materialOther = new THREE.MeshBasicMaterial({ color: warnaDevice })
        const materials = [
            materialOther, // kanan
            materialOther, // kiri
            materialOther, // atas
            materialOther, // bawah
            materialFront, // depan
            materialOther, // belakang
        ]
        const cubeDevice = new THREE.Mesh(config.geometryDevice, materials)

        cubeDevice.position.set(
            config.posLeftRightDev,
            config.posTopBottomDev,
            config.posFrontBackDev
        )
        cubes.push(cubeDevice)
        scene.add(cubeDevice)

        // outline device
        const edgesDevice = new THREE.EdgesGeometry(config.geometryDevice)
        const outlineMaterialDevice = new THREE.LineBasicMaterial({
            color: 0x000000, // Warna hitam
            linewidth: 1,
        })
        const outlineDevice = new THREE.LineSegments(edgesDevice, outlineMaterialDevice)

        cubeDevice.add(outlineDevice)
        cubeDevice.userData.id = config.id
    })
    // ==========================

    // ========MOUSEMOVE=========
    document.addEventListener('mousemove', (event) => {
        // Mendapatkan posisi mouse dalam koordinat normalized device coordinates (NDC)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

        // Lakukan raycasting untuk mendeteksi objek yang disorot oleh kursor
        raycaster.setFromCamera(mouse, camera)

        const intersects = raycaster.intersectObjects(cubes)

        if (intersects.length > 0) {
            const hoveredObject = intersects[0].object as THREE.Mesh
            const hoveredIndex = hoveredObject.userData.id

            // Cari objek dengan ID yang sesuai dalam array dataDevice
            const foundObject = dataDevice.find((item) => item.id === hoveredIndex)

            if (foundObject) {
                // Jika objek ditemukan, perbarui nilai variabel-variabel di GUI
                guiData.ID = hoveredIndex
                guiData.Name = foundObject.name
                guiData.Instansi = foundObject.instansi
            }
        } else {
            // Reset nilai jika tidak ada objek yang disorot
            guiData.ID = ''
            guiData.Name = ''
            guiData.Instansi = ''
        }
    })

    // document.addEventListener('mousemove', (event) => {
    //     // Mendapatkan posisi mouse dalam koordinat normalized device coordinates (NDC)
    //     mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    //     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    //     // Lakukan raycasting untuk mendeteksi objek yang disorot oleh kursor
    //     raycaster.setFromCamera(mouse, camera)

    //     const intersects = raycaster.intersectObjects(cubes)

    //     if (intersects.length > 0) {
    //         const hoveredObject = intersects[0].object as THREE.Mesh
    //         const hoveredIndex = hoveredObject.userData.id // Menggunakan userData.id yang sudah didefinisikan sebelumnya
    //         let hoveredName = ''
    //         let hoveredInstansi = ''

    //         // Cari objek dengan ID yang sesuai dalam array dataDevice
    //         const foundObject = dataDevice.find((item) => item.id === hoveredIndex)

    //         if (foundObject) {
    //             // Jika objek ditemukan, ambil properti
    //             hoveredName = foundObject.name
    //             hoveredInstansi = foundObject.instansi
    //         }

    //         const infoDiv = document.getElementById('info')
    //         infoDiv.innerHTML = `ID: ${hoveredIndex}<br>Name: ${hoveredName}<br>Instansi: ${hoveredInstansi}`
    //     } else {
    //         const infoDiv = document.getElementById('info')
    //         infoDiv.textContent = ''
    //     }
    // })
    // ==========================

    // ===========CLICK==========
    let originalCubeColor = 0
    let selectedCube = null

    document.addEventListener('click', (_event) => {
        // Kembalikan warna cubeDevice yang sebelumnya diklik
        if (selectedCube) {
            selectedCube.material[4].color.setHex(originalCubeColor)
            selectedCube = null
        }

        // Lakukan raycasting untuk mendeteksi objek yang diklik
        raycaster.setFromCamera(mouse, camera)

        const intersects = raycaster.intersectObjects(cubes)

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object as THREE.Mesh

            // Simpan warna asli cubeDevice yang diklik
            originalCubeColor = clickedObject.material[4].color.getHex()

            // Ubah warna cubeDevice yang diklik
            clickedObject.material[4].color.set(0x3afa05) // Misalnya, ubah warna menjadi hijau
            selectedCube = clickedObject

            // Temukan data cubeDevice berdasarkan ID
            // const clickedData = data.find((item) => item.id === clickedObject.userData.id)

            // if (clickedData) {
            //     // Gabungkan data menjadi satu string
            //     const geometryData = `Width: ${clickedData.geometryDevice.parameters.width}\nHeight: ${clickedData.geometryDevice.parameters.height}\nDepth: ${clickedData.geometryDevice.parameters.depth}`
            //     const dataString = `ID: ${clickedData.id}\nName: ${clickedData.name}\nInstansi: ${clickedData.instansi}\nGeometry:\n${geometryData}`

            //     // Buka tab baru dan tampilkan data
            //     const newWindow = window.open('', 'Device Info', 'width=400,height=300')
            //     newWindow.document.write(`
            //     <h1>Device Info</h1>
            //     <table border='solid'>
            //         <tr>
            //             <th>ID</th>
            //             <th>Device Name</th>
            //             <th>Instansi</th>
            //         </tr>
            //         <tr>
            //             <td>${clickedData.id}</td>
            //             <td>${clickedData.name}</td>
            //             <td>${clickedData.instansi}</td>
            //         </tr>
            //         </table>
            //     <pre>${dataString}</pre>`)
            //     newWindow.document.close()
            // }

            // console.log(`${clickedData.id}`)
        }
    })

    document.addEventListener('dblclick', (_event) => {
        // Lakukan raycasting untuk mendeteksi objek yang diklik
        raycaster.setFromCamera(mouse, camera)

        const intersects = raycaster.intersectObjects(cubes)

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object as THREE.Mesh

            // Temukan data cubeDevice berdasarkan ID
            const clickedData = dataDevice.find((item) => item.id === clickedObject.userData.id)

            if (clickedData) {
                // Gabungkan data menjadi satu string
                const geometryData = `Width: ${clickedData.geometryDevice.parameters.width}\nHeight: ${clickedData.geometryDevice.parameters.height}\nDepth: ${clickedData.geometryDevice.parameters.depth}`
                const dataString = `ID: ${clickedData.id}\nName: ${clickedData.name}\nInstansi: ${clickedData.instansi}\nGeometry:\n${geometryData}`

                // Buka tab baru dan tampilkan data
                const newWindow = window.open('', 'Device Info', '')
                console.table(clickedData)
                newWindow.document.write(`
                <h1>Device Info</h1>
                <table border='solid'>
                    <tr>
                        <th>ID</th>
                        <th>Device Name</th>
                        <th>Instansi</th>
                    </tr>
                    <tr>
                        <td>${clickedData.id}</td>
                        <td>${clickedData.name}</td>
                        <td>${clickedData.instansi}</td>
                    </tr>
                    </table>
                <pre>${dataString}</pre>`)
                newWindow.document.close()
            }
        }
    })
    // ==========================

    // ============GRID==========
    // const material = new THREE.MeshPhongMaterial({
    //     color: 0xc9c9c9,
    //     shininess: 10,
    //     specular: 0x111111,
    // })

    // // Lantai
    // const geometry = new THREE.BoxGeometry(10, 0.05, 10)
    // const ground = new THREE.Mesh(geometry, material)
    // ground.scale.multiplyScalar(1000)
    // ground.castShadow = false
    // ground.receiveShadow = true
    // ground.position.setY(-60 / 2) // Mengatur posisi y lantai ke bawah 0

    // scene.add(ground)

    // // Material untuk outline
    // const outlineMaterial = new THREE.LineBasicMaterial({
    //     color: 0x000000, // Warna outline
    // })

    // // Membuat outline menggunakan EdgesGeometry
    // const edges = new THREE.EdgesGeometry(geometry)
    // const outlineGround = new THREE.LineSegments(edges, outlineMaterial)
    // outlineGround.scale.copy(ground.scale)
    // outlineGround.position.copy(ground.position)
    // outlineGround.position.setY(-50 / 2) // Mengatur posisi y outline ke bawah 0
    // scene.add(outlineGround)

    const helper = new THREE.GridHelper(10000, 60)
    helper.position.y = 0
    helper.material.opacity = 0.5 // sebelumnya 0.25
    helper.material.transparent = true
    scene.add(helper)
    // ==========================

    // ===========RENDER=========
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    container.appendChild(renderer.domElement)
    // ==========================

    // ============GUI===========
    const gui = new dat.GUI()
    const guiData = {
        ID: '',
        Name: '',
        Instansi: '',
    }
    const folder = gui.addFolder('Information')
    folder.add(guiData, 'ID').name('ID').listen()
    folder.add(guiData, 'Name').name('Name').listen()
    folder.add(guiData, 'Instansi').name('Instansi').listen()

    // const gui = new GUI()
    // gui.open()
    // ==========================

    // =========CONTROLS=========
    const controls = new OrbitControls(camera, renderer.domElement)
    // controls.damping = 0.2
    controls.addEventListener('change', render)

    transformControl = new TransformControls(camera, renderer.domElement)
    transformControl.addEventListener('change', render)
    transformControl.addEventListener('dragging-changed', function (event) {
        controls.enabled = !event.value
    })
    scene.add(transformControl)

    transformControl.addEventListener('objectChange', function () {})

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('pointerup', onPointerUp)

    render()
}

function render() {
    renderer.render(scene, camera)
}

function onPointerDown(event) {
    onDownPosition.x = event.clientX
    onDownPosition.y = event.clientY
}

function onPointerUp(event) {
    onUpPosition.x = event.clientX
    onUpPosition.y = event.clientY

    if (onDownPosition.distanceTo(onUpPosition) === 0) {
        transformControl.detach()
        render()
    }
}
