// src/App.tsx
import { AuthProvider } from './auth-context';
import MainApp from './MainApp';

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;
