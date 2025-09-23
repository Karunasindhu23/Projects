const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const height = parseInt(document.querySelector('#height').value)
  const weight = parseInt(document.querySelector('#weight').value)
  const results = document.querySelector('#results')

  if (height === '' || height <= 0 || isNaN(height)) {
    results.innerHTML = `<span class="error">⚠️ Please enter a valid height</span>`
  } else if (weight === '' || weight <= 0 || isNaN(weight)) {
    results.innerHTML = `<span class="error">⚠️ Please enter a valid weight</span>`
  } else {
    const bmi = (weight / ((height * height) / 10000)).toFixed(2)

    if (bmi < 18.6) {
      results.innerHTML = `<span class="underweight">💡 Your BMI is ${bmi} → You are Underweight</span>`
    } else if (bmi > 24.9) {
      results.innerHTML = `<span class="overweight">⚠️ Your BMI is ${bmi} → You are Overweight</span>`
    } else {
      results.innerHTML = `<span class="normal">✅ Your BMI is ${bmi} → You are in the Normal range</span>`
    }
  }
})
