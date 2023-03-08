import { Link } from 'react-router-dom';
import lws from '../../assets/images/lws.svg';
import Search from './Search';

const Navbar = () => {
	return (
		<nav className="bg-slate-100 shadow-md">
			<div className="max-w-7xl mx-auto px-5 lg:px-0 flex justify-between py-3">
				<Link to="/">
					<img className="h-10" src={lws} alt="" />
				</Link>
				<div className="border border-slate-200 flex items-center bg-white h-10 px-5 rounded-lg text-sm ring-emerald-200">
					<Search />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
