
// Pretending the data has been read from a database into a JavaScript array of objects

const jokeList = [
  {
    'Question': 'What do you call something that runs but never gets anywhere?',
    'Answer': 'A refrigerator'
  },
  {
    'Question': 'What do you do to get a robot mad?',
    'Answer': 'Push all of its buttons.'
  },
  {
   'Question': 'What do you call a policeman in bed?',
    'Answer': 'An undercover cop.'
  },
  {
   'Question': 'What do you call a funny mountain?',
    'Answer': 'Hill-arious.'
  },
  {
   'Question': 'What do you call a bagel that can fly?',
    'Answer': 'A plain bagel'
  },
  {
    'Question': 'Why did the scarecrow win an award?',
    'Answer': 'Because he was outstanding in his field.'
  },
  {
    'Question': 'What do you call a fake noodle?',
    'Answer': 'An impasta.'
  },
  {
    'Question': 'Why was the math book sad?',
    'Answer': 'It had too many problems.'
  },
  {
    'Question': 'What do you call cheese that is not yours?',
    'Answer': 'Nacho cheese.'
  },
  {
    'Question': 'Why did the computer go to the doctor?',
    'Answer': 'It had a virus.'
  }
  
]

// When the button with id "getJokeBtn" is clicked, run the getJokes function
document.getElementById('getJokeBtn').addEventListener('click', getJokes) 


// Runs every time the button is clicked
function getJokes() {
    // Read the number from the box. parseInt turns the text "2" into the number 2
    const count = parseInt(document.getElementById('jokes_num').value)

    const messageElem = document.getElementById('message')
    const jokeDivElem = document.getElementById('jokeDiv')   // needed because the if uses it

    if (isNaN(count) || count < 1 || count > jokeList.length) {
    jokeDivElem.replaceChildren()
    messageElem.textContent = 'Please enter a number between 1 and ' + jokeList.length
    return
    }

  messageElem.textContent = ''   // valid number, so clear any old message

    if (count === 1) {
    drawSingleJoke()
    } else {
    drawJokeTable(count)
    }
}

 // Draw a single joke in the div with id "jokeDiv"
function drawSingleJoke() {
  const randomIndex = Math.floor(Math.random() * jokeList.length)
  const joke = jokeList[randomIndex]

  const jokeDivElem = document.getElementById("jokeDiv")
  jokeDivElem.replaceChildren()

  const questionElem = document.createElement('p')
  questionElem.textContent = joke.Question

  const answerElem = document.createElement('p')
  answerElem.textContent = joke.Answer

  jokeDivElem.append(questionElem, answerElem)
}

// Returns a shuffled copy of the joke list. The original list is not changed
function shuffleJokes() {
  const copy = [...jokeList]   // [...x] makes a copy of the list
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))   // random position from 0 to i
    const temp = copy[i]                            // swap the jokes at positions i and j
    copy[i] = copy[j]
    copy[j] = temp
  }
  return copy
}

// Draw a table of jokes in the div with id "jokeDiv"
function drawJokeTable(count) {

  // Find the div and clear it, same as for a single joke
  const jokeDivElem = document.getElementById("jokeDiv")
  jokeDivElem.replaceChildren()

  // Create the table, and its two parts
  const tableElem = document.createElement('table')
  const theadElem = document.createElement('thead')
  const tbodyElem = document.createElement('tbody')

  // Create the header row with two header cells
  const headerRow = document.createElement('tr')
  const thQuestion = document.createElement('th')
  thQuestion.textContent = 'Question'
  const thAnswer = document.createElement('th')
  thAnswer.textContent = 'Answer'
  headerRow.append(thQuestion, thAnswer)
  theadElem.append(headerRow)

  const shuffled = shuffleJokes()
  //the rows
  for (let i = 0; i < count; i++) {
    const trElem = document.createElement('tr')

    const tdQuestion = document.createElement('td')
    tdQuestion.textContent = shuffled[i].Question;

    const tdAnswer = document.createElement('td')
    tdAnswer.textContent = shuffled[i].Answer;

    trElem.append(tdQuestion, tdAnswer) // Add the 2 columns to the row
    tbodyElem.append(trElem)            // Add individual rows to the tbody
  }

  // Put the pieces together, then put the table in the div
  tableElem.append(theadElem, tbodyElem)
  jokeDivElem.append(tableElem)
}

