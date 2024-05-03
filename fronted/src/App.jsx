function App() {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <div className="bg-black h-3/4 w-1/2 flex flex-col justify-start items-center">
        <nav className="flex justify-center items-center h-20">
          <img src="./logo.jpg" alt="Logo" className="h-16 w-16 mt-4" />
        </nav>
        <div className="mt-5 flex flex-col w-full overflow-y-scroll">
          <div className="flex justify-end ">
            <div className="bg-blue-500 text-white font-bold mb-5 mt-3 rounded-lg p-4 max-w-md border-solid border-gray-300 border-2">
              Sangeeta: Hey, how are you?
            </div>
          </div>
          <div className="flex justify-start w-full">
            <div className="bg-gray-300 text-black font-bold mb-5 mt-3 rounded-lg p-4 max-w-md border-solid border-gray-300 border-2">
              Varsha: I am fine. How about you?
            </div>
          </div>  
        </div>
      </div>
      <div className="bg-gray-300 w-1/2 mt-3 p-4 rounded-lg">
        <form className="flex justify-between items-center">
          <input
            type="text"
            name="message"
            className="flex-grow p-2 border-solid border-gray-500 border-2 rounded-lg mr-3"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
