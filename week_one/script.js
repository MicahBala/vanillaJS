const form = document.getElementById('search-form')
const addInput = document.getElementById('search-input')
const listContainer = document.getElementById('list')

// Strike text
function strikeText(span, isChecked) {
  if (isChecked) {
    span.classList.add('strike')
  } else {
    span.classList.remove('strike')
  }
}

// Handle Checkbox
function handleChange(e) {
  const checkbox = e.target
  const span = checkbox.nextElementSibling

  strikeText(span, checkbox.checked)
}

// Create element
function createNewElement(el) {
  return document.createElement(el)
}

// Add Todo Item
function addTodo() {
  const labelEl = createNewElement('label')
  labelEl.classList.add('list-item')

  const checkbox = createNewElement('input')
  checkbox.type = 'checkbox'
  checkbox.setAttribute('id', 'list-item')

  const spanEl = createNewElement('span')
  spanEl.innerText = addInput.value

  //Append the created elements to the DOM
  labelEl.appendChild(checkbox)
  labelEl.appendChild(spanEl)

  listContainer.appendChild(labelEl)
  addInput.value = null

  // Handle input change
  checkbox.addEventListener('change', handleChange)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  addTodo()
})
