let countedLikes = {}
let interval = setInterval(incrementCounter, 1000);

const minusButton = document.getElementById("-")
const plusButton = document.getElementById("+")
const likeButton = document.getElementById("<3")
const pauseButton = document.getElementById("pause")
const commentForm = document.querySelector("#comment-form");

document.addEventListener("DOMContentLoaded", function() {
  minusButton.addEventListener('click', event => decrementCounter())
  plusButton.addEventListener('click', incrementCounter)
  likeButton.addEventListener('click', likeCounter)
  pauseButton.addEventListener('click', pauseTimer)
  commentForm.addEventListener('submit', onSubmitForm)
})

function incrementCounter() {
  currentCounter = parseInt(document.getElementById('counter').innerHTML)
  document.getElementById('counter').innerHTML = currentCounter + 1;
}

function decrementCounter() {
  currentCounter = parseInt(document.getElementById('counter').innerHTML)
  document.getElementById('counter').innerHTML = currentCounter - 1;
}

function likeCounter() {
  currentCounter = parseInt(document.getElementById('counter').innerHTML)

  if (countedLikes[currentCounter]) {
    countedLikes[currentCounter] += 1
    updateLike(currentCounter)
  } else {
    countedLikes[currentCounter] = 1
    appendLike(currentCounter);
  }
}

function appendLike(currentCounter) {
  const likesList = document.querySelector(".likes")

  let li = document.createElement("li")

  li.innerText = `${currentCounter} was liked 1 time.`
  li.id = `like-${currentCounter}`

  likesList.appendChild(li)
}

function updateLike(currentCounter) {
  currentLike = document.querySelector(`#like-${currentCounter}`)
  currentLike.innerText = `${currentCounter} was liked ${countedLikes[currentCounter]} times.`
}

function pauseTimer() {
  clearInterval(interval)
  pauseButton.innerText = "resume"
  pauseButton.removeEventListener('click', pauseTimer)
  pauseButton.addEventListener('click', resumeTimer)
  disableButtons()
}

function resumeTimer() {
  interval = setInterval(incrementCounter, 1000);
  pauseButton.innerText = "pause"
  pauseButton.removeEventListener('click', resumeTimer)
  pauseButton.addEventListener('click', pauseTimer)
  enableButtons()
}

function onSubmitForm(event) {
  event.preventDefault()
  const commentText = document.querySelector("#comment-text").value

  let comment = document.createElement('p')
  comment.innerText = commentText
  document.querySelector("#list").appendChild(comment);

  event.currentTarget.reset()
}

function disableButtons() {
  minusButton.disabled = true
  plusButton.disabled = true
  likeButton.disabled = true
}

function enableButtons() {
  minusButton.disabled = false
  plusButton.disabled = false
  likeButton.disabled = false
}


