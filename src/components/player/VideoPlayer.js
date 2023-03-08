const VideoPlayer = ({ link, title }) => {
	return (
		<iframe
			width="100%"
			className="aspect-video"
			src={link}
			title={title}
			frameborder=""
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullscreen
		></iframe>
	);
};

export default VideoPlayer;
