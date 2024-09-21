# Creating a To-Do List with Vanilla JavaScript

In this tutorial, we will create a simple To-Do list application using HTML,
CSS, and vanilla JavaScript. Follow the steps below to build your own To-Do
list. It looks simple but at the end, you would have learnt so much to be able
to manipulate the HTML DOM

## Step 1: Create the HTML Structure

Create an `index.html` file and add the following code:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="container">
      <h1>To-Do List</h1>
      <input type="text" id="new-task" placeholder="Add a new task" />
      <button id="add-task">Add</button>
      <ul id="task-list"></ul>
    </div>
    <script src="script.js"></script>
  </body>
</html>
```

The HTML structure is not much, most of the work is done at the JavaScript
section, because we will be adding the list of tasks dynamically when the user
types and presses the enter key. Note that some classes and ids are added to the
elements which will be used for styling purpose in CSS, and referencing using
JS.

## Step 2: Style the To-Do List

Create a `styles.css` file and add the following CSS to style the To-Do list:

```css
body {
  background-color: rgb(233, 238, 232);
}

.container {
  width: 30rem;
  background-color: #fff;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

#search-form {
  width: 80%;
}

#search-input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 5px;
}

.todo-list {
  width: 85%;
}

#list {
  padding: 1rem;
  list-style: none;
  font-family: 'Courier New', Courier, monospace;
}

.list-item {
  padding: 0.5rem;
  cursor: pointer;
  width: 100%;
  display: block;
}

.list-item:nth-child(odd) {
  background-color: rgb(223, 222, 222);
}

.list-item:hover {
  background-color: rgb(190, 190, 190);
}

#btn-delete {
  border: none;
  background-color: rgb(209, 33, 33);
  border-radius: 5px;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
}

.strike {
  text-decoration: line-through;
}
```

## Step 3: Add JavaScript Functionality

Create a `script.js` file and add the following JavaScript code to handle adding
and removing tasks:

# Get reference to DOM elements

First, we get reference to HTML elements (form, input, and list container)

```javascript
const form = document.getElementById('search-form')
const addInput = document.getElementById('search-input')
const listContainer = document.getElementById('list')
```

# Add event listener to form

We add an event listener to listen for when the form is being submitted. In this
case, it will mean pressing the enter key since we didn't include any submit
button. Also we need to prevent the page from reloading after submitting.
Whensubmitted, the function to add the item to the page is called.

```javascript
form.addEventListener('submit', function (e) {
  e.preventDefault()
  addTodo()
})
```

# Begin the task of adding the item to the list

The addTodo() function is called upon submitting the form. Inside this function
we create some elements which we will be appending to the DOM. These elements
will hold the task that will be added and the HTML structure will look like:

```html
<label class="list-item">
  <input type="checkbox" id="input" />
  <span>Take a walk</span>
</label>
```

Looking at the HTML structure above, we will use javascript to create a label
element and give it a class of "list-item", create the checkbox and give it the
id of "input" and create the span element. We will then append, first, the span
to the checkbox and then the checkbox is the appended to the label element, and
lastly, the label element will be appended to the parent element (list) which
will hold the list of items. Note that these classes have been targeted and
styled in the CSS file so the styles are applied as the elements are created and
the appropriate classess added.

```javascript
const labelEl = createNewElement('label')
labelEl.classList.add('list-item')

const checkbox = createNewElement('input')
checkbox.type = 'checkbox'
checkbox.setAttribute('id', 'list-item')

const spanEl = createNewElement('span')
spanEl.innerText = addInput.value

labelEl.appendChild(checkbox)
labelEl.appendChild(spanEl)

listContainer.appendChild(labelEl)
```

When the script runs to this point, we assume the item or task has been added to
the page with a checkbox beside it, and so, we clear the input field

```javascript
addInput.value = null
```

We then listed for "change" event to detect when the box beside the List item is
checked or unchecked (state changes), which then calls a handleChange function.

```javascript
checkbox.addEventListener('change', handleChange)
```

# Handle the checkbox state changes

In the handleChange function, the goal is to get the checkbox that was clicked.
If it is checked, and also get a reference to its next sibling element (the span
element in this case).

```javascript
const checkbox = e.target
const span = checkbox.nextElementSibling
```

The goal is to strike out the text beside any box that is checked. We use the
strikeText() function to do so. This funtion takes two parameters:

- the span element holding the task item
- the state of the checkbox (whether it is checked or unchecked) If the state it
  is checked, a class of "strike" is added to the span element and the
  corresponding style (strike-through) in the css file is applied, else the
  style is removed.

```javascript
if (isChecked) {
  span.classList.add('strike')
} else {
  span.classList.remove('strike')
}
```

# Complete Code

Find the complete code below without comments.

```javascript
const form = document.getElementById('search-form')
const addInput = document.getElementById('search-input')
const listContainer = document.getElementById('list')

function strikeText(span, isChecked) {
  if (isChecked) {
    span.classList.add('strike')
  } else {
    span.classList.remove('strike')
  }
}

function handleChange(e) {
  const checkbox = e.target
  const span = checkbox.nextElementSibling

  strikeText(span, checkbox.checked)
}

function createNewElement(el) {
  return document.createElement(el)
}

function addTodo() {
  const labelEl = createNewElement('label')
  labelEl.classList.add('list-item')

  const checkbox = createNewElement('input')
  checkbox.type = 'checkbox'
  checkbox.setAttribute('id', 'list-item')

  const spanEl = createNewElement('span')
  spanEl.innerText = addInput.value

  labelEl.appendChild(checkbox)
  labelEl.appendChild(spanEl)

  listContainer.appendChild(labelEl)

  addInput.value = null

  checkbox.addEventListener('change', handleChange)
}

form.addEventListener('submit', function (e) {
  e.preventDefault()
  addTodo()
})
```

## Conclusion

You have now created a simple To-Do list application using vanilla JavaScript.
You can further enhance this application in many ways by adding features like
using local storage to persist the added item, editing, etc. Let me know what
you think and drop a link to a better version if you feel motivated. HAPPY
CODING!

Micah Bala.
