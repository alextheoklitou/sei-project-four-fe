import React from 'react'
import emailjs, { init } from '@emailjs/browser'
import Error from './Error'


function Newsletter() {

  const [formData, setFormData] = React.useState('')
  const [isValidEmail, setIsValidEmail] = React.useState(true)
  const [isSent, setIsSent] = React.useState(false)
  const [isError, setIsError] = React.useState(false)
  const [error, setError] = React.useState(null)
  init('user_dTYhId9PfnHHtjIv8laXU')

  const handleChange = (e) => {
    setIsValidEmail(true)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const sendEmail = async (e) => {
    e.preventDefault()
    if (!formData || !formData.to_name.includes('@')) {
      setIsValidEmail(false)
      return
    }
    try {
      await emailjs.send(
        'service_k8g2a9f',
        'template_wv1hvjh',
        formData)
      setFormData('')
      setIsSent(true)
    } catch (err) {
      setError(err.status.toString())
      setIsError(true)
    }
  }




  return (
    <>
      {isError &&
        <div className="bg-black h-screen">
          <Error error={error} />
        </div>
      }
      {!isError &&
        <div className="container h-screen min-w-full flex-col justify-center">
          <div className="bg-pawhub-purple">
            <p className="text-white text-base py-4 pl-10"><a href="/" className="hover:underline">Home</a> &gt; Newsletter</p>
          </div>
          <div className="newsletter-background bg-auto bg-center h-screen w-screen shadow flex justify-center items-center">
            <form className="bg-white lg:w-2/3 sm:w-7/8 h-5/8 p-5 shadow flex flex-col items-center rounded" onSubmit={sendEmail}>
              {!isValidEmail && <div>
                <div className="border border-red-400 rounded-b bg-red-100 px-4 py-3 w-4/5 mt-5 mx-auto text-red-700">
                  <p>Please enter a valid email address</p>
                </div>
              </div>}
              {isSent && <div>
                <div className="border border-pawhub-grey rounded-b bg-pawhub-yellow/50 px-4 py-3 w-4/5 mt-5 mx-auto text-pawhub-grey">
                  <p>Thank you for signing up! please check your inbox</p>
                </div>
              </div>}
              <h2 className="text-3xl font-semibold pt-4 pb-4">Sign up to our newsletter</h2>
              <hr className="mx-5 mb-5"></hr>
              <p className="m-5 pb-4">Enter your email address below to receive regular pupdates from our homeless hounds</p>
              <label className="block mx-5 mb-2 text-pawhub-grey text-xl font-bold" htmlFor="to_name">
                Email
              </label>
              <input
                className="block shadow rounded border-2 h-16 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-pawhub-yellow mb-5" id="to_name" type="text" name="to_name" placeholder="Sign up to our newsletter" onChange={handleChange}>
              </input>
              <div className="h-14 w-full flex justify-center lg:justify-end my-5">
                <button className="rounded-md w-full h-16 lg:align-self-right mx-auto bg-pawhub-yellow text-pawhub-grey font-bold hover:bg-pawhub-grey hover:text-white" type="submit">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default Newsletter