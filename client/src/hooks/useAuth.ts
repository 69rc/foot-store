import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const response = await fetch('/api/auth/user', {
        credentials: 'include' // Include cookies for session
      });
      if (!response.ok) {
        if (response.status === 401) {
          return null; // User not authenticated
        }
        throw new Error('Authentication check failed');
      }
      return response.json();
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const signOut = async () => {
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include'
      });
      // Clear all queries to reset the app state
      queryClient.clear();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    error,
    signOut,
  };
}
