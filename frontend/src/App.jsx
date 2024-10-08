import './App.css';
import NeuButton from './components/NeuButton';
import Stat from './pages/Stat';

function App() {
  return (
    <div className='bg-customOrange text-white h-screen flex flex-col text-center'>
      <div className="text-6xl font-extrabold mt-10 tracking-widest">REDDITLENS</div>
      <div className='flex flex-row justify-center mt-6 items-center'>
        <div className='text-2xl font-semibold mt-2'>r/</div>
        <input
          className='h-10 w-60 text-center font-semibold text-black text-xl outline-none rounded-2xl bg-white placeholder-gray-600 ml-2' // Add margin left to create space
          type='text'
          placeholder='AskReddit'
        />
      </div>
      <div className='mt-5 text-lg'>
        <NeuButton>Search</NeuButton>
      </div>
      <Stat />
    </div>
  );
}

export default App;
