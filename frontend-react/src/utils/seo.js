import React from 'react'
import Helmet from 'react-helmet'

// This is the thumbnail that appears when someone shares your website
import Thumbnail from '../logo.svg';

const SEO = ({
  url,
  defaultTitle = "",
  defaultDescription = "",
  social = {facebook: "", twitter: "", youtube: "", google: "", linkedin: ""},
  socialLinks= {facebook: "", twitter: "", youtube: "", google: "", linkedin: "", instagram: ""},
  address = {city: "", region: "", country: "", zipCode: ""},
  contact = {email: "", phone: ""},
  legalName,
  foundingDate,
  logo,
  author,
  title,
  type,
  description,
  articleBody,
  datePublished,
  dateModified,
  cover,
  location = '',
  readTime,
}) => {

  // This is Structured data that is recommended to have according to Google
  // You can read more about it on Google's own documentation about structured data
  // The first string is for the Article schema and the second one for the organization schema
  const structuredDataArticle = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
    "headline": "${description}",
    "image": "${
  cover ? `https://smakosh.com${cover}` : `https://smakosh.com${Thumbnail}`
  }",
    "datePublished": "${datePublished}",
    "dateModified": "${dateModified}",
    "author": {
      "@type": "Person",
      "name": "${author}"
    },
    "articleBody": "${articleBody}",
    "publisher": {
      "@type": "Organization",
      "name": "${author}",
      "logo": {
        "@type": "ImageObject",
        "url": "${logo}"
      }
    },
    "description": "${description}",
    "url": "${url}${location}/?ref=smakosh.com"
  }`
  const structuredDataOrganization = `{
    "@context": "http://schema.org",
    "@type": "${type}",
    "legalName": "${legalName}",
    "url": "${url}",
    "logo": "${logo}",
    "foundingDate": "${foundingDate}",
    "founders": [{
      "@type": "Person",
      "name": "${legalName}"
    }],
    "contactPoint": [{
      "@type": "ContactPoint",
      "email": "${contact.email}",
      "telephone": "${contact.phone}",
      "contactType": "customer service"
    }],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "${address.city}",
      "addressRegion": "${address.region}",
      "addressCountry": "${address.country}",
      "postalCode": "${address.zipCode}"
    },
    "sameAs": [
      "${socialLinks.twitter}",
      "${socialLinks.google}",
      "${socialLinks.youtube}",
      "${socialLinks.linkedin}",
      "${socialLinks.instagram}",
      "${socialLinks.github}"
    ]
  }`

  return(
  // Notice I'm using react-helmet to inject these elements within the header tag
  <Helmet>
    {/* The description that appears under the title of your website appears on search engines results */}
    <meta name="description" content={description || defaultDescription} />

    {/* The thumbnail of your website */}
    <meta
      name="image"
      content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
    />

    {/* Opengraph meta tags for Facebook & LinkedIn */}
    <meta property="og:url" content={`${url}${location}/?ref=smakosh.com`} />
    <meta
      property="og:type"
      content={type === 'NewsArticle' ? 'NewsArticle' : 'website'}
    />
    <meta
      property="og:title"
      content={title ? `Smakosh | ${title}` : defaultTitle}
    />
    <meta
      property="og:description"
      content={description || defaultDescription}
    />
    <meta
      property="og:image"
      content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
    />

    {/* You can get this id when you create an app id on Facebook of your Facebook page */}
    <meta property="fb:app_id" content={social.facebook} />

    {/* These tags work for Twitter & Slack, notice I've included more custom tags like reading time etc... */}
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={socialLinks.twitter} />
    <meta name="twitter:site" content={social.twitter} />
    <meta
      name="twitter:title"
      content={title ? `Smakosh | ${title}` : defaultTitle}
    />
    <meta
      name="twitter:description"
      content={description || defaultDescription}
    />
    <meta
      name="twitter:image:src"
      content={cover ? `${url}${cover}` : `${url}${Thumbnail}`}
    />
    {type === 'NewsArticle' && (
      <meta name="twitter:label1" value="Reading time" />
    )}
    {type === 'NewsArticle' && (
      <meta name="twitter:data1" value={`${readTime} min read`} />
    )}
    {type === 'NewsArticle' && (
      <meta name="author" content="Ismail Ghallou" data-react-helmet="true" />
    )}
    {type === 'NewsArticle' && (
      <meta
        name="article:published_time"
        content={datePublished}
        data-react-helmet="true"
      />
    )}

    {/* Structured data */}
    <script type="application/ld+json">
      {type === 'NewsArticle'
        ? structuredDataArticle
        : structuredDataOrganization}
    </script>

    {/* Not sure if this is still relevant as Google shut down their Google+ paltform */}
    <link rel="publisher" href={socialLinks.google} />

    {/* The title of your current page */}
    <title>{title ? title : defaultTitle}</title>

    {/* Default language and direction */}
    <html lang="en" dir="ltr" />
  </Helmet>
  )
}

export default SEO;