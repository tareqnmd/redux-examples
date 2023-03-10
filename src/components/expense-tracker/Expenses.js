import Expense from './Expense';

const Expenses = () => {
	return (
		<>
			<p className="second_heading">Your Transactions:</p>

			<div className="conatiner_of_list_of_transactions">
				<ul>
					<Expense />
				</ul>
			</div>
		</>
	);
};

export default Expenses;
