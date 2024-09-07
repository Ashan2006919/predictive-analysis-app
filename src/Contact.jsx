import React from "react";

const Contact = () => {
  return (
    <section>
      <div className="lg:py-6 sm:py-6 mx-auto max-w-screen-md items-center">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-sky-400 drop-shadow-md">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-2 font-light text-center text-black sm:text-xl drop-shadow-md">
          Got a technical issue? Want to send feedback about our model? Needs to
          contact me? We're happy to help you!.
        </p>
        <form action="#" className="space-y-8 mx-5">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 font-semibold"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-black font-semibold text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm text-gray-600 font-semibold"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Let us know how we can help you"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm text-gray-600 font-semibold"
            >
              Your message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-white dark:border-gray-300 dark:placeholder-gray-400 dark:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Leave a comment..."
            />
          </div>
          <button
            type="submit"
            className="text-white font-semibold bg-cyan-500 hover:bg-cyan-600 rounded-lg shadow-lg py-2 mr-4py-3 px-5 text-sm text-center bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
