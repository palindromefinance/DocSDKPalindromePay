import Head from 'next/head'
import { useRouter } from 'next/router'

const defaultMeta = {
  title: 'Palindrome Crypto Escrow SDK',
  siteName: 'Palindrome Crypto Escrow SDK Documentation',
  description: 'Official documentation for the Palindrome Crypto Escrow SDK. Build secure, decentralized escrow solutions with smart contract integration, EIP-712 signatures, and gasless transactions.',
  url: 'https://sdk.palindromefinance.com',
  image: 'https://sdk.palindromefinance.com/og-image.png',
  type: 'website',
  robots: 'index, follow',
  twitterHandle: '@palindromefi',
}

// JSON-LD structured data for documentation
function generateStructuredData(meta, canonicalUrl, isDocPage) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: meta.siteName,
    url: defaultMeta.url,
    description: defaultMeta.description,
    publisher: {
      '@type': 'Organization',
      name: 'Palindrome Pay',
      url: 'https://palindromefinance.com',
    },
  }

  if (isDocPage) {
    return {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: meta.title,
      description: meta.description,
      url: canonicalUrl,
      author: {
        '@type': 'Organization',
        name: 'Palindrome Pay',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Palindrome Pay',
        url: 'https://palindromefinance.com',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': canonicalUrl,
      },
    }
  }

  return baseData
}

export function SEO({
  title,
  description,
  image,
  type,
  date,
  robots,
}) {
  const router = useRouter()
  const isDocPage = router.asPath.startsWith('/docs/')

  const meta = {
    ...defaultMeta,
    ...(title && { title: `${title} - ${defaultMeta.siteName}` }),
    ...(description && { description }),
    ...(image && { image }),
    ...(type && { type }),
    ...(robots && { robots }),
  }

  const canonicalUrl = `${defaultMeta.url}${router.asPath.split('?')[0]}`
  const structuredData = generateStructuredData(meta, canonicalUrl, isDocPage)

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content={meta.robots} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={meta.twitterHandle} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {/* Article metadata for blog posts */}
      {meta.type === 'article' && date && (
        <>
          <meta property="article:published_time" content={date} />
          <meta property="article:author" content="Palindrome Pay" />
        </>
      )}

      {/* Additional SEO tags */}
      <meta name="author" content="Palindrome Pay" />
      <meta name="keywords" content="escrow, crypto escrow, blockchain, smart contract, SDK, Web3, Ethereum, EIP-712, gasless transactions, decentralized escrow, cryptocurrency payments" />
      <meta name="theme-color" content="#0ea5e9" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </Head>
  )
}

// Helper to generate description from frontmatter
export function generateMetaDescription(title, description) {
  if (description) return description
  return `Learn how to use ${title} in the Palindrome Crypto Escrow SDK. Complete guide with code examples and best practices.`
}
