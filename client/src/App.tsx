import Sidebar from './components/Sidebar';

function App() {
  return (
    <>
      <Sidebar
        spaceName="Rei's Space"
        activePage="notes"
        onNavigate={(page) => console.log('navigate to:', page)}
      />

    </>
  )
}

export default App
