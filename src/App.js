import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';

export default function App() {
	return (
		<div className="App">
			<Navbar />
			<Home />
			<Footer />
		</div>
	);
}
