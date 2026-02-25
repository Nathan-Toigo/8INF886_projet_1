import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Redirect to login page or home page after successful logout
                router.push('/login');
                // Optional: force a page reload to ensure all cache is purged
                router.refresh();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('An error occurred during logout:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="hover:cursor-pointer text-red-600 font-bold py-2 px-4 rounded hover:bg-red-600 hover:text-white hover:bg-opacity-20 transition"
        >
            {loading ? 'Logging out...' : 'Log Out'}
        </button>
    );
}
