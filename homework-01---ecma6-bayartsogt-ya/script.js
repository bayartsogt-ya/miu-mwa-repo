const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const TIMER_LIMIT = 5 // after 100 sec, quote will be changed

const { fromEvent, Observable, from, of } = rxjs;
const { map, filter, switchMap } = rxjs.operators;
const { fromFetch } = rxjs.fetch;


// quoteInputElement.addEventListener('input', () => {
// ------ Observable: converting Event -------
const quoteInputOb$ = fromEvent(quoteInputElement, 'input');
quoteInputOb$.subscribe(() => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')

  let correct = true
  from(arrayQuote)
  .pipe(
    map(
      (characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
          characterSpan.classList.remove('correct')
          characterSpan.classList.remove('incorrect')
          correct = false
        } else if (character === characterSpan.innerText) {
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
        } else {
          characterSpan.classList.remove('correct')
          characterSpan.classList.add('incorrect')
          correct = false
        }
      }
    )
  )
  .subscribe()

  if (correct) renderNewQuote()
})

async function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
  
  // const data$ = fromFetch(RANDOM_QUOTE_API_URL).pipe(
  //   switchMap(response => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return of({ error: true, message: `Error ${response.status}` });
  //     }
  //   })
  // )

  // return await data$.subscribe({
  //   next: result => {
  //     console.log("result ")
  //     console.log(result)
  //     return result
  //   },
  //   complete: () => console.log('done')
  // }).next()
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  quoteDisplayElement.innerHTML = ''

  from(quote.split('')).pipe(
    map(character => {
      const characterSpan = document.createElement('span')
      characterSpan.innerText = character
      quoteDisplayElement.appendChild(characterSpan)
    })
  ).subscribe()

  quoteInputElement.value = null
  
  startTimerOb$.subscribe((val => timerElement.innerHTML = val))// startTimer()
}

let startTime
const startTimerOb$ = Observable.create(observer => {
  observer.next(0)

  startTime = new Date()
  setInterval(() => {
    observer.next(getTimerTime())

    if (getTimerTime() == TIMER_LIMIT) {
      observer.complete()
      renderNewQuote()
    }
  }, 1000)
})


function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()