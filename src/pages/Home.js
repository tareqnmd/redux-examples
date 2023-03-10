import AddExpense from '../components/expense-tracker/AddExpense';
import CurrentBalance from '../components/expense-tracker/CurrentBalance';
import Expenses from '../components/expense-tracker/Expenses';

const Home = () => {
	return (
		<div className="container">
			<CurrentBalance />
			<AddExpense />
			<Expenses />
		</div>
	);
};

export default Home;
