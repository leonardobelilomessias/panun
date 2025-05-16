type PropertyVideoProps = {
    videoUrl: string;
};

export function PropertyVideo({ videoUrl }: PropertyVideoProps) {
    return (
        <div>
            <h2 className="text-xl font-bold">Vídeo</h2>
            <iframe
                width="100%"
                height="400"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Vídeo do Imóvel"
            />
        </div>
    );
}
