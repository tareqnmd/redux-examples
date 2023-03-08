import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../features/videos/videosSlice';
import VideoGridItem from './VideoGridItem';

const VideoGrid = () => {
	const { videos, isError, error } = useSelector((state) => state.videos);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);
	return (
		<section className="pt-12">
			<section className="pt-12">
				<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
					{videos.map((video) => (
						<VideoGridItem key={video.id} video={video} />
					))}
					{isError && <div className="col-span-12">{error}</div>}
				</div>
			</section>
		</section>
	);
};

export default VideoGrid;
