import Link from 'next/link'
 
export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black-100">
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-100 mb-4">Not Found</h2>
                <p className="text-lg text-gray-600 mb-8">Could not find requested resource</p>
                <Link href="/" className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded">
                    Return Home
                </Link>
            </div>
        </div>
    )
}