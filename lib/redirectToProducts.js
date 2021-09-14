import { useRouter } from 'next/router';

export default function redirectToProducts() {
  const router = useRouter();
  router.push('/products');
}
