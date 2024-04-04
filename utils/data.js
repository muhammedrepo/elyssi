import bcryptjs from 'bcryptjs'

import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaTwitter,
} from 'react-icons/fa'
const data = {
  menuItems: [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    {
      text: 'Collections',
      dropdown: true,
      submenu: [
        {
          text: 'Men',
          links: [
            { text: 'Boots', path: '/collection-grid' },
            { text: 'Blutcher Boot', path: '/collection-grid' },
          ],
        },
        {
          text: 'Woman',
          links: [
            { text: 'Accessories', path: '/collection-grid' },
            { text: 'Belts', path: '/collection-grid' },
          ],
        },
        {
          text: 'Kids',
          links: [
            { text: 'Derby Shoes', path: '/collection-grid' },
            { text: 'Belts', path: '/collection-grid' },
          ],
        },
      ],
    },
    { text: 'Blog', path: '/blog' },
    { text: 'Contact', path: '/contact' },
  ],

  contactLinks: [
    {
      href: 'mailto:test.email0123@elyssi.com',
      text: 'test.email0123@elyssi.com',
    },
    {
      href: 'tel:0123234222',
      text: '0123 234 222',
    },
    {
      href: '/',
      text: 'Elyssi',
    },
  ],

  linkList: [
    {
      href: '/collection-list',
      text: 'Shop',
    },
    {
      href: '/contact',
      text: 'Contact Us',
    },
    {
      href: '/single',
      text: 'Terms & Conditions',
    },
  ],

  socialIcons: [
    {
      url: 'https://www.facebook.com',
      icon: <FaFacebookF />,
    },
    {
      url: 'https://www.twitter.com',
      icon: <FaTwitter />,
    },
    {
      url: 'https://www.instagram.com',
      icon: <FaInstagram />,
    },
    {
      url: 'https://www.pinterest.com',
      icon: <FaPinterestP />,
    },
  ],

  users: [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'admin@example.com',
      password: bcryptjs.hashSync('123456'),
      isAdmin: true,
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'user@example.com',
      password: bcryptjs.hashSync('123456'),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: 'Passion Pearl Collection',
      slug: 'passion-pearl',
      category: 'Shirt',
      images: [
        '/images/hero-slide-01.jpg',
        '/images/backpack-03-2.png',
        '/images/backpack-3.png',
      ],
      price: 70,
      brand: 'Nike',
      badge: '20%',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
      isFeatured: true,
      banner: '/images/hero-slide-01.jpg',
    },
    {
      name: 'Hoodie your way! For Men',
      slug: 'hoodie-for-men',
      category: 'hoodie',
      images: [
        '/images/hero-slide-02.jpg',
        '/images/sunglass-2.png',
        '/images/sunglass-3.png',
      ],
      price: 70,
      brand: 'adidas',
      badge: 'New',
      rating: 4.2,
      numReviews: 45,
      countInStock: 20,
      description: 'A popular hoodie',
      isFeatured: true,
      banner: '/images/hero-slide-02.jpg',
    },
    {
      name: 'Anabelle Purses by Elyssi',
      slug: 'anabelle-purse',
      category: 'Purse',
      images: [
        '/images/hero-slide-03.jpg',
        '/images/watch-2.png',
        '/images/watch-3.png',
      ],
      price: 70,
      brand: 'elyssi',
      badge: 'Hot',
      rating: 4.7,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular bag',
      isFeatured: true,
      banner: '/images/hero-slide-03.jpg',
    },
    {
      name: 'W.W. Shoes by Adidas',
      slug: 'shoe',
      category: 'Shoe',
      images: [
        '/images/shoes-1.png',
        '/images/shoes-2.png',
        '/images/shoes-4.png',
      ],
      price: 70,
      brand: 'adidas',
      badge: 'Trend',
      rating: 4.2,
      numReviews: 23,
      countInStock: 20,
      description: 'A popular shoe',
    },

    {
      name: 'Passion Pearl Collection',
      slug: 'passion-pearl',
      category: 'Shirt',

      images: [
        '/images/shoes-1.png',
        '/images/shoes-2.png',
        '/images/shoes-4.png',
      ],
      price: 20,
      brand: 'adidas',
      badge: 'Trend',
      rating: 4.2,
      numReviews: 23,
      countInStock: 20,
      description: 'A popular shoe',
      isTrending: true,
      trendingImage: '/images/collection-01.jpg',
      isSpecialStyle: false,
    },
    {
      name: 'Hoodie your way! For Men',
      slug: 'hoodie-your-way',
      category: 'Shirt',

      images: [
        '/images/shoes-1.png',
        '/images/shoes-2.png',
        '/images/shoes-4.png',
      ],
      price: 25,
      brand: 'adidas',
      badge: 'Trend',
      rating: 4.2,
      numReviews: 23,
      countInStock: 20,
      description: 'A popular shoe',
      isTrending: true,
      trendingImage: '/images/collection-02.jpg',
      isSpecialStyle: false,
    },
    {
      name: 'W.W. Shoes by Elyssi',
      slug: 'w-w-shoes',
      category: 'Shoe',

      images: [
        '/images/shoes-1.png',
        '/images/shoes-2.png',
        '/images/shoes-4.png',
      ],
      price: 30,
      brand: 'adidas',
      badge: 'Trend',
      rating: 4.2,
      numReviews: 23,
      countInStock: 20,
      description: 'A popular shoe',
      isTrending: true,
      trendingImage: '/images/collection-shoes.jpg',
      isSpecialStyle: true,
    },

    {
      name: 'Anabelle Purses by Elyssi',
      slug: 'anabelle-purses',
      category: 'Purse',

      images: [
        '/images/shoes-1.png',
        '/images/shoes-2.png',
        '/images/shoes-4.png',
      ],
      price: 40,
      brand: 'Amani',
      badge: 'Trend',
      rating: 4.2,
      numReviews: 23,
      countInStock: 20,
      description: 'A popular shoe',
      isTrending: true,
      trendingImage: '/images/collection-03.jpg',
      isSpecialStyle: false,
    },
  ],

  posts: [
    {
      slug: 'how-to-choose-the-right-shoes',
      title: 'How to choose the right shoes',
      author: 'Katherine S.',
      featuredImage: '/images/blog/blog-hero.jpg',
      image: '/images/post-05.jpg',
      authorImage: '/images/blog-author.jpg',
      category: 'Stylish Fashion',
      altText: 'post image',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: [
        `The major affiliate marketing networks in UK include
          advertising.com, affiliatefuture.com, affiliatemarketing.co.uk,
          affiliatewindow.com, affili.net, brandconversions.com, buy.at,
          clash-media.co.uk, cj.com, dgmaffiliates.com,
          onlinemediagroup.co.uk, paidonresults.com, primeq.co.uk,
          silvertap.com, smart-quotes.com, tradedoubler.com, webgains.com and
          zanox.com. This is according to e-consultancy report.`,

        `These affiliate marketing networks all vies for merchants and
          affiliates. They will get an override commission for the sales so it
          would be best to have more merchants and affiliates on the network.
          The standard override fee is 30% although that still depends on the
          network. But whatever network you choose, whether you are a merchant
          or an affiliate, as long as you set things up properly, you will
          still get your share of higher sales.`,

        `Affiliate marketing is the latest trend online. With so many
          products to sell and services to offer, sometimes displaying it on
          one site isn’t enough. Thus, advertisers or merchants need
          affiliates, some sites which are willing to display ads for a
          particular cost. On the other hand, this is an opportunity for
          potential affiliates to earn extra income online.`,

        `The easy way to earn from affiliate marketing is to join an affiliate marketing network. Joining poses several benefits to both
          the advertiser and the affiliate. For the advertisers, this opens a
          new door of opportunity to get more leads and sales, get higher
          return on investment and pay only for results. Affiliate marketing
          network lessens the risk of venturing into marketing without proper
          management and guidance.`,
      ],
      excerptImage: '/images/blog/blog-image.jpg',
    },

    {
      slug: 'stylish-fashion-for-the-summer',
      title: 'Stylish Fashion for the summer',
      author: 'Katherine S.',
      featuredImage: '/images/blog/blog-hero.jpg',
      image: '/images/post-04.jpg',
      authorImage: '/images/blog-author.jpg',
      category: 'Stylish Fashion',
      altText: 'post image',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: [
        `The major affiliate marketing networks in UK include
        advertising.com, affiliatefuture.com, affiliatemarketing.co.uk,
        affiliatewindow.com, affili.net, brandconversions.com, buy.at,
        clash-media.co.uk, cj.com, dgmaffiliates.com,
        onlinemediagroup.co.uk, paidonresults.com, primeq.co.uk,
        silvertap.com, smart-quotes.com, tradedoubler.com, webgains.com and
        zanox.com. This is according to e-consultancy report.`,

        `These affiliate marketing networks all vies for merchants and
        affiliates. They will get an override commission for the sales so it
        would be best to have more merchants and affiliates on the network.
        The standard override fee is 30% although that still depends on the
        network. But whatever network you choose, whether you are a merchant
        or an affiliate, as long as you set things up properly, you will
        still get your share of higher sales.`,

        `Affiliate marketing is the latest trend online. With so many
        products to sell and services to offer, sometimes displaying it on
        one site isn’t enough. Thus, advertisers or merchants need
        affiliates, some sites which are willing to display ads for a
        particular cost. On the other hand, this is an opportunity for
        potential affiliates to earn extra income online.`,

        `The easy way to earn from affiliate marketing is to join an affiliate marketing network. Joining poses several benefits to both
        the advertiser and the affiliate. For the advertisers, this opens a
        new door of opportunity to get more leads and sales, get higher
        return on investment and pay only for results. Affiliate marketing
        network lessens the risk of venturing into marketing without proper
        management and guidance.`,
      ],
      excerptImage: '/images/blog/blog-image.jpg',
    },

    {
      slug: 'post-3',
      title: 'Make up tips for your next photoshoot',
      author: 'Katherine S.',
      featuredImage: '/images/blog/blog-hero.jpg',
      image: '/images/post-04.jpg',
      authorImage: '/images/blog-author.jpg',
      category: 'Makeup Tips',
      altText: 'post image',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      content: [
        `The major affiliate marketing networks in UK include
        advertising.com, affiliatefuture.com, affiliatemarketing.co.uk,
        affiliatewindow.com, affili.net, brandconversions.com, buy.at,
        clash-media.co.uk, cj.com, dgmaffiliates.com,
        onlinemediagroup.co.uk, paidonresults.com, primeq.co.uk,
        silvertap.com, smart-quotes.com, tradedoubler.com, webgains.com and
        zanox.com. This is according to e-consultancy report.`,

        `These affiliate marketing networks all vies for merchants and
        affiliates. They will get an override commission for the sales so it
        would be best to have more merchants and affiliates on the network.
        The standard override fee is 30% although that still depends on the
        network. But whatever network you choose, whether you are a merchant
        or an affiliate, as long as you set things up properly, you will
        still get your share of higher sales.`,

        `Affiliate marketing is the latest trend online. With so many
        products to sell and services to offer, sometimes displaying it on
        one site isn’t enough. Thus, advertisers or merchants need
        affiliates, some sites which are willing to display ads for a
        particular cost. On the other hand, this is an opportunity for
        potential affiliates to earn extra income online.`,

        `The easy way to earn from affiliate marketing is to join an affiliate marketing network. Joining poses several benefits to both
        the advertiser and the affiliate. For the advertisers, this opens a
        new door of opportunity to get more leads and sales, get higher
        return on investment and pay only for results. Affiliate marketing
        network lessens the risk of venturing into marketing without proper
        management and guidance.`,
      ],
      excerptImage: '/images/blog/blog-hero.jpg',
    },
  ],
}

export default data
