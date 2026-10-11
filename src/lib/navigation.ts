import { router } from 'expo-router';

export function returnTo(fallback: '/tasks' | '/schedule') {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
}
