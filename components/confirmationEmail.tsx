import React from 'react'

export const confirmationEmail = () => {
  return (
    <div className="app font-sans min-w-screen min-h-screen bg-grey-lighter py-8 px-4">

  <div className="mail__wrapper max-w-md mx-auto">

    <div className="mail__content bg-white p-8 shadow-md">

      <div className="content__header text-center tracking-wide border-b">
        <div className="text-red text-sm font-bold">THEAPP.IO</div>
        <h1 className="text-3xl h-48 flex items-center justify-center">E-mail Confirmation</h1>
      </div>

      <div className="content__body py-8 border-b">
        <p>
          Hey, <br/><br/>It looks like you just signed up for The App, that’s awesome! Can we ask you for email confirmation? Just click the button bellow.
        </p>
        <button className="text-white text-sm tracking-wide bg-red rounded w-full my-8 p-4 ">CONFIRM EMAIL ADRESS</button>
        <p className="text-sm">
          Keep Rockin'!<br/> Your The App team
        </p>
      </div>

      <div className="content__footer mt-8 text-center text-grey-darker">
        <h3 className="text-base sm:text-lg mb-4">Thanks for using The App!</h3>
        <p>www.theapp.io</p>
      </div>

    </div>

    <div className="mail__meta text-center text-sm text-grey-darker mt-8">

      <div className="meta__social flex justify-center my-4">
        <a href="#" className="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="flex items-center justify-center mr-4 bg-black text-white rounded-full w-8 h-8 no-underline"><i className="fab fa-instagram"></i></a>
        <a href="#" className="flex items-center justify-center bg-black text-white rounded-full w-8 h-8 no-underline"><i className="fab fa-twitter"></i></a>
      </div>

      <div className="meta__help">
        <p className="leading-loose">
          Questions or concerns? <a href="#" className="text-grey-darkest">help@theapp.io</a>

          <br/> Want to quit getting updates? <a href="#" className="text-grey-darkest">Unsubscribe</a>
        </p>
      </div>

    </div>

  </div>

</div>
  )
}
