import like from '../../assets/images/like.svg';
import unlike from '../../assets/images/unlike.svg';

const VideoLikeUnlike = () => {
	return (
		<div className="flex gap-10 w-48">
			<div className="flex gap-1">
				<div className="shrink-0">
					<img className="w-5 block" src={like} alt="Like" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">100K</div>
			</div>
			<div className="flex gap-1">
				<div className="shrink-0">
					<img className="w-5 block" src={unlike} alt="Unlike" />
				</div>
				<div className="text-sm leading-[1.7142857] text-slate-600">100K</div>
			</div>
		</div>
	);
};

export default VideoLikeUnlike;
