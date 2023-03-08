import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import Video from './pages/Video';

export default function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/videos/:videoId" element={<Video />}></Route>
			</Routes>
			<Footer />
		</Router>
	);
}
