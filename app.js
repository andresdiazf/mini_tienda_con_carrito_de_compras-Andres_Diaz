
// VARIABLES
let cantidadItems  = 0
let totalAcumulado = 0


// REFERENCIAS AL DOM
const listaCarro = document.querySelector('#lista-carrito')
const spanTotal  = document.querySelector('#total')
const spanBadge  = document.querySelector('#badge')
const btnVaciar  = document.querySelector('#btn-vaciar')
const msgVacio   = document.querySelector('#msg-vacio')


// BOTONES + y -  Estrategia: buscar el input dentro del mismo
// contenedor flex que tiene el botón
document.querySelectorAll('.btn-sumar').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const input = btn.parentElement.querySelector('.input-cantidad')
    const actual = parseInt(input.value)
    if (actual < 99) input.value = actual + 1
  })
})

document.querySelectorAll('.btn-restar').forEach(function(btn) {
  btn.addEventListener('click', function() {
    const input = btn.parentElement.querySelector('.input-cantidad')
    const actual = parseInt(input.value)
    if (actual > 1) input.value = actual - 1
  })
})


// BOTONES DE AGREGAR
document.querySelectorAll('.btn-agregar').forEach(function(boton) {
  boton.addEventListener('click', function() {

    const cardBody = boton.closest('.card-body')
    const input    = cardBody.querySelector('.input-cantidad')
    const nombre   = boton.dataset.nombre
    const precio   = parseFloat(boton.dataset.precio)
    const cantidad = parseInt(input.value)

    agregarAlCarrito(nombre, precio, cantidad)
    input.value = 1
  })
})


// FUNCIÓN: AGREGAR AL CARRITO
function agregarAlCarrito(nombre, precio, cantidad) {
  msgVacio.style.display = 'none'

  const subtotal = precio * cantidad

  const li = document.createElement('li')
  li.className = 'list-group-item d-flex justify-content-between align-items-center px-2 py-2'

  li.innerHTML = `
    <div>
      <span class="fw-semibold" style="font-size:0.9rem;">${nombre}</span>
      <br>
      <small class="text-muted">${cantidad} x $${precio.toLocaleString('es-CO')}</small>
    </div>
    <div class="d-flex align-items-center gap-2">
      <span class="fw-bold" style="color:#7C5CBF; font-size:0.9rem;">
        $${subtotal.toLocaleString('es-CO')}
      </span>
      <button class="btn btn-sm btn-outline-danger btn-eliminar py-0 px-1">
        <i class="fa-solid fa-trash" style="font-size:0.75rem;"></i>
      </button>
    </div>
  `

  listaCarro.appendChild(li)

  li.querySelector('.btn-eliminar').addEventListener('click', function() {
    eliminarItem(li, subtotal, cantidad)
  })

  cantidadItems  += cantidad
  totalAcumulado += subtotal

  updateBadge()
  updateTotal()
}


// FUNCIÓN: ELIMINAR ITEM
function eliminarItem(li, subtotal, cantidad) {
  li.remove()

  cantidadItems  -= cantidad
  totalAcumulado -= subtotal

  if (cantidadItems <= 0) {
    cantidadItems  = 0
    totalAcumulado = 0
    msgVacio.style.display = 'block'
  }

  updateBadge()
  updateTotal()
}


// ACTUALIZAR BADGE
function updateBadge() {
  spanBadge.textContent = cantidadItems
}

// ACTUALIZAR TOTAL
function updateTotal() {
  spanTotal.textContent = '$' + totalAcumulado.toLocaleString('es-CO', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })
}

// BOTÓN VACIAR
btnVaciar.addEventListener('click', function() {
  listaCarro.querySelectorAll('li:not(#msg-vacio)').forEach(function(li) {
    li.remove()
  })

  cantidadItems  = 0
  totalAcumulado = 0
  msgVacio.style.display = 'block'

  updateBadge()
  updateTotal()
})