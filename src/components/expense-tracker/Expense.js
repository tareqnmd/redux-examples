import deleteIcon from '../../assets/images/delete.svg';
import editIcon from '../../assets/images/edit.svg';
const Expense = () => {
	return (
		<li className="transaction income">
			<p>Earned this month</p>
			<div className="right">
				<p>৳ 100</p>
				<button className="link">
					<img className="icon" src={editIcon} alt="" />
				</button>
				<button className="link">
					<img className="icon" src={deleteIcon} alt="" />
				</button>
			</div>
		</li>
	);
};

export default Expense;
