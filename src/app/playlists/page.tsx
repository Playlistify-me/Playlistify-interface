import playlistfile from '@/../../playlists.json'

export default function Playlists() {
    return (
        <div className='max-h-full overflow-y-auto'>
            <table className='max-h-full'>
                <thead className='sticky top-0 w-full'>
                    <tr>
                        <th className="w-1/2 px-4 py-2">Name</th>
                        <th className="w-1/2 px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {playlistfile.items.map((playlist) => (
                        <tr key={playlist.id}>
                            <td className="border px-4 py-2">{playlist.name}</td>
                            <td className="border px-4 py-2">{playlist.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}