import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVideos } from '../../features/videos/videosSlice';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import NoData from '../ui/NoData';
import VideoGridItem from './VideoGridItem';

const VideoGrid = () => {
	const { videos, isError, error, isLoading } = useSelector((state) => state.videos);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchVideos());
	}, [dispatch]);

	let content = '';

	if (isLoading) {
		content = <Loading />;
	}
	if (!isLoading && isError) {
		content = <Error message={error} />;
	}
	if (!isLoading && !isError && videos?.length === 0) {
		content = <NoData />;
	}
	if (!isLoading && !isError && videos?.length > 0) {
		content = videos.map((video) => <VideoGridItem key={video.id} video={video} />);
	}

	return (
		<section className="pt-12">
			<section className="pt-12">
				<div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
					{content}
				</div>
			</section>
		</section>
	);
};

export default VideoGrid;
