export const handleChange = (setData, target) => {
  setData(prevSate => ({
    ...prevSate,
    [target.name]: target.value
  }))
}

// export const handleSubmit = (e, validate, data) => {
//   e.preventDefault()
//   const isValid = validate()
//   if (!isValid) return
// }

export const handleKeyDown = (e) => {
  // if (e.keyCode === 13) {
  if (e.code === 'Tab') {
    e.preventDefault()
    const form = e.target.form
    const indexField = Array.prototype.indexOf.call(form, e.target)
    form[indexField + 2].focus()
  }
}