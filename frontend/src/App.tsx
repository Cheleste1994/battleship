
const wss = new WebSocket('ws://localhost:5000/')

wss.onopen = () => {
}

export default function App() {

  return (
    <div>
      Hello
    </div>
  )
}
