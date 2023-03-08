import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RelatedVideos from '../components/list/RelatedVideos';
import VideoPlayer from '../components/player/VideoPlayer';
import VideoDescription from '../components/video/VideoDescription';
import { fetchVideo } from '../features/video/videoSlice';

const Video = () => {
	const { video } = useSelector((state) => state.video);
	const { videoId } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchVideo(videoId));
	}, [dispatch, videoId]);
	return (
		<section className="pt-6 pb-20">
			<div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
				<div className="grid grid-cols-3 gap-2 lg:gap-8">
					<div className="col-span-full w-full space-y-8 lg:col-span-2">
						<VideoPlayer />
						<VideoDescription />
					</div>
					<RelatedVideos />
				</div>
			</div>
		</section>
	);
};

export default Video;
