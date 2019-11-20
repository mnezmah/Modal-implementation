# This is my implementation of Modal in existing basecode
This is still an work in progress 😃

## Install
`npm install`

## Start the project
`npm start`

## functionalities implemented
- The newsletter form can to be opened by clicking on the 'Subscribe to newsletter'-button in the hero
- The newsletter form is being displayed inside a modal component overlaying the page.
- The newsletter form is a reusable component
- The video stops playing when you open the modal
- The video resumes when you close the modal
- The newsletter form should has a form validation:
   - all fields are required
   - email validation
- On submit the form makes an API call to [jsonplacehlder](https://jsonplaceholder.typicode.com/)
- If the API response returns an error, modal shows an error message
- If the API response was successful the modal closes and a success toast is being shown to the user saying: Bedankt voor uw aanmelding!🎉
- The toast should is a reusable component (with 3 variants: success, warning or error)

