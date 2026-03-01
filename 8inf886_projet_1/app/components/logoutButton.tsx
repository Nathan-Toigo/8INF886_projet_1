import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ACTION_TYPES } from "@/lib/action-types";
import { clearLocalLogUsername, logLocalAction } from "@/lib/local-action-log";
import { getUserName } from "@/lib/session";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogout = async () => {
        setLoading(true);
        try {
            const connectedUsername = await getUserName();
            const response = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                void logLocalAction(ACTION_TYPES.LOGOUT, connectedUsername ?? undefined);
                clearLocalLogUsername();
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
