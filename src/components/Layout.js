import Footer from './Footer/Footer';
import Navbar from './Navbar/Navbar';

const Layout = ({ children }) => {
	return (
		<div className="App">
			<Navbar />
			<div className="main">{children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
