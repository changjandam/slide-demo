export type Product = {
  id: string;
  type: 'prebuilt' | 'custom';
  img: string;
  name: string;
  specs: string[];
  officialPrice: number;
  salePrice: number;
  installmentPrice: number;
  shippingDate: string;
};

export type Products = Product[];

export const dummyProducts: Products = [
  {
    id: '1',
    type: 'prebuilt',
    img: '/images/pc-01.avif',
    name: 'Product 1',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 100000,
    salePrice: 80000,
    installmentPrice: 10,
    shippingDate: '2022-01-01',
  },
  {
    id: '2',
    type: 'prebuilt',
    img: '/images/pc-02.avif',
    name: 'Product 2',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 200,
    salePrice: 180,
    installmentPrice: 20,
    shippingDate: '2022-02-01',
  },
  {
    id: '3',
    type: 'prebuilt',
    img: '/images/pc-03.avif',
    name: 'Product 3',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 300,
    salePrice: 280,
    installmentPrice: 30,
    shippingDate: '2022-03-01',
  },
  {
    id: '4',
    type: 'custom',
    img: '/images/pc-04.avif',
    name: 'Product 4',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 400,
    salePrice: 380,
    installmentPrice: 40,
    shippingDate: '2022-04-01',
  },
  {
    id: '5',
    type: 'custom',
    img: '/images/pc-01.avif',
    name: 'Product 5',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 500,
    salePrice: 480,
    installmentPrice: 50,
    shippingDate: '2022-05-01',
  },
  {
    id: '6',
    type: 'custom',
    img: '/images/pc-02.avif',
    name: 'Product 6',
    specs: ['Spec 1', 'Spec 2', 'Spec 3'],
    officialPrice: 600,
    salePrice: 580,
    installmentPrice: 60,
    shippingDate: '2022-06-01',
  },
];
