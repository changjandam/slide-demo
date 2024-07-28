import { ProductCarousel } from '@/components/ProductCarousel';
import { dummyProducts } from '@/types/products';

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <ProductCarousel products={dummyProducts} />
    </main>
  );
}
