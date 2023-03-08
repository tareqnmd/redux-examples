import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedVideos } from '../../features/relatedVideos/relatedVideosSlice';
import Error from '../ui/Error';
import Loading from '../ui/Loading';
import NoData from '../ui/NoData';
import SingleRelatedVideo from './SingleRelatedVideo';

const RelatedVideos = ({ id, tags }) => {
	const { relatedVideos, isError, error, isLoading } = useSelector((state) => state.relatedVideos);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchRelatedVideos({ id, tags }));
	}, [dispatch, id, tags]);

	let content = '';

	if (isLoading) {
		content = <Loading />;
	}
	if (!isLoading && isError) {
		content = <Error message={error} />;
	}
	if (!isLoading && !isError && relatedVideos?.length === 0) {
		content = <NoData />;
	}
	if (!isLoading && !isError && relatedVideos?.length > 0) {
		content = relatedVideos.map((video) => <SingleRelatedVideo key={video.id} video={video} />);
	}
	return <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">{content}</div>;
};

export default RelatedVideos;
