import Navbar from "./components/Navbar.tsx";

const App = () => {

  return (
    <>
      <Navbar/>
      <div className="bg-zinc-100 min-h-screen">
          <div className="p-8 w-full container m-auto text-primary-500">
            Test!
          </div>
      </div>
    </>
  )
}

export default App
