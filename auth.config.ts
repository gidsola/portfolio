import { NextAuthConfig } from 'next-auth';
export const authConfig = {
  // Auth Secret
  secret: "79b02cd7d96530d9527a87aff3c0e27a",

  // Trust Host Header
  trustHost: true,

  // Custom Pages
  pages: {
    signIn: '/login',
    signOut: '/logout'
  },

  // Login Providers
  providers: [],

  callbacks: {
    /**
     * Checks if the user is authorized to access the requested page.
     * Used by MiddleWare
     * 
     *  TODO: correct for new paths.
     */
    async authorized({ auth, request }) {
      const
        // Check if the user is authenticated
        isUserAuthenticated = auth && auth.user,

        // Initialize protected routes
        isAuthRequired = request.nextUrl.pathname.startsWith('/account');

      // If the route is protected
      const go = isAuthRequired
        // Check if the user is authenticated; return true if the user is authenticated, false otherwise
        ? isUserAuthenticated ? true : false
        // If the route is not protected, check if the user is authenticated and redirect to the next URL if the user is authenticated
        // : isUserAuthenticated
        //   // and the user is authenticated, redirect to the next URL
        //   ? Response.redirect(request.nextUrl.pathname)
        //   // and the user is not authenticated, return true
        : true;

      return go;
    }
  }
} satisfies NextAuthConfig;
export default authConfig;
