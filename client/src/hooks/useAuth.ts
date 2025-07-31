import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  // Get user type from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const userType = urlParams.get('user');
  
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user", userType],
    queryFn: async () => {
      const response = await fetch(`/api/auth/user?user=${userType || ''}`);
      if (!response.ok) {
        throw new Error('Not authenticated');
      }
      return response.json();
    },
    retry: false,
    enabled: !!userType, // Only run query if userType is present
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user && !!userType,
  };
}
