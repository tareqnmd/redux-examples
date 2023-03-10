import AddExpense from './AddExpense';
import CurrentBalance from './CurrentBalance';
import Expenses from './Expenses';

const ExpenseTracker = () => {
	return (
		<div className="main">
			<div className="container">
				<CurrentBalance />
				<AddExpense />
				<Expenses />
			</div>
		</div>
	);
};

export default ExpenseTracker;
