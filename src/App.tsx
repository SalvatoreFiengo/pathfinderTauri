import { useState, useEffect } from "react";
import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api'

function App() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    listen('data', data => {
      setData(data);
    });
    invoke('get_data');
  }, []);

  return (
    <div>
      <h1>API data:</h1>
      <ul>
        {data.map((item: any) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
